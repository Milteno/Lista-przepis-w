const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ message: "Wypełnij wszystkie pola" });

      const role = email === "admin@admin.pl" ? "admin" : "user";

      const newUser = new User({
        email,
        password,
        role,
      });

      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "Konto z tym adresem email już istnieje" });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          const user = await newUser.save();

          jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: 60 * 60 }, (err, token) => {
            if (err) throw err;
            res.json({
              token,
              role,
              email
            });
          });
        });
      });

    } catch (err) {
      throw err;
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) return res.status(400).json({ message: "Wypełnij wszystkie pola" });
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Konto z tym adresem email nie istnieje" });

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (!result) return res.status(401).json({ message: "Złe hasło" });

        jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: 60 * 60 }, (err, token) => {
          if (err) throw err;
          res.json({
            token,
            ...user._doc,
          });
        });
      });

    } catch (err) {
      console.log(err);
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.findById(req.userId)
        .select("-password");
      res.json(user)
    } catch (err) {
      throw err;
    }
  }
};

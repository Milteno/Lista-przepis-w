const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = async (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Błąd autoryzacji" });
  try {
    const decoded = await jwt.verify(token, config.jwtSecret)
    if (decoded) {
      req.userId = decoded.userId
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "Zły token", err })
  }
}

const Message = require("../models/message");

module.exports = {
  async save(req, res) {
    try {
      const { message, author } = req.body;
      const { id } = req.params;
      if (!id || !message || !author) return res.status(400).json({ message: "Wypełnij wszystkie pola" });

      const newMessage = new Message({
        recipe: id,
        content: message,
        author,
      });

      await newMessage.save();

      res.json({ message: 'Komentarz został dodany' });

    } catch (err) {
      throw err;
    }
  },

  async get(req, res) {
    try {
      const { id } = req.params;

      Message.find({ recipe: id }).lean().exec((err, recipes) => {
        return res.end(JSON.stringify(recipes));
      });
    } catch (err) {
      throw err;
    }
  }
};

const Recipe = require("../models/recipe");
const Message = require("../models/message");
const uuid = require("uuid");

module.exports = {
  async save(req, res) {
    try {
      const { name, description, duration, difficulty, author, _id } = req.body;
      if (!name || !description || !duration || !difficulty || !author) {
        return res.status(400).json({ message: "Wypełnij wszystkie pola" });
      }

      if (!_id && !req.files) {
        return res.status(400).json({ message: "Wybierz obrazek" });
      }


      if (req.files) {
        const image = req.files.image;
        const ext = image.name.split('.').pop();
        const uploadPath = 'uploads/' + uuid.v4() + '.' + ext;

        image.mv(uploadPath, async (err) => {
          let doc;
          if (_id && Recipe.find({ _id })) {
            const update = { name, description, duration, difficulty, image: uploadPath };
            doc = await Recipe.findOneAndUpdate({ _id }, update, { upsert: true, new: true });
          } else {
            doc = new Recipe({ name, description, duration, difficulty, author, image: uploadPath });
            await doc.save();
          }

          res.json(doc.toObject());
        });
      } else {
        let doc;
        if (_id && Recipe.find({ _id })) {
          const update = { name, description, duration, difficulty };
          doc = await Recipe.findOneAndUpdate({ _id }, update, { upsert: true, new: true });
        } else {
          doc = new Recipe({ name, description, duration, difficulty, author });
          await doc.save();
        }

        res.json(doc.toObject());
      }

    } catch (err) {
      throw err;
    }
  },

  async get(req, res) {
    try {
      Recipe.find().lean().exec((err, recipes) => {
        return res.end(JSON.stringify(recipes));
      });

    } catch (err) {
      throw err;
    }
  },


  async remove(req, res) {
    try {
      const { id } = req.params;

      await Message.deleteMany({ recipe: id });

      Recipe.deleteOne({ _id: id }, (err) => {
        res.json({ message: "Usunięto przepis" });
      });

    } catch (err) {
      throw err;
    }
  }
};

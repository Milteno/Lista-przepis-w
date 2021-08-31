const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  difficulty: {
    type: Number,
    require: true
  },
  duration: {
    type: Number,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  }
});

module.exports = Recipe = mongoose.model("recipe", RecipeSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  recipe: {
    type: String,
    require: true,
  },
});

module.exports = Message = mongoose.model("message", MessageSchema);
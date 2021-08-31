const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    require: true,
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = User = mongoose.model("user", UserSchema);
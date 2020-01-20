const Mongoose = require("mongoose");

//Datbase User Details
const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// (uSER IS vAIRABLE)
module.exports = User = Mongoose.model("user", UserSchema);

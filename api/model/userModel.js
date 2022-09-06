//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const UserModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  role: {
    type: String,
    required: true,
    default: "Worker",
  },
  isActivated: { type: Boolean, default: false },
  password: { type: String, select: false },
  status: String,
});

const UserModel = mongoose.model("UserModel", UserModelSchema);

module.exports = UserModel;

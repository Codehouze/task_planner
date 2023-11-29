//Require Mongoose
const mongoose = require("mongoose");


const WorkerModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {type: String, required: false},

  password: { type: String, min: 8,required: true },
});
const WorkerModel = mongoose.model("WorkerModel", WorkerModelSchema);

module.exports = WorkerModel;

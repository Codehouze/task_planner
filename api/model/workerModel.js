//Require Mongoose
const mongoose = require("mongoose");


const WorkerModelSchema = new mongoose.Schema({
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

  password: { type: String, select: false, min: 7 },
});
const WorkerModel = mongoose.model("WorkerModel", WorkerModelSchema);

module.exports = WorkerModel;

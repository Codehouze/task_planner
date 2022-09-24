//Require Mongoose
const mongoose = require("mongoose");

//defining the shape of the document
const ShiftModelSchema = new mongoose.Schema({
  startHour: Number,
  endHour: Number,
  name: String,
});

const ShiftModel = mongoose.model("ShiftModel", ShiftModelSchema);

module.exports = ShiftModel;

const mongoose = require("mongoose");
const ShiftModelSchema = new mongoose.Schema({
  startHour: Number,
  endHour: Number,
  name: String,
});

const ShiftModel = mongoose.model("ShiftModel", ShiftModelSchema);

module.exports = ShiftModel;

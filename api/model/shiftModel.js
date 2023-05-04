const mongoose = require("mongoose");
const ShiftModelSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  name: String,
});

const Shift = mongoose.model("ShiftModel", ShiftModelSchema);

module.exports = Shift;

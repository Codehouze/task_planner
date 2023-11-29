const mongoose = require("mongoose");
const ShiftModelSchema = new mongoose.Schema({
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  name: {type: String, required: true},
});

const Shift = mongoose.model("ShiftModel", ShiftModelSchema);

module.exports = Shift;

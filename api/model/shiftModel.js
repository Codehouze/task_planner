const mongoose = require("mongoose");
const ShiftModelSchema = new mongoose.Schema({
  startHour: String,
  endHour: String,
  name: String,
});

const ShiftModel = mongoose.model("ShiftModel", ShiftModelSchema);

module.exports = ShiftModel;

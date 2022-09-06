//Require Mongoose
const mongoose = require("mongoose");

//defining the shape of the document
const ShiftModelSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  employee: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
});

export const ShiftModel = mongoose.model("ShiftModel", ShiftModelSchema);

//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const WorkerShiftModelSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workerModel',
  }, //object,

  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shiftModel',
  }, // object

  startTime: Date,
  endTime: Date,
});

const WorkerShiftModel = mongoose.model(
  "WorkerShiftModel",
  WorkerShiftModelSchema
);

module.exports = WorkerShiftModel;

// check worker shift history here and know whe to assign him to another
// check if worker has any pending shift before

// 0 - 8, 8 - 16, 16 - 24;

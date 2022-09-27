//Require Mongoose
const mongoose = require("mongoose");

const WorkerShiftModelSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workerModel",
  },

  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shiftModel",
  },
});

const WorkerShiftModel = mongoose.model(
  "WorkerShiftModel",
  WorkerShiftModelSchema
);

module.exports = WorkerShiftModel;

// check worker shift history here and know whe to assign him to another
// check if worker has any pending shift before

// 0 - 8, 8 - 16, 16 - 24;

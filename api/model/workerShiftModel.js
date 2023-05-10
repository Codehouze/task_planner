//Require Mongoose
const mongoose = require("mongoose");

const WorkerShiftSchema = new mongoose.Schema({
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

const WorkerShift = mongoose.model("WorkerShift", WorkerShiftSchema);

module.exports = WorkerShift;

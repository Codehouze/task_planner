//Require Mongoose
const mongoose = require("mongoose");

const WorkerShiftSchema = new mongoose.Schema({
  scheduledDate:{type: String, required: true},
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workerModel",
    required: true
  },

  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shiftModel",
    required: true
  },
});

const WorkerShift = mongoose.model("WorkerShift", WorkerShiftSchema);

module.exports = WorkerShift;

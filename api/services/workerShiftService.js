const WorkerShift = require("../model/workerShiftModel");
const Shift = require("../model/shiftModel");
const { validateShiftWithShiftTable, convertToDateFormat } = require("../middleware/validateTime");

class WorkerShiftService {
  async assignShift(data) {
    const { shiftId, workerId,scheduledDate } = data;
    try {

    const hasExistingShift = await WorkerShift.find({ workerId, scheduledDate });
    console.log(hasExistingShift && hasExistingShift?.length > 0)
    if (hasExistingShift && hasExistingShift?.length > 0) {
      return { message: "Worker already has a shift on the same day" };
    }
  

    const workerShift = new WorkerShift({
      shiftId,
      workerId,
      scheduledDate
    });

    const newShift = await workerShift.save();
    return {
      message: "Shift assigned successfully",
      newShift,
    };
  } catch (error) {
    console.error("Error in assignShift:", error);
    return { message: "Error assigning shift" };
  }
}
 

  async getAllWorkerShift(workerId) {
    const shifts = await WorkerShift.find({ where: { workerId } });

    if (!shifts) {
      return {
        message: "No Shift found",
      };
    }

    return {
      message: "Shifts returned",
      shifts,
    };
  }

  async getOneWorkShift(id) {
    const shift = await WorkerShift.findOne({ where: { _id: id } });

    if (!shift) {
      return {
        message: "no shift found",
      };
    }
    return {
      message: "Shift Returned successful",
      shift,
    };
  }
}

module.exports = WorkerShiftService;

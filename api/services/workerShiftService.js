const WorkerShift = require("../model/workerShiftModel");
const Shift = require("../model/shiftModel");
const { validateShiftWithShiftTable, convertToDateFormat } = require("../middleware/validateTime");

class WorkerShiftService {
  async assignShift(data) {
    const { shiftId, workerId,scheduledDate } = data;
    try {

    const hasExistingShift = await WorkerShift.find({ workerId, scheduledDate });
   
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
    try {
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
  } catch (error) {
    console.error("Error in Getting All WorkerShift:", error);
    return { message: "Error getting all worker shift" };
  }
  }

  async getOneWorkShift(id) {
    try{
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
  } catch (error) {
    console.error("Error in Getting One Worker's Shift:", error);
    return { message: "Error getting One worker's shift" };
  }
  }
}

module.exports = WorkerShiftService;

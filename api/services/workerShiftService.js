const WorkerShift = require("../model/workerShiftModel");
const moment = require("moment"); // require
const Shift = require("../model/shiftModel");
const { validateShiftWithShiftTable } = require("../middleware/validateTime");

class WorkerShiftService {
  async assignShift(data) {
    const { startTime, endTime, shiftId, workerId } = data;

    const existingShifts = await WorkerShift.find({ workerId });

    const hasExistingShift = existingShifts?.some((shift) => {
      const shiftStart = moment(shift.startTime).startOf("day");
      const shiftEnd = moment(shift.endTime).startOf("day");
      const newShiftStart = moment(startTime).startOf("day");
      const newShiftEnd = moment(endTime).startOf("day");
      return shiftStart.isSame(newShiftStart) || shiftEnd.isSame(newShiftEnd);
    });

    if (hasExistingShift) {
      return { message: "Worker already has a shift on the same day" };
    }

    const timeTable = await Shift.findOne({ _id: shiftId });

    const validation = await validateShiftWithShiftTable(
      timeTable.startTime,
      timeTable.endTime,
      startTime,
      endTime
    );

    if (validation) {
      return validation;
    }

    const workerShift = new WorkerShift({
      workerId,
      shiftId,
      startTime: moment(startTime).format("YYYY-MM-DD HH:mm"),
      endTime: moment(endTime).format("YYYY-MM-DD HH:mm"),
    });

    const newShift = await workerShift.save();
    console.log("create a new shift for worker", newShift);
    return {
      message: "Shift assigned successfully",
      newShift,
    };
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

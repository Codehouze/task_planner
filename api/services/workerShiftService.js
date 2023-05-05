const WorkerShift = require("../model/workerShiftModel");
const moment = require("moment"); // require
const Shift = require("../model/shiftModel");
const { validateShiftWithShiftTable } = require("../middleware/validateTime");

class WorkerShiftService {
  async assignShift(data) {
    const { startTime, endTime, shiftId, workerId } = data;

    const existingShifts = await WorkerShift.find({
      workerId,
    });

    const hasExistingShift = existingShifts.some((shift) => {
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

    const validation = validateShiftWithShiftTable(
      timeTable.startTime,
      timeTable.endTime,
      startTime,
      endTime
    );

    if (validation) {
      return validation;
    }

    const newShift = new WorkerShift({
      workerId,
      shiftId,
      startTime: moment(startTime).format("YYYY-MM-DD HH:mm"),
      endTime: moment(endTime).format("YYYY-MM-DD HH:mm"),
    });

    await newShift.save();

    return {
      message: "Shift assigned successfully",
      newShift,
    };
  }

  async getAllWorkerShift(req) {
    const shifts = await WorkerShift.find();

    if (!shifts) {
      return {
        success: false,
        message: "No Shift found",
        data: {},
      };
    }

    return {
      success: true,
      message: "Shifts returned",
      data: shifts,
    };
  }

  async getOneWorkShift(req) {
    const { id } = req.param;
    const shift = await workerShift.findOne({ id });

    if (!shift) {
      return {
        success: false,
        message: "no shift found",
        data: {},
      };
    }
    return {
      success: true,
      message: "Shift Returned successful",
      data: shift,
    };
  }
}

module.exports = WorkerShiftService;

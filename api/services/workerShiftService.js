const workerShift = require("../model/workerShiftModel");
const Shift = require("../model/shiftModel");
const { validateTimeDate } = require("../middleware/validateTimeDate");

class WorkerShiftService {
  async assignShift(req) {
    const { id } = req.params;
    const { shiftId, startTime, endTime } = req.body;
    const { success, message, data } = validateTimeDate(startTime, endTime);

    if (success == false) {
      return {
        success,
        message,
      };
    }
    const { end, start } = data;
    const startHour = start.getHours() - 1;
    const endHour = end.getHours() - 1;
    const timeTable = await Shift.findOne({ id: shiftId });
    if ((timeTable.startHour !== startHour) & (timeTable.endHour !== endHour)) {
      return {
        success: false,
        message: "Select a Shift within the range of [0-8],[8-16],[16-24]",
      };
    }

    const shift = await workerShift.findOne({ workerId: id }, { endTime });
    if (shift?.endTime.getDate() === end?.getDate()) {
      return {
        success: false,
        message: "Worker has a shift already",
        data: {},
      };
    }

    const assignShift = new workerShift({
      workerId: id,
      shiftId,
      startTime: start,
      endTime: end,
    });

    await assignShift.save();
    return {
      success: true,
      message: "Shift assigned successful",
      data: assignShift,
    };
  }
  async getAllWorkerShift(req) {
    const shifts = await workerShift.find();

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

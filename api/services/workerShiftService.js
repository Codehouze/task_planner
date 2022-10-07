const workerShift = require("../model/workerShiftModel");
const moment = require("moment"); // require
const Shift = require("../model/shiftModel");
const { validateTime } = require("../middleware/validateTime");

class WorkerShiftService {
  async assignShift(req) {
    const { id } = req.params;
    const { shiftId, startTime, endTime } = req.body;

    const { error, data } = validateTime(startTime, endTime);

    if (error) {
      return {
        message: error,
      };
    }

    const { startDate, endDate } = data;
    const start = moment(startDate).format("HH:mm");
    const end = moment(endDate).format("HH:mm");

    console.log(start, end);
    const timeTable = await Shift.findOne({ _id: shiftId });
    if (timeTable.startHour !== start && timeTable.endHour !== end) {
      return {
        success: false,
        message:
          "Select a Shift within the range of [00:00-08:00],[08:00-16:00],[16:00-24:00]",
      };
    }

    const workersShift = await workerShift.findOne({ workId: id });

    if (workersShift) {
      // console.log(workersShift);
      const hasExistingShift = moment(workersShift.endTime).isSame(
        moment(endTime)
      );

      if (hasExistingShift == true) {
        return {
          success: false,
          message: "Worker has a shift already",
          data: {},
        };
      }
    }
    const assignShift = new workerShift({
      workerId: id,
      shiftId,
      startTime,
      endTime,
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

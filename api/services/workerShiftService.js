const workerShift = require("../model/workerShiftModel");
const moment = require("moment"); // require
const Shift = require("../model/shiftModel");
const {
  validateTime,
  validateShiftWithTimeTable,
} = require("../middleware/validateTime");

class WorkerShiftService {
  // async assignShift(req) {

  //   const { error, data } = validateTime(startTime, endTime);

  //   if (error) {
  //     return {
  //       message: error,
  //     };
  //   }

  //   data.startTime = moment(startTime).format("HH:mm");
  //   data.endTime = moment(endTime).format("HH:mm");

  //   const timeTable = await Shift.findOne({ _id: shiftId });
  //   const { message } = validateShiftWithTimeTable(
  //     timeTable.startHour,
  //     timeTable.endHour,
  //     startTime,
  //     endTime
  //   );
  //   console.log(startTime, endTime);
  //   if (message) {
  //     return { message: error };
  //   }
  //   const workersShift = await workerShift.find({ workId: id });

  //   if (workersShift) {
  //     for (let i = 0; i < workersShift.length; i++) {
  //       const hasExistingShift = moment(workersShift.endTime).isSame(
  //         moment(endTime)
  //       );
  //       if (hasExistingShift) {
  //         return {
  //           success: false,
  //           message: "Worker has a shift already",
  //           data: {},
  //         };
  //       }
  //     }
  //   }
  //   const assignShift = new workerShift({
  //     workerId: id,
  //     shiftId,
  //     startTime,
  //     endTime,
  //   });

  //   await assignShift.save();

  //   return {
  //     success: true,
  //     message: "Shift assigned successful",
  //     data: assignShift,
  //   };
  // }
  async assignShift(data) {
    const { startTime, endTime, shiftId, id } = data;

    const isValidTime = validateTime(startTime, endTime);
    if (!isValidTime) {
      return isValidTime;
    }

    const timeTable = await Shift.findById(shiftId);
    const validation = validateShiftWithTimeTable(
      timeTable.startHour,
      timeTable.endHour,
      startTime,
      endTime
    );
    if (validation.message) {
      return { message: validation.message };
    }

    const workersShift = await workerShift.find({ workerId: id });
    const hasExistingShift = workersShift.some((shift) =>
      moment(shift.endTime).isSame(moment(endTime))
    );

    if (hasExistingShift) {
      return {
        message: "Worker has a shift already",
      };
    }

    const assignShift = new workerShift({
      workerId: id,
      shiftId,
      startTime: moment(startTime).format("HH:mm"),
      endTime: moment(endTime).format("HH:mm"),
    });

    await assignShift.save();

    return {
      message: "Shift assigned successfully",
      assignShift,
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

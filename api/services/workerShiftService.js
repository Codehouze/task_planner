const WorkerShift = require("../model/workerShiftModel");
const moment = require("moment"); // require
const Shift = require("../model/shiftModel");
const { validateShiftWithShiftTable } = require("../middleware/validateTime");

class WorkerShiftService {
  async assignShift(data) {
    const { startTime, endTime, shiftId, workerId } = data;

    //check that user those not have any shift for that day...
    // const workersShift = await WorkerShift.find({ where: { _id: workerId } });
    // const hasExistingShift = workersShift.some((shift) =>
    //   moment(shift.endTime).isSame(moment(endTime))
    // );

    const workersShift = await WorkerShift.find({
      workerId: workerId,
      // filter by shifts on the same day as the new shift being assigned
      startTime: {
        $gte: moment(startTime).startOf("day").format("YYYY-MM-DD HH:mm"),
        $lte: moment(startTime).endOf("day").format("YYYY-MM-DD HH:mm"),
      },
    });
    const hasExistingShift = workersShift.some((shift) =>
      moment(shift.endTime).isSame(moment(endTime))
    );

    console.log(hasExistingShift);
    if (hasExistingShift) {
      return {
        message: "Worker already has a shift at this time",
      };
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

// async assignShift(data) {
//   const { startTime, endTime, shiftId, workerId } = data;

//   const isValidTime = validateTime(startTime, endTime);

//   if (!isValidTime) {
//     return;
//   }

//   const timeTable = await Shift.findOne({ where: { _id: shiftId } });

//   const validation = validateShiftWithTimeTable(
//     timeTable.startHour,
//     timeTable.endHour,
//     startTime,
//     endTime
//   );
//   if (validation) {
//     return validation;
//   }

//   const workersShift = await workerShift.find({ workerId });
//   const hasExistingShift = workersShift.some((shift) =>
//     moment(shift.endTime).isSame(moment(endTime))
//   );

//   if (hasExistingShift) {
//     return {
//       message: "Worker has a shift already",
//     };
//   }

//   const assignShift = new workerShift({
//     workerId: id,
//     shiftId,
//     startTime: moment(startTime).format("HH:mm"),
//     endTime: moment(endTime).format("HH:mm"),
//   });

//   await assignShift.save();

//   return {
//     message: "Shift assigned successfully",
//     assignShift,
//   };
// }

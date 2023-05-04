const moment = require("moment");

exports.validateTime = (startTime, endTime) => {
  const start = moment(startTime, "YYYY-MM-DD HH:mm", true);
  const end = moment(endTime, "YYYY-MM-DD HH:mm", true);

  if (!start.isValid() || !end.isValid()) {
    return { message: "Invalid date or time format" };
  }

  const duration = moment.duration(end.diff(start));
  const shiftDuration = duration.asHours();

  if (shiftDuration !== 8) {
    return {
      message: "Shift duration must be eight hours",
    };
  }

  if (start.isAfter(end)) {
    return { message: "Start time must be before end time" };
  }

  if (start < moment()) {
    return { message: "Start time must be in the future" };
  }

  return { data: { startTime, endTime } };
};

// exports.validateShiftDuration = (startHour, endHour) => {
//   const shiftDuration = parseInt(endHour) - parseInt(startHour);
//   if (shiftDuration !== 8) {
//     return { message: "A shift must be 8 hours long" };
//   }
// };

exports.validateShiftWithShiftTable = (
  timeTableStart,
  timeTableEnd,
  start,
  end
) => {
  if (timeTableStart !== start && timeTableEnd !== end) {
    return {
      message: "Please select a shift from the time table",
    };
  }
};

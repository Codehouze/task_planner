const moment = require("moment");

exports.validateTime = (startTime, endTime) => {
  const start = moment(startTime);
  const end = moment(endTime);

  const duration = moment.duration(end.diff(start));
  const shiftDuration = duration.asHours();
  if (start > end) {
    return { message: "Start time must be less than end time" };
  }
  if (shiftDuration !== 8) {
    return {
      message: "Shift Duration must be eight hours interval",
    };
  }

  if ((start < Date.now()) & (end < Date.now())) {
    return {
      message: "Date and Time must be in the future",
    };
  }
  const startDate = moment(startTime);
  const endDate = moment(endTime);
  return { data: { startTime, endTime } };
};
exports.validateShiftDuration = (startHour, endHour) => {
  const shiftDuration = parseInt(endHour) - parseInt(startHour);
  if (shiftDuration !== 8) {
    return { message: "A shift must be 8 hours long" };
  }
};

exports.validateShiftWithTimeTable = (
  timeTableStart,
  timeTableEnd,
  start,
  end
) => {
  if (timeTableStart !== start && timeTableEnd !== end) {
    return {
      message: "Select a Shift from the timeTable",
    };
  }
};

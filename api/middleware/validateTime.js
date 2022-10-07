const moment = require("moment");

exports.validateTime = (startTime, endTime) => {
  const start = moment(startTime);
  const end = moment(endTime);
  const diff =
    parseInt(moment(end).format("HH:mm")) -
    parseInt(moment(start).format("HH:mm"));

  const shiftDuration = diff;
  console.log(shiftDuration);
  if (start > end) {
    return { error: "Start time must be less than end time" };
  }
  if (shiftDuration !== 8) {
    return {
      error: "Shift Duration must be eight hours interval",
    };
  }

  if ((start < Date.now()) & (end < Date.now())) {
    return {
      error: "Date and Time must be in the future",
    };
  }
  const startDate = moment(startTime);
  const endDate = moment(endTime);
  console.log(startDate, endDate);
  return { data: { startDate, endDate } };
};

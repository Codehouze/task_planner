const moment = require("moment");

let shiftStartTime, shiftEndTime;
exports.validateTime = (startTime, endTime) => {
  const start = moment(startTime, "HH:mm", true);
  const end = moment(endTime, "HH:mm", true);

  if (!start.isValid() || !end.isValid()) {
    return { message: "Invalid date or time format" };
  }

  const duration = moment.duration(end.diff(start));
  const shiftDuration = duration.asHours();
  if (start.isAfter(end)) {
    return { message: "Start time must be before end time" };
  }

  if (shiftDuration !== 8) {
    return {
      message: "Shift duration must be eight hours",
    };
  }
  return null;
};

exports.validateShiftWithShiftTable = async (
  timeTableStart,
  timeTableEnd,
  start,
  end
) => {
  validateTimeTableTime(timeTableStart, timeTableEnd);

  const startDateObj = moment(start, "YYYY-MM-DD HH:mm");
  const endDateObj = moment(end, "YYYY-MM-DD HH:mm");

  const startTime = startDateObj.format("HH:mm");
  const endTime = endDateObj.format("HH:mm");
 
  if (shiftStartTime !== startTime && shiftEndTime !== endTime) {
    return {
      message: "Select the right shift from already created shift",
    };
  }

  if (start < moment()) {
    return { message: "Start time must be in the future" };
  }
  return { shiftStartTime, shiftEndTime };
};

function validateTimeTableTime(timeTableStart, timeTableEnd) {
  let startTimeString, endTimeString;
  if (timeTableStart || timeTableEnd) {
    const startTime = moment(timeTableStart);
    const endTime = moment(timeTableEnd);

    startTimeString = startTime.format("HH:mm");
    endTimeString = endTime.format("HH:mm");
    (shiftStartTime = startTimeString), (shiftEndTime = endTimeString);
    return { shiftStartTime, shiftEndTime };
  }
  (shiftStartTime = timeTableStart), (shiftEndTime = timeTableEnd);
  return { shiftStartTime, shiftEndTime };
}

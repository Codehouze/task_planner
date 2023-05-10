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
  const validate = validateTimeTableTime(timeTableStart, timeTableEnd);
  const startDateObj = moment(start, "YYYY-MM-DD HH:mm");
  const endDateObj = moment(end, "YYYY-MM-DD HH:mm");

  const startTime = startDateObj.format("HH:mm");
  const endTime = endDateObj.format("HH:mm");

  console.log(
    validate.shiftStartTime,
    startTime,
    validate.shiftEndTime !== endTime
  );

  if (
    validate.shiftStartTime !== startTime &&
    validate.shiftEndTime !== endTime
  ) {
    return {
      message: "Select the right shift from already created shift",
    };
  }

  if (start < moment()) {
    return { message: "Start time must be in the future" };
  }
};

function validateTimeTableTime(timeTableStart, timeTableEnd) {
  if (timeTableStart || timeTableEnd) {
    const shiftStartTime = moment(timeTableStart, "YYYY-MM-DD HH:mm").format(
      "HH:mm"
    );
    const shiftEndTime = moment(timeTableEnd, "YYYY-MM-DD HH:mm").format(
      "HH:mm"
    );
    return { shiftStartTime, shiftEndTime };
  }
  (shiftStartTime = timeTableStart), (shiftEndTime = timeTableEnd);
  return { shiftStartTime, shiftEndTime };
}

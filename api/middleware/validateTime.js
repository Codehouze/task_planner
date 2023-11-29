const moment = require("moment");

exports.validateTime = (startTime, endTime) => {
  const start = moment(startTime, "HH:mm", true);
  const end = moment(endTime, "HH:mm", true);

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
  start,
  end
) => {
  const validTimeTableTimes = validateTimeInputFormat(
    timeTableStart,
    timeTableEnd
  );
  const convertedTimeFormat = convertToTimeFormat(start, end);

  if (
    validTimeTableTimes.timeTableStart !== convertedTimeFormat.startTime &&
    validTimeTableTimes.timeTableEnd !== convertedTimeFormat.endTime
  ) {
    return {
      message: "Select the right shift from already created shift",
    };
  }

  if (start < moment()) {
    return { message: "Start time must be in the future" };
  }
};

function validateTimeInputFormat(timeTableStart, timeTableEnd) {
  const convertedTimeFormat = convertToTimeFormat(timeTableStart, timeTableEnd);
  timeTableStart = convertedTimeFormat.startTime;
  timeTableEnd = convertedTimeFormat.endTime;
  return { timeTableStart, timeTableEnd };
}

exports.convertToDateFormat = (scheduledDate) =>{
 // Parse the input string and format it to "YYYY-MM-DD"
const formattedDate = moment(scheduledDate).format('YYYY-MM-DD');

  return formattedDate;
}

exports.validateTimeDate = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const diff = end.getTime() - start.getTime();
  let msec = diff;
  const shiftDuration = Math.floor(msec / 1000 / 60 / 60);

  if (shiftDuration !== 8) {
    return {
      success: false,
      message: "Shift Duration must be eight hours interval",
    };
  }
  if ((start < Date.now()) & (end < Date.now())) {
    console.log({ message: "Date and Time must be in the future" });
    return {
      success: false,
      message: "Date and Time must be in the future",
    };
  }
  return { success: true, data: { start, end } };
};

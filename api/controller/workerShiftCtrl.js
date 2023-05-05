const WorkerShiftService = require("../services/workerShiftService");

const workerShiftService = new WorkerShiftService();

exports.createWorkShift = async (req, res) => {
  const { workerId } = req.user;
  const { shiftId, startTime, endTime } = req.body;
  const data = { shiftId, startTime, endTime, workerId };
  try {
    const assignTask = await workerShiftService.assignShift(data);

    return res.json(assignTask);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getAllWorkShift = async (req, res) => {
  try {
    const { data, message, success } =
      await workerShiftService.getAllWorkerShift(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.status(200).json({ success, message, data });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getOneWorkShift = async (req, res) => {
  try {
    const { data, message, success } = await workerShiftService.getOneWorkShift(
      req
    );
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

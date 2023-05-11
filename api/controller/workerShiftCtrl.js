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
    const { workerId } = req.user;
    const getAllShift = await workerShiftService.getAllWorkerShift(workerId);
    res.status(200).json(getAllShift);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getOneWorkShift = async (req, res) => {
  const { id } = req.params;
  try {
    const getOneShift = await workerShiftService.getOneWorkShift(id);

    return res.json(getOneShift);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

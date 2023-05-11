const ShiftService = require("../services/shiftService");
const { getOneWorkShift } = require("./workerShiftCtrl");

const shiftService = new ShiftService();

exports.createShift = async (req, res) => {
  const { name, startTime, endTime } = req.body;
  try {
    const data = { name, startTime, endTime };
    const createdShift = await shiftService.createWorkShift(data);

    return res.json(createdShift);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getOneShift = async (req, res) => {
  const { id } = req.params;
  try {
    const getOneShift = await shiftService.getOneShift(id);
    return res.json(getOneShift);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getAllShift = async (req, res) => {
  try {
    const getAllShift = await shiftService.getAllShift();
    res.json(getAllShift);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

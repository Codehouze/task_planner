const ShiftService = require("../services/shiftService");

const shiftService = new ShiftService();

exports.createShift = async (req, res) => {
  try {
    const { data, message, success } = await shiftService.createWorkerShift(
      req
    );

    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, message, data });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getOneShift = async (req, res) => {
  try {
    const { data, message, success } = await shiftService.getOneShift(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getAllShift = async (req, res) => {
  try {
    const { data, message, success } = await shiftService.getAllShift(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

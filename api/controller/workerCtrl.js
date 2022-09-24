const WorkerService = require("../services/workerService");

const workerService = new WorkerService();

exports.createWorker = async (req, res) => {
  try {
    const { data, message, success } = await workerService.createWorker(req);

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

exports.workerLogin = async (req, res) => {
  try {
    const { data, message, success } = await workerService.login(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.status(200).json({ success, message, data });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getOneWorker = async (req, res) => {
  try {
    const { data, message, success } = await workerService.getOneWorker(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getAllWorkers = async (req, res) => {
  try {
    const { data, message, success } = await workerService.getAllWorkers(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const WorkerService = require("../services/workerService");

const workerService = new WorkerService();

exports.createWorker = async (req, res) => {
  const { name, email, gender, password } = req.body;
  const data = { name, email, gender, password };
  try {
    const createdWorker = await workerService.createWorker(data);
    res.json(createdWorker);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.workerLogin = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    const data = { email, password };
    const loggedInWorker = await workerService.login(data);

    res.status(200).json(loggedInWorker);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getOneWorker = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const oneWorker = await workerService.getOneWorker(id);

    res.json(oneWorker);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAllWorkers = async (req, res) => {
  try {
    const getAllWorkers = await workerService.getAllWorkers();

    res.json(getAllWorkers);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

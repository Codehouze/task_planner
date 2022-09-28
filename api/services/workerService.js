const Worker = require("../model/workerModel");
const generateHashPassword = require("../utils/generateHashPassword");
const { createToken } = require("../utils/createToken");
const { compare } = require("bcrypt");

require("dotenv").config();
class WorkerService {
  async createWorker(req) {
    const { name, email, gender, password } = req.body;
    const user = await Worker.findOne({ email });
    console.log(user);
    if (user) {
      return { success: false, message: "Account already exist", data: {} };
    }
    if (password.length < 8) {
      return {
        success: false,
        message: "Password should be greater than 8 characters",
      };
    }

    const hashedPassword = await generateHashPassword(password);

    const newWorker = new Worker({
      name,
      email,
      password: hashedPassword,
      gender,
    });
    await newWorker.save();
    return {
      success: true,
      message: `Worker Created successfully`,
      data: newWorker,
    };
  }
  async login(req) {
    const { email, password } = req.body;
    const worker = await Worker.findOne({ email });

    if (!worker) {
      return {
        success: false,
        message: "Incorrect email or password",
        data: {},
      };
    }

    const match = compare(password, user.password);
    if (!match) {
      return {
        success: false,
        message: "Incorrect email or password",
        data: {},
      };
    }

    const token = createToken({ id: user._id }, "2d");

    return { success: true, message: "login successfully", data: token };
  }

  async getOneWorker(req) {
    const { id } = req.param;
    const worker = await Worker.findOne({ id });
    console.log(worker);
    if (!worker) {
      return {
        success: false,
        message: "Worker not found",
        data: {},
      };
    }

    return { success: true, message: "successful", data: worker };
  }
  async getAllWorkers(req) {
    const workers = await Worker.find({});

    if (!workers) {
      return {
        success: false,
        message: "Workers not found",
        data: {},
      };
    }

    return { success: true, message: "successful", data: workers };
  }
}
module.exports = WorkerService;

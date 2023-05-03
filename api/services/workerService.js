const Worker = require("../model/workerModel");
const generateHashPassword = require("../utils/generateHashPassword");
const { createToken } = require("../utils/createToken");
const { compareSync } = require("bcrypt");

require("dotenv").config();
class WorkerService {
  async createWorker(data) {
    const { name, email, gender, password } = data;
    const user = await Worker.findOne({ email });
    if (user) {
      return { message: "Account already exist" };
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
      message: `Worker Created successfully`,
    };
  }
  async login(data) {
    const { email, password } = data;

    const worker = await Worker.findOne({ email });

    if (!worker) {
      return {
        message: "Incorrect email or password",
      };
    }

    const isPasswordAMatch = compareSync(password, worker.password);
    if (!isPasswordAMatch) {
      return {
        message: "Incorrect email or password",
      };
    }

    const token = await createToken({ email, id: worker._id });

    return { message: "login successfully", token };
  }
  async getOneWorker(id) {
    const worker = await Worker.findOne({ id });
    if (!worker) {
      return {
        success: false,
        message: "Worker not found",
        data: {},
      };
    }
    return { success: true, message: "successful", data: worker };
  }
  async getAllWorkers() {
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

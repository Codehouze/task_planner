const Shift = require("../model/shiftModel");
const { validateTime } = require("../middleware/validateTime");

class ShiftService {
  async createWorkShift(data) {
    const { name, startTime, endTime } = data;

    const existingShift = await Shift.findOne({ name });

    if (existingShift) {
      return { message: "Shift already exist" };
    }
    const shiftTimeValidation = validateTime(startTime, endTime);
    if (shiftTimeValidation) {
      return shiftTimeValidation;
    }

    const shift = new Shift({
      name,
      startTime,
      endTime,
    });
    const newShift = await shift.save();

    return {
      message: `${name} created successfully.`,
      newShift,
    };
  }

  async getAllShift() {
    const shift = await Shift.find();

    if (!shift) {
      return { message: "Shift Not found" };
    }

    return shift;
  }

  async getOneShift(id) {
    const shift = await Shift.findOne({ id });
    if (!shift) {
      return { message: "Shift Not found" };
    }
    return shift;
  }
}
module.exports = ShiftService;

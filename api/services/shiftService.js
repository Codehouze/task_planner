const Shift = require("../model/shiftModel");
const { validateShiftDuration } = require("../middleware/validateTime");

class ShiftService {
  async createWorkShift(data) {
    const { name, startHour, endHour } = data;
    const shiftExist = this.getShift(name);

    if (shiftExist) {
      return shiftExist;
    }

    const isNotValidShiftDuration = validateShiftDuration(startHour, endHour);
    if (isNotValidShiftDuration) {
      return isNotValidShiftDuration;
    }

    const formData = new Shift({
      name,
      startHour,
      endHour,
    });
    await formData.save();

    return {
      success: true,
      message: `Shift ${name} created successfully.`,
      data: formData,
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

  async getShift(name) {
    const existingShift = await Shift.findOne({ name });

    if (existingShift) {
      return { message: "Shift already exist" };
    }
  }
}
module.exports = ShiftService;

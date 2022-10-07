const Shift = require("../model/shiftModel");

class ShiftService {
  async createWorkerShift(req) {
    const { name, startHour, endHour } = req.body;

    const getOneShift = await Shift.findOne({ name });

    if (getOneShift) {
      return { success: false, message: "Shift already exist" };
    }

    const shiftDuration = parseInt(endHour) - parseInt(startHour);

    if (shiftDuration !== 8) {
      return { success: false, message: "A shift must be 8 hours long" };
    }

    const formData = new Shift({
      name,
      startHour,
      endHour,
    });
    await formData.save();
    return {
      success: true,
      message: `Shift Created successfully`,
      data: formData,
    };
  }
  async getAllShift() {
    const shift = await Shift.find();
    if (!shift) {
      return { success: false, message: "Shift Not found" };
    }

    return {
      success: true,
      message: "shift returned successfully",
      data: shift,
    };
  }

  async getOneShift(req) {
    const { id } = req.param;
    const shift = await Shift.findOne({ id });
    if (!shift) {
      return { success: false, message: "Shift Not found" };
    }

    return {
      success: true,
      message: "shift returned successfully",
      data: shift,
    };
  }
}
module.exports = ShiftService;

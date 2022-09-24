const workerShift = require("../model/workerShiftModel");

class WorkerShiftService {
  async assignShift(req) {
    //TODO: A worker has shifts
    const { id } = req.params;
    typeof id;
    const { shiftId, startTime, endTime } = req.body;
    const Shift = await workerShift.findOne(
      { workerId: id }

      // TODO:A worker never has two shifts on the same day
      // { endTime: { $lte: Date.now() } }

      //check if worker has a shift within the day selected.
      // const Shift = await workerShift.find(
      //   { id },
      //   { endHour: { $lte: Data.now() } }
    );

    const start = new Date(startTime);
    const end = new Date(endTime);

    console.log(start.getHours());
    console.log(end.getHours());

    if (start.getHours() > end.getHours()) {
      return {
        success: false,
        message: "Start time must be less than end time",
      };
    }

    if ((start < Date.now()) & (end < Date.now())) {
      return {
        success: false,
        message: "Date and Time must be a in the future",
      };
    }

    //TODO: check if their interval is eight hours
    if (start.getHours() - end.getHours > 8) {
      return { success: false, message: "Date must be a future date" };
    }
    //TODO: check if it is within the same day
    if ((start < Date.now()) & (end < Date.now())) {
      return { success: false, message: "Date must be a future date" };
    }

    if (Shift) {
      return {
        success: false,
        message: "Worker has a shift already",
        data: {},
      };
    }
    const assignShift = new workerShift({
      workerId: id,
      shiftId,
      startTime: start,
      endTime: end,
    });

    await assignShift.save();
    return {
      success: true,
      message: "Shift assigned successful",
      data: assignShift,
    };
  }
  async getAllWorkerShift(req) {
    const shifts = await workerShift.find();

    if (!shifts) {
      return {
        success: false,
        message: "No Shift found",
        data: {},
      };
    }

    return {
      success: true,
      message: "Shifts returned",
      data: shifts,
    };
  }
  async getOneWorkShift(req) {
    const { id } = req.param;
    const shift = await workerShift.findOne({ id });

    if (!shift) {
      return {
        success: false,
        message: "no shift found",
        data: {},
      };
    }
    return {
      success: true,
      message: "Shift Returned successful",
      data: shift,
    };
  }
}

module.exports = WorkerShiftService;

// async function GetSettings() {
//     return Settings.findById("61ab47d022a11e03ff3b8fe5").exec();
//   }

//   function CheckIndex(index) {
//     if (isNaN(index)) {
//       console.log("not a number");
//       return false;
//     }
//     if (index < 0) {
//       console.log("negative number");
//       return false;
//     }
//     if (!Number.isInteger(parseFloat(index))) {
//       console.log("not an integer");
//       return false;
//     }
//     return true;
//   }

//   module.exports.getAllSettings = function () {
//     return GetSettings()
//       .then((settings) => {
//         return {
//           Worker_Roles: settings.worker_roles || [],
//           Work_Shits: settings.work_shifts || [],
//           Shift_duration: settings.work_shift_duration || null,
//           Available_Languages: settings.languages || [],
//         };
//       })
//       .catch((err) => {
//         console.log(err);
//         return null;
//       });
//   };

//   module.exports.getLanguages = function () {
//     return GetSettings()
//       .then((setting) => {
//         return setting.languages;
//       })
//       .catch((err) => {
//         console.log(err);
//         return null;
//       });
//   };

//   module.exports.getResponseMessages = function (languageIdentifier) {
//     if (languageIdentifier == null) languageIdentifier = "gb";
//     return Settings.find(
//       {
//         _id: "61ab47d022a11e03ff3b8fe5",
//         "response_messages.identifier": languageIdentifier,
//       },
//       {
//         "response_messages.$": 1,
//         _id: 0,
//       }
//     ).exec();
//   };

//   module.exports.getLanguageByIndex = function (index) {
//     return GetSettings()
//       .then((setting) => {
//         let indexCheck = CheckIndex(index);
//         if (indexCheck == false) return null;
//         if (index < setting.languages.length) {
//           return setting.languages[index];
//         } else {
//           console.log("the provided index is incorrect");
//           return null;
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         return null;
//       });
//   };

//   module.exports.getRoles = function () {
//     return GetSettings()
//       .then((setting) => {
//         return setting.worker_roles;
//       })
//       .catch((err) => {
//         console.log(err);
//         return null;
//       });
//   };

//   module.exports.getRoleByIndex = function (index) {
//     return GetSettings()
//       .then((setting) => {
//         let indexCheck = CheckIndex(index);
//         if (indexCheck == false) return null;
//         if (index < setting.worker_roles.length) {
//           return setting.worker_roles[index];
//         } else {
//           console.log("the provided index is incorrect");
//           return null;
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         return null;
//       });
//   };

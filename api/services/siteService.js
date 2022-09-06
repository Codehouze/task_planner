async function GetSettings() {
    return Settings.findById("61ab47d022a11e03ff3b8fe5").exec();
  }
  
  function CheckIndex(index) {
    if (isNaN(index)) {
      console.log("not a number");
      return false;
    }
    if (index < 0) {
      console.log("negative number");
      return false;
    }
    if (!Number.isInteger(parseFloat(index))) {
      console.log("not an integer");
      return false;
    }
    return true;
  }
  
  module.exports.getAllSettings = function () {
    return GetSettings()
      .then((settings) => {
        return {
          User_Roles: settings.user_roles || [],
          Work_Shits: settings.work_shifts || [],
          Shift_duration: settings.work_shift_duration || null,
          Available_Languages: settings.languages || [],
        };
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };
  
  module.exports.getLanguages = function () {
    return GetSettings()
      .then((setting) => {
        return setting.languages;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };
  
  module.exports.getResponseMessages = function (languageIdentifier) {
    if (languageIdentifier == null) languageIdentifier = "gb";
    return Settings.find(
      {
        _id: "61ab47d022a11e03ff3b8fe5",
        "response_messages.identifier": languageIdentifier,
      },
      {
        "response_messages.$": 1,
        _id: 0,
      }
    ).exec();
  };
  
  module.exports.getLanguageByIndex = function (index) {
    return GetSettings()
      .then((setting) => {
        let indexCheck = CheckIndex(index);
        if (indexCheck == false) return null;
        if (index < setting.languages.length) {
          return setting.languages[index];
        } else {
          console.log("the provided index is incorrect");
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };
  
  module.exports.getRoles = function () {
    return GetSettings()
      .then((setting) => {
        return setting.user_roles;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };
  
  module.exports.getRoleByIndex = function (index) {
    return GetSettings()
      .then((setting) => {
        let indexCheck = CheckIndex(index);
        if (indexCheck == false) return null;
        if (index < setting.user_roles.length) {
          return setting.user_roles[index];
        } else {
          console.log("the provided index is incorrect");
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };
  
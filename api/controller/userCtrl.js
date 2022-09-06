const UserService = require("../services/userService");

const userService = new UserService();

exports.createUser = async (req, res) => {
  try {
    const { data, message, success } = await userService.create(req);

    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, message, data });
  } catch (err) {
    // logger.error(
    //          `Method:${req.method}
    //      Endpoint:${req.originalUrl} message:${err.message}, stack trace:${err.stack}`

    //         );
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { data, message, success } = await userService.login(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.status(200).json({ success, message, data });
  } catch (err) {
    // logger.error(
    //          `Method:${req.method}
    //      Endpoint:${req.originalUrl} message:${err.message}, stack trace:${err.stack}`

    //         );
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { data, message, success } = await userService.getOneUser(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    // logger.error(
    //          `Method:${req.method}
    //      Endpoint:${req.originalUrl} message:${err.message}, stack trace:${err.stack}`

    //         );
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { data, message, success } = await userService.getAllUsers(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    // logger.error(
    //          `Method:${req.method}
    //      Endpoint:${req.originalUrl} message:${err.message}, stack trace:${err.stack}`

    //         );
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { data, message, success } = await userService.updateUser(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    // logger.error(
    //          `Method:${req.method}
    //      Endpoint:${req.originalUrl} message:${err.message}, stack trace:${err.stack}`

    //         );
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const { data, message, success } = await userService.activateAccount(req);

    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, message });
  } catch (err) {
    console.log(err);
    // logger.error(
    //          `Method:${req.method}
    //      Endpoint:${req.originalUrl} message:${err.message}, stack trace:${err.stack}`

    //         );
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { data, message, success } = await userService.forgetPassword(req);
    if (!success) {
      return res.status(400).json({ success, message: message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    // logger.error(
    //          `Method:${req.method}
    //      Endpoint:${req.originalUrl} message:${err.message}, stack trace:${err.stack}`

    //         );
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { data, message, success } = await userService.resetPassword(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    // logger.error(
    //          `Method:${req.method}
    //      Endpoint:${req.originalUrl} message:${err.message}, stack trace:${err.stack}`

    //         );
    return res.status(500).json({ success: false, err: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { data, message, success } = await userService.changePassword(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    // logger.error(
    //          `Method:${req.method}
    //      Endpoint:${req.originalUrl} message:${err.message}, stack trace:${err.stack}`

    //         );
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { data, message, success } = await userService.deleteUser(req);
    if (!success) {
      return res.status(400).json({ success, message });
    }
    return res.json({ success, data, message });
  } catch (err) {
    // logger.error(
    //          `Method:${req.method}
    //      Endpoint:${req.originalUrl} message:${err.message}, stack trace:${err.stack}`

    //         );
    return res.status(500).json({ success: false, message: err.message });
  }
};

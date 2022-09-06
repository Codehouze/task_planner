const User = require("../model/UserModel");
const generateHashPassword = require("../utils/generateHashPassword");
const generateToken = require("../utils/generateToken");
const { createToken, decodeToken } = require("../utils/createToken");
const { compare } = require("bcrypt");

require("dotenv").config();
const { APP_URL, SECRET_KEY } = process.env;
class UserService {
  async create(req) {
    const { name, email, password, gender } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return { success: false, message: "Account already exist", data: {} };
    }

    const hashedPassword = generateHashPassword(password);

    const payLoad = {
      name,
      email,
      password: hashedPassword,
      gender,
    };
    const newUser = await User.save(payLoad);
    delete newUser.password;
    const token = generateToken(newUser.id);
    const origin =
      req.headers.origin != undefined ? req.headers.origin : `${APP_URL}`;
    const url = `${origin}/email-verification/${token}`;
    //TODO: send email to user
    // await firstEmail(url, name, email);
    return {
      success: true,
      message: `User Created successfully`,
      data: newUser,
    };
  }
  async activateAccount(req) {
    const { token } = req.params;
    const email = decodeToken(token, SECRET_KEY);
    const user = await User.findOne({ email });

    if (user.isActivated) {
      let result = { success: false, message: "Email Already Verified" };
      return result;
    }
    const data = await user.findAndUpdate({ isActivated: true });
    let result = { success: true, data, message: "Email Verified" };

    return result;
  }

  async login(req) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "Incorrect email or password",
        data: {},
      };
    }

    if (user.isActivated == false) {
      return { success: false, message: "Activate Account" };
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
  async updateUser(req) {
    const { id } = req.user;
    const { name, gender, status } = req.body;

    const formData = {
      name,
      gender,
      status,
    };

    const user = await user.findByIdAndUpdate(id, formData, {
      useFindAndModify: false,
    });

    if (!user) {
      return { success: false, message: "User Not Found" };
    }
    return { success: true, message: "success", data: user };
  }
  async forgetPassword(req) {
    const { email } = req.body;

    const data = await User.find().exclude("password");

    if (!data) {
      return {
        success: false,
        message: "if this email exist a mail will be sent to it",
      };
    }

    const token = createToken({ email }, "1h");
    const origin =
      req.headers.origin != undefined ? req.headers.origin : `${APP_URL}`;
    const url = `${origin}/reset-password/${token}`;

    // const mailer = await forgotPasswordMail(url, data.name, data.email);
    // if (!mailer) {
    //   return { message: "An error occurred kindly try again" };
    // }

    return {
      success: true,
      message: "if this email exist a mail will be sent to it",
    };
  }

  async resetPassword(req) {
    const { token } = req.params;

    const email = decodeToken(token, SECRET_KEY);

    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "User not Found",
      };
    }
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    } else {
      const hashedPassword = generateHashPassword(password);
      const formData = {
        password: hashedPassword,
      };

      const data = await User.findAndUpdate(user, formData);
      if (!data) {
        return {
          success: false,
          message: "Password was not updated successfully",
        };
      }
      return {
        success: true,
        message: "Password updated Successfully",
      };
    }
  }

  async changePassword(req) {
    const { id } = req.user;

    const { oldPassword, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }
    const user = await User.findById(id);

    if (!user) {
      return { success: false, message: "user does not exist" };
    }

    const match = compare(oldPassword, user.password);
    if (!match) {
      return { success: false, message: "Password is incorrect" };
    }
    if (oldPassword == password) {
      return {
        success: false,
        message: "New Password and old password Cannot be same",
      };
    }

    const hashedPassword = generateHashPassword(password);

    const formData = {
      password: hashedPassword,
    };

    const data = await User.findAndUpdate(user, formData);

    // const sendMail = await changeEmail(user.name, user.email);
    if (!sendMail) {
      return {
        success: false,
        message: "Password was not successful changed kindly try again",
      };
    }
    return { success: true, data, message: "Password change successful" };
  }
  async getOneUser(req) {
    const { id } = req.params;
    const user = await User.findById(id).exec();
    if (!user) {
      return { success: false, message: "User Not Found" };
    }
    return { success: true, message: "success", data: user };
  }
  async getAllUsers() {
    const user = await User.find().exclude("password");
    if (!user) {
      return { success: false, message: "No Users Found" };
    }
    return { success: true, message: "success", data: user };
  }
  async deleteUser(req) {
    const { id } = req.params;

    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return { success: false, message: "User not found" };
    }
    return { success: true, message: "User deleted" };
  }
}
module.exports = UserService;

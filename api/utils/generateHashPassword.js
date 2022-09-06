const { hash } = require("bcrypt");

const generateHashPassword = (password) => {
  if (password.length < 8) {
    throw new Error("Password should be greater than 8 characters");
  }
  return hash(password, 10);
};

module.exports = generateHashPassword;

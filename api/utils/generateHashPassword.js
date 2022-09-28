const { hash } = require("bcrypt");

const generateHashPassword = (password) => {
  //
  return hash(password, 10);
};

module.exports = generateHashPassword;

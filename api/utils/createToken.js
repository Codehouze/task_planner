const { sign } = require("jsonwebtoken");
require("dotenv").config();

module.exports.createToken = (payload, expires) => {
  return sign(payload, process.env.SECRET_KEY, { expiresIn: expires });
};

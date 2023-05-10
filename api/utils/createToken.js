const { sign } = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

exports.createToken = (payload) => {
  const token = sign(payload, SECRET_KEY, { expiresIn: "1d" });

  return token;
};

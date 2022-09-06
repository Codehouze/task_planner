const { sign } = require("jsonwebtoken");
require("dotenv").config();

const { APP_SECRET } = process.env;
const generateToken = (userId) => {
  const token = sign(
    {
      userId,
    },
    APP_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};
module.exports = generateToken;

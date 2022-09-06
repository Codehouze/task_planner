const {sign, verify} = require("jsonwebtoken");
require("dotenv").config();

module.exports.createToken = (payload, expires) =>{
  return sign(payload, process.env.SECRET_KEY, { expiresIn: expires });
};

module.exports.decodeToken = (token, secret) => {
  verify(token, secret, async (err, decode) => {
    if (err) {
      let result = { data: null, message: "Invalid Token" };
      return result;
    }

    const { email } = decode;
  });
};
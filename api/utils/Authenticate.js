const { verify } = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(403).json({ success: false, message: "Forbidden Request" });
  }
};

module.exports = checkToken;

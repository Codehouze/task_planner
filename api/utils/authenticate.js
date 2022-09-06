const { verify } = require("jsonwebtoken");
require("dotenv").config();

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    // Verify if token is valid
    verify(token, process.env.SECRET_KEY, (err, decode) => {
      // If the token is invalid send a Forbidden 413
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
    //If header is undefined return Forbidden (403)
    res.status(403).json({ success: false, message: "Forbidden Request" });
  }
};

module.exports = checkToken;

const { check } = require("express-validator");

const validator = {
  // Validator for Sign In
  signInValidator: [
    // Email must be specified
    check("email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .withMessage("Email is required"),

    // password must be at least 6 chars long
    check("password")
      .isLength({ min: 6 })
      .withMessage(
        "Password are required and must be longer than 6 characters"
      ),
  ],
  validateEmail: [
    // Email must be specified
    check("email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .withMessage("Email is required"),
  ],
  signUpValidator: [
    check("name").isString().notEmpty().withMessage("name is Required"),
    check("gender").isString().notEmpty().withMessage("gender is Required"),
    check("email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .notEmpty()
      .withMessage("Email is required"),
    check("password")
      .isString()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage(
        "Password are required and must be longer than 6 characters"
      ),
  ],
};
module.exports = validator;

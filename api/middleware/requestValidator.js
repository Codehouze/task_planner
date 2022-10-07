const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req).array({
    onlyFirstError: true,
  });

  if (errors.length) {
    return res.status(422).json({ success: false, errors });
  }
  return next();
};

module.exports = { validateRequest };

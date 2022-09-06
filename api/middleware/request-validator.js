const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req).array({
    onlyFirstError: true,
  });

  if (errors.length) {
    return res.status(422).json({ success: false, errors });
  }
  //returns an error if a wrong file type was uploaded
  if (req.uploadError) {
    return res.status(422).json({ success: false, error: req.uploadError });
  }
  return next();
};

module.exports = { validateRequest };
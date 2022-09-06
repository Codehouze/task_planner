const userCtrl = require("../controller/userCtrl");
const validator = require("../middleware/validate");
const { validateRequest } = require("../middleware/request-validator");


const isAuthenticated = require("../utils/authenticate");

const router = require("express").Router();

router.post(
  "/",
  validator.signUpValidator,
  validateRequest,
  userCtrl.createUser
);

router.post(
  "/forgotPassword",
  validator.validateEmail,
  validateRequest,
  userCtrl.forgotPassword
);

router.patch("/", isAuthenticated, userCtrl.updateUser);

router.patch("/reset_password/:token", userCtrl.ResetPassword);

router.patch("/change_password", isAuthenticated, userCtrl.changePassword);

router.post(
  "/login",
  validator.signInValidator,
  validateRequest,
  userCtrl.userLogin
);

router.get("/email-verification/:token", userCtrl.confirmEmail);

router.get("/:id", userCtrl.getOneUser);

module.exports = router;
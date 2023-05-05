const workerCtrl = require("../controller/workerCtrl");
const validator = require("../middleware/validate");
const { validateRequest } = require("../middleware/requestValidator");
const isAuthenticated = require("../utils/Authenticate");

const router = require("express").Router();

router.post(
  "/",
  validator.signUpValidator,
  validateRequest,
  workerCtrl.createWorker
);

router.post(
  "/login",
  validator.signInValidator,
  validateRequest,
  workerCtrl.workerLogin
);

router.get("/", isAuthenticated, workerCtrl.getAllWorkers);

router.get("/:id", isAuthenticated, workerCtrl.getOneWorker);

module.exports = router;

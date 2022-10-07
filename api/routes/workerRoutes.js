const workerCtrl = require("../controller/workerCtrl");
const validator = require("../middleware/validate");
const { validateRequest } = require("../middleware/requestValidator");

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

router.get("/", workerCtrl.getAllWorkers);

router.get("/:id", workerCtrl.getOneWorker);

module.exports = router;

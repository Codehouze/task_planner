const workerShiftCtrl = require("../controller/workerShiftCtrl");
const validator = require("../middleware/validate");
const { validateRequest } = require("../middleware/requestValidator");
const isAuthenticated = require("../utils/Authenticate");

const router = require("express").Router();

router.post(
  "/",
  isAuthenticated,
  // validator.signUpValidator,
  // validateRequest,
  workerShiftCtrl.createWorkShift
);

router.get("/", isAuthenticated, workerShiftCtrl.getAllWorkShift);
router.get("/:id", isAuthenticated, workerShiftCtrl.getOneWorkShift);

module.exports = router;

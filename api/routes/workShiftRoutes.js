const workerShiftCtrl = require("../controller/workerShiftCtrl");
const validator = require("../middleware/validate");
const { validateRequest } = require("../middleware/request-validator");

const router = require("express").Router();

router.post(
  "/:id",
  // validator.signUpValidator,
  // validateRequest,
  workerShiftCtrl.createWorkShift
);

router.get("/", workerShiftCtrl.getAllWorkShift);
router.get("/:id", workerShiftCtrl.getOneWorkShift);

module.exports = router;

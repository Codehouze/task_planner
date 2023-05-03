const workerShiftCtrl = require("../controller/workerShiftCtrl");
const validator = require("../middleware/validate");
const { validateRequest } = require("../middleware/requestValidator");

const router = require("express").Router();

router.post(
  "/",
  // validator.signUpValidator,
  // validateRequest,
  workerShiftCtrl.createWorkShift
);

router.get("/", workerShiftCtrl.getAllWorkShift);
router.get("/:id", workerShiftCtrl.getOneWorkShift);

module.exports = router;

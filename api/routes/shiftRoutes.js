const shiftCtrl = require("../controller/shiftCtrl");
const validator = require("../middleware/validate");
const { validateRequest } = require("../middleware/requestValidator");
const isAuthenticated = require("../utils/Authenticate");

const router = require("express").Router();

router.post(
  "/",
  isAuthenticated,
  // validator.signUpValidator,
  // validateRequest,
  shiftCtrl.createShift
);

router.get("/:id", shiftCtrl.getOneShift);
router.get("/", shiftCtrl.getAllShift);

module.exports = router;

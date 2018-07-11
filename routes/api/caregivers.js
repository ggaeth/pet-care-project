const router = require("express").Router();
const cgController = require("../../controllers/caregivers_controller");

// Matches with "/api/caregivers"
router
  .route("/")
  .get(cgController.getAllCgs)
  .post(cgController.create);

// Matches with "/api/caregivers/:id"
router
  .route("/:userName")
  .get(cgController.getCg)

module.exports = router;

const router = require("express").Router();
const cgController = require("../../controllers/caregivers_controller");

// Matches with "/api/caregivers"
router
  .route("/")
//  .get(cgController.findAll)
  .post(cgController.create);

// Matches with "/api/caregivers/:id"
router
//  .route("/:id")
//  .get(cgController.findById)
//  .put(cgController.update)
//  .delete(cgController.remove);

module.exports = router;

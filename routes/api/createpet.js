const router = require("express").Router();
const petsController = require("../../controllers/pets_controller");


// Matches with "/api/owners"
router
  .route("/")
  .post(petsController.create);

// Matches with "/api/owners/:userName"
router
  .route("/:pet_id")
  .get(petsController.getPet)

module.exports = router;
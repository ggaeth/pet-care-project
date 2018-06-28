const router = require("express").Router();
const petsController = require("../../controllers/pets_controller");

console.log("inside api/pets.js");

// Matches with "/api/owners"
router
  .route("/")
//  .get(ownersController.findAll)
  .post(petsController.create);

// Matches with "/api/owners/:userName"
router
  .route("/:pet_id")
  .get(petsController.getPet)
//  .put(ownersController.update)
//  .delete(ownersController.remove);

module.exports = router;
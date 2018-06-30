const router = require("express").Router();
const petsController = require("../../controllers/pets_controller");


console.log("inside routes/api/pets.js");

// Matches with "/api/pets"
//===================================================================================== //
router
  .route("/")
//  .get(petsController.findAll)
  .post(petsController.create);

// Matches with "/api/pets/byPetId/:petId"
// ==================================================================================== //
router
  .route("/byPetId/:petId")
  .get(petsController.getOnePet)

// Matches with "/api/pets/byOwnerId/:ownerId"
// ==================================================================================== //
router
  .route("/byOwnerId/:ownerId")
  .get(petsController.getPet)
//  .route("/:id")
//  .get(petsController.findById)
//  .put(petsController.update)
//  .delete(petsController.remove);

console.log("leaving routes/api/pets.js");

module.exports = router;

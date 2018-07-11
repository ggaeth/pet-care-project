const router = require("express").Router();
const petsController = require("../../controllers/pets_controller");

// Matches with "/api/pets"
//===================================================================================== //
router
  .route("/")
  .post(petsController.create)
  .put(petsController.update)

// Matches with "/api/pets/byPetId/:petId"
// ==================================================================================== //
router
  .route("/byPetId/:petId")
  .get(petsController.getOnePet)
  .delete(petsController.destroy)
  .put(petsController.updPetCg)

// Matches with "/api/pets/byOwnerId/:ownerId"
// ==================================================================================== //
router
  .route("/byOwnerId/:ownerId")
  .get(petsController.getPet)

// Matches with "/api/pets/byCgId/:CgId"
// ==================================================================================== //
router
  .route("/byCgId/:caregiver_id")
  .get(petsController.getPetCg)

module.exports = router;

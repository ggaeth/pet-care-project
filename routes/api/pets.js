const router = require("express").Router();
const petsController = require("../../controllers/pets_controller");

// Matches with "/api/pets"
router
  .route("/")
//  .get(petsController.findAll)
  .post(petsController.create);

// Matches with "/api/pets/:id"
router
//  .route("/:id")
//  .get(petsController.findById)
//  .put(petsController.update)
//  .delete(petsController.remove);

module.exports = router;

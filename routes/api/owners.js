const router = require("express").Router();
const ownersController = require("../../controllers/owners_controller");

// Matches with "/api/owners"
router
  .route("/")
  .post(ownersController.create);

// Matches with "/api/owners/:ownerId"
router
  .route("/ownById/:ownerId")
  .get(ownersController.getOwnById)

// Matches with "/api/owners/:userName"
router
  .route("/:userName")
  .get(ownersController.getOwner)

module.exports = router;

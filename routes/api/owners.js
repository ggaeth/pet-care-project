const router = require("express").Router();
const ownersController = require("../../controllers/owners_controller");

console.log("inside api/owners.js");

// Matches with "/api/owners"
router
  .route("/")
//  .get(ownersController.findAll)
  .post(ownersController.create);

// Matches with "/api/owners/:userName"
router
  .route("/:userName")
  .get(ownersController.getOwner)
//  .put(ownersController.update)
//  .delete(ownersController.remove);

module.exports = router;

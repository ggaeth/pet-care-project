const router = require("express").Router();
const userController = require("../../controllers/users_controller");

// Matches with "/api/users/owner/:userName"
router
  .route("/owner/:userName")
  .get(userController.getOwnLogin)

// Matches with "/api/users/caregiver/:userName"
router
  .route("/caregiver/:userName")
  .get(userController.getCareLogin)

// Matches with "/api/users/owner"
router
  .route("/owner/")
  .post(userController.createOwnLogin)


// Matches with "/api/users/caregiver"
router
  .route("/caregiver/")
  .post(userController.createCareLogin)

module.exports = router;

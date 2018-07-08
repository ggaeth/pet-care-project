const router = require("express").Router();
const userController = require("../../controllers/users_controller");

console.log("inside routes/api/users.js");

// Matches with "/api/users"
router
    .route("/")
    console.log("inside api/users")
//    .get(cgController.getAllCgs)
//    .post(cgController.ownerLogin);

// Matches with "/api/users/owner/:userName"
router
    .route("/owner/:userName")
    .get(userController.getOwnLogin)


// Matches with "/api/users/owner"
router
    .route("/owner/")
//  .put(cgController.update)
    .post(userController.createOwnLogin)
//  .delete(cgController.remove);


// Matches with "/api/users/caregiver"
router
    .route("/caregiver/")
    .post(userController.createCareLogin)
//  .get(cgController.getCg)
//  .put(cgController.update)
//  .delete(cgController.remove)

// Matches with "/api/users/caregiver/:userName"
router
    .route("/caregiver/:userName")
    .get(userController.getCareLogin)

router
//    .route("/:userName")
//    .get(cgController.getCg)
//  .put(cgController.update)
//  .delete(cgController.remove);

module.exports = router;

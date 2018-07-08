const router = require("express").Router();
const ownerRoutes = require("./owners");
const cgRoutes = require("./caregivers");
const petRoutes = require("./pets");
const createPet = require("./createpet");
const pettodoRoutes = require("./pettodos");
const userRoutes = require("./users");

console.log("inside routes/api/index.js");

// routes to the database. Note: These routes are prefixed with "api/".  ie "api/owners". 
router.use("/owners", ownerRoutes);
router.use("/caregivers", cgRoutes);
router.use("/pets", petRoutes);
router.use("/createpet", createPet);
router.use("/pettodos", pettodoRoutes);
router.use("/users", userRoutes);

module.exports = router;
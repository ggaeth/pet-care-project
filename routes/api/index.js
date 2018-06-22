const router = require("express").Router();
const ownerRoutes = require("./owners");
const cgRoutes = require("./caregivers");
const petRoutes = require("./pets");

console.log("inside routes/api/index.js");
// routes to the database. Note: These routes are prefixed with "api/".  ie "api/owners". 
router.use("/owners", ownerRoutes);
router.use("/caregivers", cgRoutes);
router.use("/pets", petRoutes);

module.exports = router;
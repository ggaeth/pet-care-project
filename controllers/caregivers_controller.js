var express = require("express");
var router = express.Router();
var db = require("../models/");

// get route -> index
router.get("/", (req, res) => {
  // send us to the next get function instead.
  res.redirect("/caregivers");
});

// get route
router.get("/caregivers", (req, res) => {
  // findAll
  db.caregiver.findAll()
    // 
    .then(dbCaregiver => {
      console.log(dbCaregiver);
      // into the main index, updating the page
      //     var hbsObject = { caregiver: dbcaregiver };
      //     return res.render("index", hbsObject);
    });
});

// post route to create caregivers
router.post("/caregivers/create", (req, res) => {
  // 
  db.caregiver.create({
    caregiver_name: req.body.caregiver_name
  })
    // pass the result of our call
    .then(dbCaregiver => {
      // log the result 
      console.log(dbCaregiver);
      // redirect
      //     res.redirect("/");
    });
});

// put route to update an caregiver
router.put("caregivers/update/:id", (req, res) => {
  // update one of the caregivers
  db.caregiver.update({
    caregiver_column1: true
  },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbCaregiver => {
    res.json("/");
  });
});

module.exports = router;

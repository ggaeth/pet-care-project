const express = require("express");
const router = express.Router();
const db = require("../models/");

// get route -> index
router.get("/", (req, res) => {
  // send us to the next get function instead.
  res.redirect("/pets");
});

// get route
router.get("/pets", (req, res) => {
  // findAll
  db.Pet.findAll()
    // 
    .then(dbPet => {
      console.log(dbPet);
      // into the main index, updating the page
      //     var hbsObject = { owner: dbPet};
      //     return res.render("index", hbsObject);
    });
});

// post route to create pets
router.post("/pets/create", (req, res) => {
  // 
  db.Pet.create({
    pet_name: req.body.pet_name
  })
    // pass the result of our call
    .then(dbPet => {
      // log the result 
      console.log(dbPet);
      // redirect
      //     res.redirect("/");
    });
});

// put route to update an owner
router.put("pets/update/:id", (req, res) => {
  // update one of the pets
  db.Pet.update({
    pet_column1: true
  },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbPet => {
    res.json("/");
  });
});

module.exports = router;

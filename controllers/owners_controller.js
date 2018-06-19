const express = require("express");
const router = express.Router();
const db = require("../models/");

// get route -> index
router.get("/", (req, res) => {
  // send us to the next get function instead.
  res.redirect("/owners");
});

// get route
router.get("/owners", (req, res) => {
  // findAll
  db.Owner.findAll()
    // 
    .then(dbOwner => {
      console.log(dbOwner);
      // into the main index, updating the page
 //     var hbsObject = { owner: dbOwner };
 //     return res.render("index", hbsObject);
    });
});

// post route to create owners
router.post("/owners/create", (req, res) => {
  // 
  db.Owner.create({
    owner_name: req.body.owner_name
  })
    // pass the result of our call
    .then(dbOwner => {
      // log the result 
      console.log(dbOwner);
      // redirect
 //     res.redirect("/");
    });
});

// put route to update an owner
router.put("owners/update/:id", (req, res) => {
  // update one of the owners
  db.Owner.update({
    owner_column1: true
  },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbOwner => {
    res.json("/");
  });
});

module.exports = router;

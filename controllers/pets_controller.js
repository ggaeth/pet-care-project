const db = require("../models/");

console.log("inside pets_controller");

module.exports = {
  getPet: function (req, res) {
    console.log("req.params is")
    console.log(JSON.stringify(req.params, null, 2))
    db.Pet
      .findAll({
        where: {
          "$owner_id$": req.params.ownerId
        },
        include: [{
          model: db.PetTodo
        }]
      })
      .then(dbPet => res.json(dbPet))
      //.catch(err => res.status(422).json(err));
      .catch(err => console.log(JSON.stringify(err, null, 2) + "\n"));
  },
    //for Cg routes
  getPetCg: function (req, res) {
    console.log("req.params is")
    console.log(JSON.stringify(req.params, null, 2))
    db.Pet
      .findAll({
        where: {
          "$caregiver_id$": req.params.caregiver_id
        },
        include: [{
          model: db.PetTodo
        }]
      })
      .then(dbPet => res.json(dbPet))
      //.catch(err => res.status(422).json(err));
      .catch(err => console.log(JSON.stringify(err, null, 2) + "\n"));
  },
  getOnePet: function (req, res) {
    console.log("inside getOnePet in pets_controller.js")
    console.log("req.params is")
    console.log(JSON.stringify(req.params, null, 2))
    db.Pet
      .findOne({
        where: {
          "$pet_id$": req.params.petId
        },
        include: [{
          model: db.PetTodo
        }]
      })
      .then(dbPet => res.json(dbPet))
      //.catch(err => res.status(422).json(err));
      .catch(err => console.log(JSON.stringify(err, null, 2) + "\n"));
  },
  create: function (req, res) {
    console.log("pets req.body is")
    console.log(JSON.stringify(req.body, null, 2))
    db.Pet
      .create(req.body.newPet)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updPetCg: function (req, res) {
    console.log("inside updPetCg function of pets_controller.js")
    console.log("pets req.body is")
    console.log(JSON.stringify(req.body, null, 2))
    console.log("pets req.params.petId is ")
    console.log(req.params.petId)
    db.Pet
      .update(
        req.body.cgObj,
        {
          where: { pet_id: req.params.petId }
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    console.log("inside update function of pets_controller.js")
    console.log("pets req.body is")
    console.log(JSON.stringify(req.body, null, 2))
    db.Pet
      .update(
        req.body.updatedPetObj,
        {where: {pet_id: req.body.updatedPetObj.pet_id} 
        } 
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  destroy: function (req, res) {
    console.log("inside pets_controller destroy function")
    console.log(req.params.petId)
    db.Pet
      .destroy({
        where: { pet_id: req.params.petId }
      },
        { force: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};

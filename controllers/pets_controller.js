const db = require("../models/");

module.exports = {
  getPet: function (req, res) {
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
      .catch(err => res.status(422).json(err));
  },
  getPetCg: function (req, res) {
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
      .catch(err => res.status(422).json(err));
  },
  getOnePet: function (req, res) {
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
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Pet
      .create(req.body.newPet)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updPetCg: function (req, res) {
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
    db.Pet
      .destroy({
        where: { pet_id: req.params.petId }
      },
        { force: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};

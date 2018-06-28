const db = require("../models");

module.exports = {
  getPet: function (req, res) {
    console.log("req.params is")
    console.log(JSON.stringify(req.params, null, 2))
    db.Pet
      .findAll({
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
    db.Pet
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

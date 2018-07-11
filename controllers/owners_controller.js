const db = require("../models");

module.exports = {
  getOwner: function (req, res) {
    db.Owner
      .findAll({
        where: {
          "$username$": req.params.userName 
        },
        include: [{
          model: db.Pet,
          }]
      })  
      .then(dbOwner => res.json(dbOwner))
      .catch(err => res.status(422).json(err));
  },
  getOwnById: function (req, res) {
    db.Owner
      .findAll({
        where: {
          "owner_id": req.params.ownerId
        }
       })
      .then(dbOwner => res.json(dbOwner))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Owner
      .create(req.body.newOwner)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

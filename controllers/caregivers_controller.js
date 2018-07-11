var db = require("../models");

module.exports = {
  getAllCgs: function (req, res) {
    db.Caregiver
      .findAll()
      .then(dbCg => res.json(dbCg))
      .catch(err => res.status(422).json(err));
  },
  getCg: function (req, res) {
    db.Caregiver
      .findAll({
        where: {
          "$username$": req.params.userName
        }
      })
      .then(dbCg => res.json(dbCg))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Caregiver
      .create(req.body.newCareGiver)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
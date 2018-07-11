var db = require("../models");

module.exports = {
  getOwnLogin: function (req, res) {
    db.User
      .findAll({
        where: {
          "$username$": req.params.userName
        }
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  getCareLogin: function (req, res) {
    db.User
      .findAll({
        where: {
          "$username$": req.params.userName
        }
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  createOwnLogin: function (req, res) {
    db.User
      .create(req.body.ownLogObj)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createCareLogin: function (req, res) {
    db.User
      .create(req.body.careLogObj)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
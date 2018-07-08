var db = require("../models");

module.exports = {
  getOwnLogin: function (req, res) {
    console.log("inside getOwnLogin of users_controller.js")
    console.log("users controller req.params is")
    console.log(JSON.stringify(req.params, null, 2))
    db.User
      .findAll({
        where: {
          "$username$": req.params.userName
        }
      })
      .then(dbUser => res.json(dbUser))
      //.catch(err => res.status(422).json(err));
      .catch(err => console.log(JSON.stringify(err, null, 2) + "\n"));
  },
  getCareLogin: function (req, res) {
    console.log("inside getCareLogin of users_controller.js")
    console.log("users controller req.params is")
    console.log(JSON.stringify(req.params, null, 2))
    db.User
      .findAll({
        where: {
          "$username$": req.params.userName
        }
      })
      .then(dbUser => res.json(dbUser))
      //.catch(err => res.status(422).json(err));
      .catch(err => console.log(JSON.stringify(err, null, 2) + "\n"));
  },
  createOwnLogin: function (req, res) {
    console.log("users controller req.body is")
    console.log(JSON.stringify(req.body, null, 2))
    db.User
      .create(req.body.ownLogObj)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createCareLogin: function (req, res) {
    console.log("users controller req.body is")
    console.log(JSON.stringify(req.body, null, 2))
    db.User
      .create(req.body.careLogObj)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
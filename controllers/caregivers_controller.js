var db = require("../models");

module.exports = {
  getCg: function (req, res) {
    console.log("req.params is")
    console.log(JSON.stringify(req.params, null, 2))
    db.Caregiver
      .findAll({
        where: {
          "$username$": req.params.userName
        }
      })
      .then(dbCg => res.json(dbCg))
      //.catch(err => res.status(422).json(err));
      .catch(err => console.log(JSON.stringify(err, null, 2) + "\n"));
  },

  create: function (req, res) {
    console.log("caregivers controller req.body is")
    console.log(JSON.stringify(req.body, null, 2))
    db.Caregiver
      .create(req.body.newCareGiver)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
var db = require("../models/");

module.exports = {
  create: function (req, res) {
    console.log("caregivers controller req.body is")
    console.log(JSON.stringify(req.body, null, 2))
    db.Caregiver
      .create(req.body.newCareGiver)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};



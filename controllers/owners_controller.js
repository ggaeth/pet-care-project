const db = require("../models");

module.exports = {
  getOwner: function (req, res) {
    console.log("req.params is")
    console.log(JSON.stringify(req.params, null, 2))
    db.Owner
      .findAll({
        where: {
          username: req.params.userName
        }
      })  
      .then(dbOwner => res.json(dbOwner))
      //.catch(err => res.status(422).json(err));
      .catch(err => console.log(JSON.stringify(err, null, 2) + "\n"));
  },
  create: function (req, res) {
    console.log("req.body is")
    console.log(JSON.stringify(req.body, null, 2))
    db.Owner
      .create(req.body.newOwner)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      //.catch(err => console.log(JSON.stringify(err, null, 2) + "\n"));
  }
};

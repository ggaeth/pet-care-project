const db = require("../models");

module.exports = {
  create: function (req, res) {
    console.log("req.body is")
    console.log(JSON.stringify(req.body, null, 2))
    db.Owner
      .create(req.body.newOwner)
      .then(dbModel => res.json(dbModel))
    //  .catch(err => res.status(422).json(err));
      .catch(err => console.log(JSON.stringify(err, null, 2) + "\n"));
  }
};

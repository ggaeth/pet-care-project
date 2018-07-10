const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
var db = require("./models");
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("client/build"));

app.use(routes);  

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const flash = require('connect-flash');
const routes = require("./routes");
var db = require("./models");
require('dotenv').config();
const passport = require("passport");
const passportConfig = require("./config/passport");
const application = require("./routes/application");

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("client/build"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.post('/auth',
  passport.authenticate('local'),
  function (req, res) {
    if (req.isAuthenticated()) {
      res.sendStatus(200);
    }
  }
);

app.get('/logout', application.destroySession);

app.use(routes);  

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
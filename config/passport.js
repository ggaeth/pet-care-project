const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')

// Serialize sessions
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  db.User.findOne({ where: { username: user.username } })
    .then(user => {
      done(null, user);
    }).error(function (err) {
      done(err, null);
    });
});

passport.use(new LocalStrategy(
  {
    usernameField: "username"
  },
  function (username, password, done) {

    //When user tries to sign in 
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function (dbUser) {
      //If there is no user with that given username 
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }
      //if username but incorrect password
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      //if none of the above errors then return user
      return done(null, dbUser);
    });
  }
));

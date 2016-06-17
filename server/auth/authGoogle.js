var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth');
var User = require(__dirname + '/../users/userModel');

if (process.env.NODE_ENV === 'dev') {
  console.log('dev');
  var googleKeys = require(__dirname + '/../config/googleplus'),
      clientID = googleKeys.clientID,
      clientSecret = googleKeys.clientSecret;
} else {
  var clientID = process.env.GOOGLE_CLIENT_ID,
      clientSecret = process.env.GOOGLE_CLIENT_SECRET;
}

// Middleware for checking whether the user is logged in
module.exports.checkAuth = function (req, res, next) {
  if (req.session.passport ? req.session.passport.user : false) {
    next();
  } else {
    req.session.error = 'Bad credentials.';
    res.redirect('/');
  }
};

module.exports.handleLogin = passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
});

module.exports.authenticateLogin = passport.authenticate('google', {
  failureRedirect: '/'
});

/*
serializeUser and deserializeUser are two required Passport methods that are
called when using sessions with Passport.

http://toon.io/understanding-passportjs-authentication-flow/
*/

// Determines what user data should be stored in the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Determines what user data should be retrieved from the session
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy.OAuth2Strategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
  // Create a user if it is a new user, otherwise just get the user from the DB
  User
    .findOrCreate({
      where: {
        googleUserId: profile.id
      },
      defaults: {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      }
    })
    // Spread is used for functions that return multiple success values
    // e.g. findOrCreate returns a user and a boolean wasCreated
    .spread(function(user, created) {
      console.log('User data returned from User.findOrCreate: ', user.get({
        plain: true
      }));
      console.log('New User Created? (t/f): ', created);
      // Below is an example of what comes back to spread from findOrCreate
      // (see above console.logs), assumes that user didn't exist already
      /*{
         firstName: 'Lack',
         lastName: 'Zester',
         id: 411911551212,
       }
       created: true*/
    });
  return done(null, profile);
}));

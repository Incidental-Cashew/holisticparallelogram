var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var User = require(__dirname + '/../users/userModel');

if (process.env.NODE_ENV === 'dev') {
  var facebookKeys = require(__dirname + '/../config/facebook'),
      clientID = facebookKeys.clientID,
      clientSecret = facebookKeys.clientSecret;
} else {
  var clientID = process.env.FB_CLIENT_ID,
      clientSecret = process.env.FB_CLIENT_SECRET;
}

// Middleware for checking whether the user is logged in
module.exports.checkAuth = function (req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    next();
  } else {
    req.session.error = 'Bad credentials.';
    res.redirect('/');
  }
};

module.exports.handleLogin = passport.authenticate('facebook', {
  authType: 'rerequest',
  scope: ['public_profile', 'email'] 
});

module.exports.authenticateLogin = passport.authenticate('facebook', {
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

passport.use(new FacebookStrategy.Strategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'link', 'email', 'first_name', 'last_name', 'picture'],
}, 
  function(accessToken, refreshToken, profile, done) {
  // Create a user if it is a new user, otherwise just get the user from the DB
    User
    //TODO combine Google and Facebook by email?
      .findOrCreate({
        where: {
          facebookUserId: profile.id
        },
        defaults: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        }
      })
      // Spread is used for functions that return multiple success values
      // e.g. findOrCreate returns a user if found and a boolean wasCreated if created
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


var path = require('path');
var authGoogle = require(__dirname + '/../auth/authGoogle');
var authFacebook = require(__dirname + '/../auth/authFB');
var placeController = require(__dirname + '/../places/placeController');
var userController = require(__dirname + '/../users/userController');
var renderIndex = require(__dirname + '/indexHandler');


module.exports = function(app, express) {
  app.use(express.static(__dirname + '/../../client'));

  app.get('*', function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect('https://scenicsamurai.herokuapp.com' + req.url);
    } else {
      next(); /* Continue to other routes if we're not redirecting */
    }
  });

  app.get('/home/*', renderIndex);

  app.get('/api/places', placeController.searchGoogle);

  app.post('/api/places/saved', authGoogle.checkAuth, placeController.saveOne);
  app.get('/api/places/saved', authGoogle.checkAuth, placeController.getAllSaved);
  app.delete('/api/places/saved', authGoogle.checkAuth, placeController.deleteOne);

  app.post('/api/users', userController.saveOne);

  app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../client/login.html'));
  });

  app.get('/auth/google', authGoogle.handleLogin);

  app.get('/auth/google/callback', authGoogle.authenticateLogin,
    function(req, res) {
      res.redirect('/home/');
    }
  );

  app.get('/auth/facebook', authFacebook.handleLogin);

  app.get('/auth/facebook/callback', authFacebook.authenticateLogin,
    function(req, res) {
      res.redirect('/home/');
    }
  );

  app.get('/auth/logout', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/');
    });
  });
};

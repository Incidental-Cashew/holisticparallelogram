var path = require('path');
var auth = require(__dirname + '/../auth/auth');
var placeController = require(__dirname + '/../places/placeController');
var userController = require(__dirname + '/../users/userController');
var renderIndex = require(__dirname + '/indexHandler');

module.exports = function(app, express) {
  app.use(express.static(__dirname + '/../../client'));
  app.get('/', renderIndex);

  app.get('/api/places', placeController.searchGoogle);

  app.post('/api/places/saved', placeController.saveOne);
  app.get('/api/places/saved', auth.checkAuth, placeController.getAllSaved);
  app.get('/api/places/deleted', auth.checkAuth, placeController.deleteOnePlace);

  app.post('/api/users', userController.saveOne);

  app.get('/auth/login', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../client/login.html'));
  });

  app.get('/auth/google', auth.handleGoogleLogin);

  app.get('/auth/google/callback', auth.authenticateGoogleLogin,
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/auth/logout', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/auth/login');
    });
  });
};

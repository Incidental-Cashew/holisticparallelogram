module.exports = function() {
  var db = require(__dirname + '/db.js');
  var Place = require(__dirname + '/../places/placeModel.js');
  var User = require(__dirname + '/../users/userModel.js');

  db.sync(); //Using this instead of syncing place and user separately creates the joint table UserPlace in the database.
  Place.belongsToMany(User, {through: 'UserPlace'});
  User.belongsToMany(Place, {through: 'UserPlace'});

};

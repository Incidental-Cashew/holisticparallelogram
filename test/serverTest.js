var expect = require('chai').expect;
var Sequelize = require('sequelize');
var password = require('../server/config/mysqlsetup.js');
var User = require('../server/users/userModel.js');



describe('Our first test', function() {
  beforeEach(function(done) {
    var db = new Sequelize('scenic', 'root', password, {
      define: {
        timestamps: false // true by default
      }
    });
    done();
  });

  it('Should save a user to the database', function(done) {

    var testUser = {
      id: '12345',
      googleUserId: '12345',
      facebookUserId: '12345',
      firstName: 'test',
      lastName: 'test'
    }

    User.findOrCreate({where: testUser}).then(function(createdUser) {
      expect(createdUser).to.be.an.Object;
      expect(createdUser[0].dataValues.id).to.equal('12345');

      done();
    })
  });


});


var Sequelize = require('sequelize');

if (process.env.NODE_ENV === 'dev') {
  var password = require('../config/mysqlsetup.js'),
      db = new Sequelize('scenic', 'root', password, {
        define: {
          timestamps: false // true by default
        }
      });
} else {
  var password = process.env.CLEARDB_DATABASE_PASSWORD,
      username = process.env.CLEARDB_DATABASE_USERNAME,
      name = process.env.CLEARDB_DATABASE_NAME,
      host = process.env.CLEARDB_DATABASE_HOST,
      db = new Sequelize(name, username, password, {
        host: host,
        define: {
          timestamps: false // true by default
        }
      });
}

module.exports = db;

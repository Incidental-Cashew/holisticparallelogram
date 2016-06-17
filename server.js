var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var urlParser = require('url');
var morgan = require('morgan');
var session = require('express-session');

var app = express();
require(__dirname + '/server/db/index.js')();

const port = process.env.PORT || 5000;

var router = require(__dirname + '/server/router/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('viewFinder'));
app.use(session());
app.use(morgan('dev'));

// http://passportjs.org/docs/google
app.use(passport.initialize());

// This must be declared after the Express session is declared
app.use(passport.session());

router(app, express);

app.listen(port, function(err) {
  if (err) {
    return console.log('Listen error: ', err);
  }
  console.log('Holistic Parallelogram Listening on Port ' + port);
});

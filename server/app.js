var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Mongo/Monk Database
var mongo = require('mongodb');
var monk  = require('monk');

// Remote Mongo Database
var db = monk('mongodb://' + process.env.SURVEY_TOOL_DB_LOGIN +
              ':' + process.env.SURVEY_TOOL_DB_PASS + 
              '@ds053794.mlab.com:53794/' + process.env.SURVEY_TOOL_DB_NAME );

var routes = require('./routes/routes'); // /server/routes/routes.js - Routes master
var users = require('./routes/users');   // /server/routes/user.js   - User DB access

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Make our Mongo 'db' accessible to our router (just below...)
app.use(function(req,res,next){
  // Currently, adds to *EVERY* req object
  req.db = db;
  next();
});


// MIDDLEWARE for Express
app.use('/', routes);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("new ERROR - NOT FOUND!!!!")
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

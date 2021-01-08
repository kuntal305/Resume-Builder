"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var app = express();

var passportConfig = require('./passport');

var indexRouter = require('./routes/index');

var handlebars = require('express-handlebars');

var _require = require('uuid'),
    uuidv4 = _require.v4;

var session = require('express-session');

var FileStore = require('session-file-store')(session);

var passport = require('passport');

var flash = require('connect-flash');

passportConfig(passport); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({
  extname: 'hbs',
  defaultLayout: 'layout.hbs'
}));
app.set('view engine', 'hbs');
app.use(session({
  genid: function genid(req) {
    return uuidv4();
  },
  store: new FileStore(),
  secret: 'qwertyuiop123456789',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/', indexRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
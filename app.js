const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const flash = require('express-flash');
const {v4: uuidv4} = require('uuid');

const app = express();
const http = require('http');


const passportConfig = require('./passport');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const handlebars = require('express-handlebars');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({
  extname: 'hbs',
  helpers: require('./public/javascripts/handlebars-helpers'),
  defaultLayout: 'layout.hbs'
}));
app.set('view engine', 'hbs');

app.use(session({
  genid: (req) => {
    return uuidv4();
  },
  // store: new FileStore(),
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 60 * 60 * 24 * 30
  }
}));
app.use(flash());

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/userprofile', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

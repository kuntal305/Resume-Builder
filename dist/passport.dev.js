"use strict";

var db = require('./db');

var userModel = require('./models/user.model');

var bcrypt = require('bcrypt');

var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    console.log('serialized user');
    console.log(user);
    done(null, user);
  });
  passport.deserializeUser(function (id, done) {
    console.log('deserialzied user');
    userModel.findUserById(id, function (err, result) {
      done(null, result[0]);
    });
  });
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    userModel.findUserByEmail(email, function (em_err, result) {
      // console.log(result[0]);
      if (em_err) {
        console.log(em_err);
        return done(em_err);
      } else if (result.length == 0) {
        console.log('invalid email');
        return done(null, false, {
          message: 'Invalid Email'
        });
      } else {
        bcrypt.compare(password, result[0].password, function (pass_err, isMatch) {
          if (pass_err) {
            console.log(pass_err);
            return done(pass_err);
          } else if (!isMatch) {
            console.log('invalid password');
            return done(null, false, {
              message: 'Invalid Password'
            });
          } else {
            console.log('logged in');
            console.log(result[0].id);
            return done(null, result[0]);
          }
        });
      }
    });
  }));
};
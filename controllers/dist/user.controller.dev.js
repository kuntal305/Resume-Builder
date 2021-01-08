"use strict";

var userModel = require('.././models/user.model');

var bcrypt = require('bcrypt');

var saltRounds = 10;
var userController = {
  signup: function signup(req, res) {
    console.log(req.body);
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      var credentials = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hash
      };
      userModel.signup(credentials, function (err, result) {
        var json = JSON.parse(JSON.stringify(result));

        if (json[0][0]['res'] > 0) {
          res.render('index', {
            signedup: true
          });
        } else {
          res.render('index', {
            userExists: true
          });
        }
      });
    });
  },
  login: function login(req, res) {}
};
module.exports = userController;
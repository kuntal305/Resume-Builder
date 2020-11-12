"use strict";

var userModel = require('.././models/user.model');

var bcrypt = require('bcrypt');

var saltRounds = 10;
var userController = {
  signup: function signup(req, res) {
    bcrypt.hash(req.body["signup-pwd"], saltRounds, function (err, hash) {
      var credentials = {
        fname: req.body["fname"],
        lname: req.body["lname"],
        email: req.body["signup-email"],
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
  login: function login(req, res) {
    var email = req.body["login-email"];
    var password = req.body["login-pwd"];
    userModel.searchEmail(email, function (err, result) {
      console.log(email, password);

      if (err) {
        throw err;
      } else if (result[0]['res'] > 0) {
        userModel.searchPassword(email, function (searchErr, searchResult) {
          if (searchErr) {
            throw err;
          } else {
            var searchedPwd = searchResult[0].password;
            bcrypt.compare(password, searchedPwd, function (err, isMatch) {
              if (err) {
                throw err;
              } else if (!isMatch) {
                res.render('index', {
                  incorrectPassword: true
                });
              } else {
                res.render('userProfile', {
                  email: email,
                  password: password
                });
              }
            });
          }
        });
      } else {
        // res.render('index', {userNotExists: true});
        res.send('error');
      }
    }); // userModel.login(credentials, (err, result) => {
    //     var json = JSON.parse(JSON.stringify(result));
    //     if (json[0][0]['res'] > 0) {
    //         res.render('userProfile', {email: credentials.email, password: credentials.password});
    //     } else {
    //         res.render('index', {userNotExists: true});
    //     }
    // });
  }
};
module.exports = userController;
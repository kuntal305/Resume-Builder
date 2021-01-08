"use strict";

var express = require('express');

var router = express.Router();

var userController = require('.././controllers/user.controller');

var mainController = require('../controllers/main.controller');

var passport = require('passport');
/* GET home page. */


router.get('/', mainController.getHomePage);
router.get('/login', mainController.redirectToHome);
router.get('/signup', mainController.redirectToHome);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/userProfile',
  failureRedirect: '/',
  failureFlash: true
}));
router.post('/signup', userController.signup);
router.get('/userprofile', function (req, res) {
  res.render('userProfile', {
    email: req.isAuthenticated()
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

module.exports = router;
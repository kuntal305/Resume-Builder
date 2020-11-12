"use strict";

var express = require('express');

var router = express.Router();

var userController = require('.././controllers/user.controller');

var mainController = require('../controllers/main.controller');
/* GET home page. */


router.get('/', mainController.getHomePage);
router.get('/login', mainController.redirectToHome);
router.get('/signup', mainController.redirectToHome);
router.post('/login', userController.login);
router.post('/signup', userController.signup);
module.exports = router;
"use strict";

var mainController = {
  getHomePage: function getHomePage(req, res) {
    res.render('index', {
      title: 'Resume Builder'
    });
  },
  redirectToHome: function redirectToHome(req, res) {
    res.redirect('/');
  }
};
module.exports = mainController;
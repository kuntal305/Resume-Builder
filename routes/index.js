var express = require('express');
var router = express.Router();
var userController = require('.././controllers/user.controller');
var mainController = require('../controllers/main.controller');
var passport = require('passport');


/* GET home page. */
router.get('/', isNotLoggedIn, mainController.getHomePage);
// router.get('/', (req, res) => {
//     res.render('userprofile', {firstname: 'Kuntal', lastname: 'Mitra'})
// })



// router.post('/savebasic', (req, res) => {
//     console.log(req.body);
//     res.send(req.body.name);
// })

router.get('/login', isNotLoggedIn, mainController.redirectToHome);

router.get('/signup', isNotLoggedIn, mainController.redirectToHome);

router.post('/login', passport.authenticate('login', {
    successRedirect: '/userprofile',
    failureRedirect: '/'
}));

router.post('/signup', userController.signup);

// router.get('/userprofile', isLoggedIn, (req, res) => {
//     var x = req;
//     console.log(req);
//     res.render('userProfile', {firstname: req.user.first_name, lastname: req.user.last_name})
// });

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/userprofile');
}

module.exports = router;

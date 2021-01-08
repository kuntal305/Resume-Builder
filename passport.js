const db = require('./db');
const userModel = require('./models/user.model');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    
    passport.serializeUser(function (user, done) {
        console.log('serialized user')
        done(null, user.id);
    });

    
    passport.deserializeUser(function (id, done) {
        console.log('deserialzied user');
        userModel.findUserById(id, (err, result) => {
                done(null, result[0])
            }
        )
    });

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
            userModel.findUserByEmail(email, (em_err, result) => {
                // console.log(result[0]);
                if (em_err) {
                    console.log(em_err);
                    return done(em_err);
                } else if(result.length == 0) {
                    console.log('invalid email')
                    return done(null, false, req.flash('warningMessage', 'USER DOESN\'T EXIST.'));
                } else {
                    bcrypt.compare(password, result[0].password, (pass_err, isMatch) => {
                        if (pass_err) {
                            console.log(pass_err);
                            return done(pass_err);
                        } else if(!isMatch) {
                            console.log('invalid password')
                            return done(null, false, req.flash('warningMessage', 'INCORRECT PASSWORD'));
                        } else {
                            console.log('logged in')
                            return done(null, result[0]);
                        }
                    })
                }
            })
        }
    ));

}

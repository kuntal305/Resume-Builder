"use strict";

var db = require('../db');

var model = {
  signup: function signup(input, cb) {
    return db.query('CALL user_signup(?, ?, ?, ?)', [input.fname, input.lname, input.email, input.password], cb);
  },
  login: function login(input, cb) {
    return db.query('CALL user_login(? ,?)', [input.email, input.password], cb);
  },
  searchEmail: function searchEmail(email, cb) {
    return db.query('SELECT EXISTS (SELECT * FROM user u WHERE u.email = ?) as res', [email], cb);
  },
  searchPassword: function searchPassword(email, cb) {
    return db.query('SELECT password FROM user WHERE email = ?', [email], cb);
  }
};
module.exports = model;
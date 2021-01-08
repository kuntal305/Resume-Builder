"use strict";

var db = require('../db');

var model = {
  signup: function signup(input, cb) {
    return db.query('CALL user_signup(?, ?, ?, ?)', [input.fname, input.lname, input.email, input.password], cb);
  },
  login: function login(input, cb) {
    return db.query('CALL user_login(? ,?)', [input.email, input.password], cb);
  },
  findUserByEmail: function findUserByEmail(email, cb) {
    return db.query('SELECT id, first_name, last_name, email, password FROM user WHERE email = ?', [email], cb);
  },
  findUserById: function findUserById(id, cb) {
    return db.query('SELECT id, first_name, last_name, email, password FROM user WHERE id = ?', [id], cb);
  }
};
module.exports = model;
var db = require('../db');


const model = {
    signup: (input, cb) => {
        return db.query('CALL user_signup(?, ?, ?, ?)', [input.fname, input.lname, input.email, input.password], cb);
    },
    login: (input, cb) => {
        return db.query('CALL user_login(? ,?)', [input.email, input.password],cb);
    },
    searchEmail: (email, cb) => {
        return db.query('SELECT EXISTS (SELECT * FROM user u WHERE u.email = ?) as res', [email], cb);
    },
    searchPassword: (email, cb) => {
        return db.query('SELECT password FROM user WHERE email = ?', [email], cb);
    }
}



module.exports = model;
const passport = require('passport');
var db = require('../db');


const model = {
    signup: (input, cb) => {
        return db.query('CALL user_signup(?, ?, ?, ?)', [input.fname, input.lname, input.email, input.password], cb);
    },
    login: (input, cb) => {
        return db.query('CALL user_login(? ,?)', [input.email, input.password],cb);
    },
    findUserByEmail: (email, cb) => {
        return db.query('SELECT id, first_name, last_name, email, password FROM user WHERE email = ?', [email], cb);
    },
    findUserById: (id, cb) => {
        return db.query('SELECT id, first_name, last_name, email, password FROM user WHERE id = ?', [id], cb);
    },

    saveBasic: (input, cb) => {
        console.log('uid: ' + input.uid);
        return db.query('CALL save_basic_info(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [input.uid, input.first_name, input.last_name, input.email, input.contact, input.marital_status, input.address, input.sex, input.linkedin, input.dob, input.nationality, input.passport, input.pan, input.cv_photo], cb);
    },

    checkBasic: (id, cb) => {
        return db.query('CALL check_basic(?)', [id], cb);
    },

    saveEducation: (input, cb) => {
        return db.query('CALL save_education(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [input.uid, input.degree, input.institute, input.marks, input.startyear, input.endyear, input.authority, input.sem1, input.sem2, input.sem3, input.sem4, input.sem5, input.sem6, input.sem7, input.sem8], cb);
    },

    getEducationDetails: (id, cb) => {
        return db.query('CALL get_education(?)', [id], cb);
    },

    updateEducation: (input, cb) => {
        return db.query('CALL update_education(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [input.uid, input.id, input.degree, input.institute, input.marks, input.startyear, input.endyear, input.authority, input.sem1, input.sem2, input.sem3, input.sem4, input.sem5, input.sem6, input.sem7, input.sem8], cb);
    },

    saveProject: (input, cb) => {
        return db.query('CALL save_project(?, ?, ?, ?, ?, ?)', [input.uid, input.projectName, input.projectOrg, input.projectStartDate, input.projectEndDate, input.projectDesc], cb);
    },

    saveMisc: (input, cb) => {
        return db.query('CALL save_misc(?, ?, ?, ?, ?, ?)', [input.uid, input.skills, input.traits, input.language, input.hobbies, input.objective], cb);
    },

    saveWork: (input, cb) => {
        return db.query('CALL save_work(?, ?, ?, ?, ?, ?)', [input.uid, input.orgName, input.type, input.workStartYear, input.workEndYear, input.resp], cb);
    },

    saveEndNote: (input, cb) => {
        return db.query('CALL save_end_note(?, ?, ?)', [input.uid, input.place, input.sign], cb);
    },

    getCvdetails: (id, cb) => {
        return db.query('CALL fetch_cv_data(?)', [id], cb);
    }
}



module.exports = model;
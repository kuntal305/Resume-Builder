const userModel = require('.././models/user.model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userController = {
    
    signup (req, res) {
        console.log(req.body);
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            var credentials = {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: hash
            }
            userModel.signup(credentials, (err, result) => {   
                var json = JSON.parse(JSON.stringify(result));

                if (json[0][0]['res'] > 0) {
                    req.flash('successMessage', 'Sucessfully Created Account!! Please Login to Continue.')
                    res.redirect('/');
                } else {
                    req.flash('warningMessage', 'USER ALREADY EXISTS!!')
                    res.redirect('/');
                }
            });
        });
    },
    
    login (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        userModel.findUserByEmail(email, (em_err, result) => {
            if(em_err) {
                throw em_err;
            } else if(result.length == 0) {
                console.log('Invalid Email');
                res.redirect('/');
            } else {
                bcrypt.compare(password, result[0].password, (pass_err, isMatch) => {
                    if (pass_err) {
                        throw pass_err;
                    } else if(!isMatch) {
                        console.log('invalid password')
                        res.redirect('/')
                    } else {
                        req.session.user = result[0].id;
                        console.log('loggedIn');
                        req.session.loggedIn = true;
                        res.redirect('/userProfile');
                    }
                })
            }
        })
    },

    saveBasicInfo (req, res) {

        var basicInfo = {
            "uid": req.body.uid,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "contact": req.body.contact,
            "address": req.body.address,
            "marital_status": req.body.marital_status,
            "nationality": req.body.nationality,
            "sex": req.body.sex,
            "dob": req.body.dob,
            "passport": req.body.passport,
            "pan": req.body.pan,
            "linkedin": req.body.linkedin,
            "cv_photo": req.body.cv_photo
        };

        console.log('basic: '+basicInfo.uid);

        userModel.saveBasic(basicInfo, (err, result) => {
            var json = JSON.parse(JSON.stringify(result));
            
            if (err) throw err;
            
            console.log(result);

            if (json[0][0].res == 1) {
                res.send();
            } else {
                res.sendStatus(404);
            }
        });
    },

    userInfo (req, res) {
        res.send(req.user);
    },

    checkBasicInfo (req, res) {
        userModel.checkBasic(req.params.id, (err, result) => {
            var json = JSON.parse(JSON.stringify(result));
            if (err) throw err;
            
            if (json[0][0].result == 1) {
                res.send({saved: 1});
            } else {
                res.send({saved: 0});
            }
        })
    },

    saveEducation (req, res) {
        userModel.saveEducation(req.body, (err, result) => {
            var json = JSON.parse(JSON.stringify(result));

            if (err) throw err;

            if (json[0][0].res == 1) {
                res.send({id: json[0][0].id});
            } else {
                res.sendStatus(404);
            }
        });
    },

    getEducation (req, res) {
        userModel.getEducationDetails(req.params.id, (err, result) => {
            if (err) throw err;
            if(result[0][0].res == 1) {
                res.send(result[1])
            }
        })
    },

    updateEducation (req, res) {
        userModel.updateEducation(req.body, (err, result) => {
            console.log(result);
            if (err) throw err;
            var json = JSON.parse(JSON.stringify(result));
            if (json[0][0].res == 1) {
                res.send();
            } else {
                res.sendStatus(404);
            }
        })
    },

    saveProject (req, res) {
        userModel.saveProject(req.body, (err, result) => {
            if (err) throw err;
            var json = JSON.parse(JSON.stringify(result));
            if (json[0][0].res == 1) {
                res.send({id: json[0][0].id});
            } else {
                res.sendStatus(404);
            }
        })
    },

    saveMisc (req, res) {
        userModel.saveMisc(req.body, (err, result) => {
            if (err) throw err;
            var json = JSON.parse(JSON.stringify(result));
            if (json[0][0].res == 1) {
                res.send({id: json[0][0].id});
            } else {
                res.sendStatus(404);
            }
        })
    },

    saveWork (req, res) {
        userModel.saveWork(req.body, (err, result) => {
            if (err) throw err;
            var json = JSON.parse(JSON.stringify(result));
            if (json[0][0].res == 1) {
                res.send({id: json[0][0].id});
            } else {
                res.sendStatus(404);
            }
        })
    },

    saveEndNote (req, res) {
        userModel.saveEndNote(req.body, (err, result) => {
            if (err) throw err;
            var json = JSON.parse(JSON.stringify(result));
            if (json[0][0].res == 1) {
                res.send();
            } else {
                res.sendStatus(404);
            }
        })
    },

    getCvdetails (req, res) {
        userModel.getCvdetails(req.params.id, (err, result) => {
            if (err) throw err;
            res.send({basic: result[0][0], education: result[1], project: result[2], work: result[3]});
        })
    }
}

module.exports = userController;
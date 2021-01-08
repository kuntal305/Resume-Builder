
const mainController = {
    getHomePage: (req, res) => {
        // console.log(req.flash('incorrectEmail'));
        res.render('index', {
            title: "Resume Builder",
            successMessage: req.flash('successMessage'),
            warningMessage: req.flash('warningMessage')
        });
    },
    redirectToHome: (req, res) => {
        res.redirect('/');
    }
}

module.exports = mainController;

const mainController = {
    getHomePage: (req, res) => {
        res.render('index', {title: 'Resume Builder'});
    },
    redirectToHome: (req, res) => {
        res.redirect('/');
    }
}

module.exports = mainController;
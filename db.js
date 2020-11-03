var mysql = require('mysql');

const connection = mysql.createConnection({
    host: "208.91.198.197",
    port: 3306,
    user: "techdh_CV",
    password: "%67dHqw2",
    database: "techdh_CV"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("mysql connected");
})

module.exports = connection;
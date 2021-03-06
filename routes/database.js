var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var result;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'mydb'
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

let sql = 'SELECT * FROM content';

con.query(sql, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results);
    result = results;
});

router.get("/", function(req, res, next) {
    res.send(result);
});



module.exports = router;
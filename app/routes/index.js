var express = require('express');
var mysql = require('mysql');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Or Shalmayev', description: 'Coralogix home programming task' });
});

// store events
router.post('/store-events', function(req, res, next) {
  var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })

  connection.query('INSERT INTO sessions (data, ended_at)', log, function (error, results, fields) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO sessions (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
});//END router.post

// test for connection with db
router.get('/test-db', function(req, res, next) {
  var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })

  // connect to db
  connection.connect();
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) {
      console.log('db error')
      throw error
    };
    console.log('The solution is: ', results[0].solution);
  });
   
  connection.end();
});
module.exports = router;

var express = require('express');
var mysql = require('mysql');

var router = express.Router();

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

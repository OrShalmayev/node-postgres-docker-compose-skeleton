var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'coralogix',
  port: process.env.DB_PORT || 3306
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Or Shalmayev', description: 'Coralogix home programming task' });
});

router.get('/session-list', function(req, res, next) {
  let data = null;

  connection.query('SELECT id, created_at, ended_at from sessions', function (error, results, fields) {
    if (error) {
      console.log('db error')
      throw error
    };
    console.log('The sessions:: ', results);
    data = results
    res.render('session_list', { 
      title: 'Or Shalmayev', 
      description: 'Coralogix home programming task',
      data
    });//END res.render('session_list',
  });//END connection.query
  console.log('data', data);

});//END router.get('/session-list'

router.get('/show-session/:id', function(req, res, next) {

  connection.query('SELECT id, created_at, started_at, ended_at, (started_at - ended_at) AS duration  from sessions', function (error, results, fields) {
    if (error) {
      console.log('db error')
      throw error
    };
    console.log('The sessions:: ', results);
    data = results
    res.render('session_list', { 
      title: 'Or Shalmayev', 
      description: 'Coralogix home programming task',
      data,
    });//END res.render('session_list',
  });//END connection.query
  console.log('data', data);

});//END router.get('/session-list'

// store events
router.post('/store-events', function(req, res, next) {
  console.log('/store-events',req.body);
  var sql = `INSERT INTO sessions (data, width, height, started_at, ended_at) VALUES (
    '${req.body.data}', 
    '${req.body.width}',
    '${req.body.height}',
    '${req.body.started_at}',
    '${req.body.ended_at}'
    )`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});//END /store-events

// test for connection with db
router.get('/test-db', function(req, res, next) {

  // connect to db
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) {
      console.log('db error')
      throw error
    };
    console.log('The solution is: ', results[0].solution);
  });
   
});//END /test-db

module.exports = router;

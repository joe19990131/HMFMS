var express = require('express');
var mysql  = require ('mysql');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();

//sql setting
var conn = mysql.createConnection({
  host : 'localhost',
  prot : '3306',
  user: 'root',
  password : '123456',
  database : 'hmfmsdatabase'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/locationSelecter', function(req, res, next) {
  res.render('locationSelecter');
});
router.get('/newEquitment', function(req, res, next) {
  res.render('newEquitment');
});
router.get('/newLocation', function(req, res, next) {
  res.render('newLocation');
});

router.post('/searchByLoc',function(req,res,next){
  var LocID = req.body['LocID'];
  var Bid = req.body['BID'];
  var LocFloor = req.body['LocFloor'];
  var LocName = req.body['LocName'];
  console.log(req);

});



//path正確，但會404
router.post('/reqList',function(req,res,next){
  //sql query need check!!
var sql = ""
conn.query(sql,function(err,rows){
  res.json(rows);
})
console.log("HERE");
});



 
router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff)/i, function(req, res) {
  res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
      if (err) res.send(404);
  });
});


module.exports = router;


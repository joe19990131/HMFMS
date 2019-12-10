var express = require('express');
var mysql  = require ('mysql');
var router = express.Router();

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
//form send file test
router.post('/index/searchByEq',function(req, res, next) {
  console.log("HERE!!!");
  //console.log(req.route);
  var oid = req.body.OID;
  var ot = req.body.OT;
  var ts = req.body.TS;
  var cs = req.body.CS;
  var exp = req.body.EXP;
  //conn.connect();
  console.log(oid+" "+ot+" "+ts+" "+cs+" "+exp);
  //res.send(oid+" "+ot+" "+ts+" "+cs+" "+exp);
});
router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff)/i, function(req, res) {
  res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
      if (err) res.send(404);
  });
});


module.exports = router;

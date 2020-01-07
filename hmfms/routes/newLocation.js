var express = require('express');
var mysql  = require ('mysql');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
var connStatus = 0;
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
router.get('/objReq', function(req, res, next) {
  res.render('objReq');
});
router.post('/insert',function(req,res){
  console.log("here is insert");
  var ln = req.body['LocName'];
  var bid = req.body['BID'];
  var lf = req.body['LocFloor'];
  var sql = "insert into location_info (LocName, BID, LocFloor)"+
            "value('"+ln+"', '"+bid+"', '"+lf+"')";
  //console.log(ot+'  '+ts+'  '+md+'  '+ed);
  if(connStatus == 0){
    conn.connect(function(err){
      if(err) throw err;
      console.log('connect success!');
      connStatus ++;
      console.log(connStatus);
      });
  };
  conn.query(sql,function(err,rows){
    if(err){
      console.log(err);
    }else{
      res.send(true);
    }
  })
});
router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff|map)/i, function(req, res) {
  res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
      if (err) res.send(404);
  });
});


module.exports = router;

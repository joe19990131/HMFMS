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

router.post('/searchByLoc',function(req,res,next){
 
  var LocID = req.body['LocID'];
  var Bid = req.body['BID'];
  var LocFloor = req.body['LocFloor'];
  var isDC = req.body['isDC'];
  var sql = "select LocID,LocName,building_info.Bname as BName,LocFloor,"+
            "if(isDC = 0,'正常','廢棄') as isDC "+
            "from location_info join building_info using(BID) "+
            "where "+
            "(locid = '"+LocID+"' or '' = '"+LocID+"') "+
            "and (bid = '"+Bid+"' or '' = '"+Bid+"') "+
            "and (locfloor ='"+LocFloor+"' or '' = '"+LocFloor+"') "+
            "and (isDC = '"+isDC+"' or '' = '"+isDC+"')"
  //console.log(req);
  console.log("i am SBL");

  if(connStatus == 0){
    conn.connect(function(err){
      if(err) throw err;
      console.log('connect success!');
      connStatus ++;
      console.log(connStatus);
      });
  }
  conn.query(sql,function(err,rows){
    console.log(rows);
    if(err){
      console.log(err);
    }else{
      res.json(rows);
      //res.end();
    }
  })
});


router.post('/DeleteLoc',function(req,res,next){
  console.log("here is deleteLoc");
  if(connStatus == 0){
    conn.connect(function(err){
      if(err) throw err;
      console.log('connect success!');
      connStatus ++;
      console.log(connStatus);
      });
  }
  var locID = req['LocID'];
  var sql = "update location_info "+
  "set isdc = 1"+
  " where locID = '"+locID+"'";
  conn.query(sql,function(err,rows){
    console.log(rows);
    if(err){
      console.log(err);
    }else{
      res.json(rows);
      //res.end();
    }
  })
});

router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff)/i, function(req, res) {
  res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
      if (err) res.send(404);
  });
});


module.exports = router;


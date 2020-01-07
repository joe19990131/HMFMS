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
  res.location('/');
  res.render('index');
});
router.get('/locationSelecter', function(req, res, next) {
  //res.redirect(301,'../locationSelecter');
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
//form send file test
var connStatus = 0;
router.post('/searchByEq',function(req, res, next) {
  var oid = req.body['OID'];
  var ot = req.body['ObjectType'];
  var ts = req.body['TypeSpec'];
  var cs = req.body['checkStituation'];
  var isNE = req.body['isNE'];
  var nDate = req.body['nDate']
  console.log("HERE IS SBE");
  console.log(req.body.OID);
  console.log(isNE);
  console.log(req.body);
  //conn.connect();
  console.log(oid+" "+ot+" "+ts+" "+cs+" ");

var sql1 = "select"+
" oid as OID,"+
"objtype as ObjectType,"+
"TypeSpec,"+
"checkstituation as checkStituation,"+
"DATE_FORMAT(CheckDate, '%Y / %m / %d') as CheckDate,"+
"DATE_FORMAT(ManufatureDate, '%Y / %m / %d') as ManufatureDate,"+
"DATE_FORMAT(EXPdate, '%Y / %m / %d') as EXPdate,"+
"location_info.LocName as Location,"+
"(select location_info.LocName "+
    "from obj_info join location_info "+
    "on obj_info.MigrateLocID = location_info.LocID "+
    "where (oid = '"+oid+"' or '' = '"+oid+"')"+
    "and (objType = '"+ot+"' or '' = '"+ot+"')"+
    "and (typeSpec = '"+ts+"' or '' = '"+ts+"')"+
    "and (checkstituation = '"+cs+"' or '' = '"+cs+"')"+
    ") "+
    "as MigrateLoc "+
"from obj_info join location_info "+
"using(LocID) "+
"where (oid = '"+oid+"' or '' = '"+oid+"') "+
  "and (objType = '"+ot+"' or '' = '"+ot+"')"+
  "and (typeSpec = '"+ts+"' or '' = '"+ts+"')"+
  "and (checkstituation = '"+cs+"' or '' = '"+cs+"')"+
"order by OID;";



var sql2 = "select"+
" oid as OID,"+
"objtype as ObjectType,"+
"TypeSpec,"+
"checkstituation as checkStituation,"+
"DATE_FORMAT(CheckDate, '%Y / %m / %d') as CheckDate,"+
"DATE_FORMAT(ManufatureDate, '%Y / %m / %d') as ManufatureDate,"+
"DATE_FORMAT(EXPdate, '%Y / %m / %d') as EXPdate,"+
"location_info.LocName as Location,"+
"(select location_info.LocName "+
    "from obj_info join location_info "+
    "on obj_info.MigrateLocID = location_info.LocID "+
    "where (oid = '"+oid+"' or '' = '"+oid+"')"+
    "and (objType = '"+ot+"' or '' = '"+ot+"')"+
    "and (typeSpec = '"+ts+"' or '' = '"+ts+"')"+
    "and (checkstituation = '"+cs+"' or '' = '"+cs+"')"+
    ") "+
    "as MigrateLoc "+
"from obj_info join location_info "+
"using(LocID) "+
"where (oid = '"+oid+"' or '' = '"+oid+"') "+
  "and (objType = '"+ot+"' or '' = '"+ot+"')"+
  "and (typeSpec = '"+ts+"' or '' = '"+ts+"')"+
  "and (checkstituation = '"+cs+"' or '' = '"+cs+"') "+
  "and (datediff(EXPDATE,'"+nDate+"')<30)"+
"order by OID;";


console.log(connStatus);
if(connStatus == 0){
  conn.connect(function(err){
    if(err) throw err;
    console.log('connect success!');
    connStatus ++;
    console.log(connStatus);
    });
}

if(isNE == 0){
  conn.query(sql1,function(err,rows){
    console.log(rows);
    if(err){
      console.log(err);
    }else{
      res.json(rows);
      //res.end();
    }
  }
  );
}else{
  conn.query(sql2,function(err,rows){
    console.log(rows);
    if(err){
      console.log(err);
    }else{
      res.json(rows);
      //res.end();
    }
  }
  );
  }

  console.log(connStatus);
  /*if(connStatus == 1){
  conn.end(function(err){
    if(err) throw err;
    console.log('connect end');
    });
    connStatus = 0;
}*/
  
//res.json({OID:1,ObjectType:"乾粉",TtpeSpec:"5",checkStituation:"正常",CheckDate:"2019/01/22",ManufatureDate:"2010/01/22",EXPdate:"2020/01/22",Location:"703-1",MigrateLoc:""});
});

router.post('/DeleteObj',function(req,res){
  var oid = req.body['OID'];
  //console.log(oid);
var sql = "update obj_info "+
"set checkStituation = '已報廢'"+
" where oid = '"+oid+"'";

console.log(connStatus);
  if(connStatus == 0){
    conn.connect(function(err){
      if(err) throw err;
      console.log('connect success!');
      connStatus ++;
      console.log(connStatus);
      });
  }
  conn.query(sql,function(err,rows){

    console.log(connStatus);
    if(err){
      console.log(err);
    }else{
      res.send(true);
      //res.end();
    }
  }
  
  );
  



});











router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff|map)/i, function(req, res) {
  res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
      if (err) res.send(404);
  });
});


module.exports = router;

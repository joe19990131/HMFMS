var express = require('express');
var mysql  = require ('mysql');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
 app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

app.use(session({ 
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false
  }));
  
//sql setting
var conn = mysql.createConnection({
    host : 'localhost',
    prot : '3306',
    user: 'root',
    password : '123456',
    database : 'hmfmsdatabase'
  });
  
  
  
  /* GET login page. */
  router.get('/', function(req, res, next) {
    res.render('login');
  });
  router.get('/index', function(req, res, next) {
    res.render('index');
  });
// login function
  router.post('/login', function(req, res) {
    var Uname = req.body.username;
    var password = req.body.password;
    var sql = 'select uid,passward from member_m where (uid = "'+ Uname +'" and passward = "'+password+'")';
    if(Uname && password){
        conn.query(sql,[Uname,password],function(error,result,fields){
            if(result.length >0){
                res.redirect('/index');
            }else{
                res.send("帳號或密碼錯誤")
            }
        });

    }else{
        res.send("請輸入帳號及密碼")
    }
    
    
    
    console.log(Uname+' '+password);
    


  });


  router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff)/i, function(req, res) {
    res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
        if (err) res.send(404);
    });
  });
  module.exports = router;
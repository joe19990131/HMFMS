var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

//setting part "webpage file readin from server"
router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff)/i, function(req, res) {
    res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
        if (err) res.send(404);
    });
  });

//body-parser bulit-up
app.use(bodyParser).json({limit: '1mb'});
app.use(bodyParser.urlencoded({
    extended: true
}));

//sql connection
var conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'hmfmsdatabase'
});

//get login, index page
router.get('/', function(req, res, next){
    res.render('login');
});
router.get('/', function(req, res, next){
    res.render('index');
});

//passport setting area
var passport = require('passport');
var Strtegy = require('passport').Strategy;
router.post('/login', function(req, res) {
    var Uname = req.body.username;
    var password = req.body.password;
    var sql = 'select uid, password from member_m where (uid = "'+ Uname +'" and password = "'+ password +'")';

    passport.use(new Strtegy(
        //verify callback func.
        function(Uname, password){
            if(Uname && password){
                conn.query(sql,[Uname, password],function(error, result,fields){
                    if(result.lenght >0){
                        res.redirect('/index');
                    }else{
                        res.send("帳號或密碼錯誤");
                    }
                })
            }else{
                res.send("請輸入帳號密碼");
            }
            console.log(Uname+' '+password);
        }
    ));
});

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: 'Science_local',
    resave: false,
    saveUninitialized: false
}));


module.exports = router;
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();

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


//passport setting area
var passport = require('passport');
var Strtegy = require('passport').Strategy;

var Uname = req.body.username;
var password = req.body.password;
var sql = 'select uid, password from member_m where (uid = "'+ Uname +'" and password = "'+ password +'")';

passport.use(new Strtegy(
    //verify callback func.
    function(Uname, password, done){
        //if null
        if(err){return done(err);}
        
        //if user not exist
        if(!user){
            return done(null, false,)
        }
    }
));


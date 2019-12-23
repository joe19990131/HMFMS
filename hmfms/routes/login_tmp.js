var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var conn = require('/lib/db').connectFunc;
var bodyParser = require
var app = express();

//body-parser bulit-up
app.use(bodyParser)


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


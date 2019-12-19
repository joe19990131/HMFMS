var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done){
        //If no data input
        if(err) {return done(err);}
        //If user not exist
        if(!user) {return done(null, false);}
        //If password wrong
        if(!user.verifyPassword(password)) {return done(null, false);}
        //login success, then return user data
        return done(null, user);
    }
))
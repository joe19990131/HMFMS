var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var conn  = require ('./lib/db');

var indexRouter = require('./routes/index');
var locationSelecterRouter = require('./routes/locationSelecter');
var newEquitment = require('./routes/newEquitment');
var newLocation = require('./routes/newLocation');
var objReq = require("./routes/objReq");

var app = express();

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/kendo')));
app.use(express.static(path.join(__dirname, '/public/stylesheets')));

app.use('/', indexRouter);
app.use('/locationSelecter', locationSelecterRouter);
app.use('/newEquitment',newEquitment);
app.use('/newLocation',newLocation);
app.use('/objReq',objReq);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000,function(){
    console.log('http://127.0.0.1:3000/');
  }
)
module.exports = app;

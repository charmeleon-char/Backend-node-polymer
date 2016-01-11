var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var employes = require('./routes/employes');
var app = express();
mongoose.connect('mongodb://user:ZXCASDQWE123@ds057204.mongolab.com:57204/monguito');
// view engine setup
var us = mongoose.model('Employes',{ name: String,email:String,employID:String,userID:String});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.get('/users',function(req,res){
  var test = new us({name:'segunda ves',email:'laureate.net'});
  test.save(function(err){
    if(err) return handleError(err);
     });
  });

app.get('/api/view',function(req,res){
  mongoose.model('Employes').find(function(err,Employes) {
    console.log(Employes);
      res.header("Access-Control-Allow-Origin","*");
    res.send(Employes);
  });
  console.log(req.body);
});
app.post('/api/employes',function(req,res,next){
  if(req !="")
  {
  var Document = new us({name:req.body.name,email:req.body.email,employID:req.body.employID,userID:req.body.userID});
  Document.save(function(err,res){

     });
     }
         res.header("Access-Control-Allow-Origin","*");
  res.send(200);
});

//app.post('/api/employes',routes.employes.insert);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(callback){});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});





// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

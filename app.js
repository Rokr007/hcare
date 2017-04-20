var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/config');
var mongoose = require('mongoose');
const mailer = require('express-mailer');

var index = require('./routes/index');
var users = require('./routes/users');
var ambulances = require('./routes/ambulances');
var hospitals = require('./routes/hospitals');
var blooddonors = require('./routes/blooddonors');
var bloodrequests = require('./routes/bloodrequests');
var cities = require('./routes/cities');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mailer.extend(app, {
  from: 'smart_health_care',
  host: 'smtp.gmail.com',  //host name
  secureConnection: true,  // use SSL
  port: 465, //port for secure SMTP
  transportMethod: 'SMTP', //default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: config.mailer.user, //gmail id
    pass: config.mailer.access //gmail password
  }
});

// test route to trigger emails

app.get('/api/mails', function(req,res) {

  var fromname = req.query.fromname;
  var fromemail = req.query.fromemail;
  var msg = req.query.msg
  var subname = req.query.subject;
  var toname = req.query.toname;
  var toemail = req.query.toemail;
  
  // Setup email data.

  var mailOptions = {
    to: toemail,
    subject: subname,
    user: { // data to view template, you can access - as user.name
      name: fromname,
      email: fromemail,
      message: msg,
      receiver: toname 
    }
  }

  // Send email

  app.mailer.send('email', mailOptions, function (err, message) {
    if(err) {
      console.log(err);
      res.status(501);
      res.send('There was an error sending the email');
      return;
    }
    return res.send('Email has been sent!');
  });
});


var mongoDB = config.mongodb.uri;
mongoose.connect(mongoDB);

mongoose.connection.on('connected', function() {
	console.log('Mongoose connection successful');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api/ambulances', ambulances);
app.use('/api/hospitals', hospitals);
app.use('/api/blooddonors', blooddonors);
app.use('/api/bloodrequests', bloodrequests);
app.use('/api/cities', cities);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(3000, function () {
console.log("express has started on port 3000");
});


module.exports = app;

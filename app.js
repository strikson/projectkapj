var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const jwt=require('jsonwebtoken');
const tokenKey = "jlkhdflskfhdlskjfhldsf";

var locationsRouter = require('./routes/locations');
var messagesRouter = require('./routes/messages');
var usersHelper = require('./Helpers/UsersHelper');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, tokenKey, function (err, payload) {

      if (payload) {

        usersHelper.getUserById(payload.userId, (user) => {
          if (user != null) {
            req.user = user;
          }
          next();
        });

      } else {
        next()
      }
    });

  } catch (e) {
    next()
  }

});


app.post('/login', function (req, res) {

  usersHelper.validationUser(req.body.username, req.body.password, (user) => {

    if (user !== null) {

      const token = jwt.sign({userId: user.id}, tokenKey);
      res.status(200).send({
        userId: user.id,
        username: user.username,
        token
      });

    } else {
      res.status(401).json({message: 'Invalid Password/Username'});
    }

  });

});

app.use((req, res, next) => {

  if (req.user != null) {
    next();
  } else {
    res.status(403).send("unauthorized");
  }

});


app.use('/locations', locationsRouter);
app.use('/messages', messagesRouter);

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

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var SpotifyStrategy = require('./node_modules/passport-spotify/lib/passport-spotify/index').Strategy;
var index = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret:"hello hi",
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);

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

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var strat = new SpotifyStrategy({
    clientID: process.env.spotify_client_id,
    clientSecret: process.env.spotify_client_secret,
    callbackURL: "http://localhost:3000/auth/spotify/callback"
  },
  // accessToken is accessible inside this function, but I can't get it out to the index.js routers
  function(accessToken, refreshToken, profile, done) {
  	process.nextTick(function() {
  		return done(null,profile);
  	})
  }
);
passport.use(strat);

module.exports = app;
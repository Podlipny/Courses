//vetsina vygenerovana pomoci express-generator
var express = require('express');
var path = require('path'); //tvorba cest
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session'); //kvuli passport-session

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //google strategy

//podne NPM web postupu nastavime
//clientId a clientSecret je z google console developer portalu console.developers.google.com
passport.use(new GoogleStrategy({
        clientID: '822246465440-rbv8o8b5t465fupp0voesgfipapmdio1.apps.googleusercontent.com',
        clientSecret: '2dXAnFE6ZxBPjxhI1MdSRfeF',
        callbackURL: 'http://localhost:3000/auth/google/callback'},
        function(req, accessToken, refreshToken, profile, done){
            done(null, profile);
        }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'anything'})); //nastavime express-session - secret je cokoliv co chceme

//inicializujeme passport
app.use(passport.initialize()); 
app.use(passport.session()); //potrebujeme express-session

//passport pouzije pro umisteni user objektu do session
passport.serializeUser(function(user, done){
    done(null, user) //ukladame usera do session - pokud bude user.id, ulozime jen jeho id do session (server session)
});

//pull user back out of session
passport.deserializeUser(function(user, done){
    //pokud by byla db, tak udelame
    //user.findById(userId);
    done(null, user);
});


app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(session({
    secret: 'aa',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

require("./project/app");

var port = process.env.PORT || 3000;

app.listen(port);
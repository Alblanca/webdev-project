var q = require('q');
var mongoose = require ('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/overhub_db'; // for local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds149613.mlab.com:49613/heroku_x654gt9k'; // user yours
}

var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;

module.exports = db;
var q = require('q');

var mongoose = require('mongoose');
mongoose.assign_conn = mongoose.createConnection('mongodb://localhost/webdev_summer');
mongoose.proj_conn = mongoose.createConnection('mongodb://localhost/overhub_db');

mongoose.Promise = q.Promise;

module.exports = mongoose;

// var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer'; // for local
// if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
//     var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
//     var password = process.env.MLAB_PASSWORD_WEBDEV;
//     connectionString = 'mongodb://' + username + ':' + password;
//     connectionString += '@ds151222.mlab.com:51222/heroku_vzr604t5'; // user yours
// }
// // Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// // above with your own URL given to you by mLab
//
// var mongoose = require("mongoose");
// var db = mongoose.connect(connectionString);
// mongoose.Promise = q.Promise;
//
// module.exports = db;
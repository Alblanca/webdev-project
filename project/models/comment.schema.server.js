/**
 * Created by ani on 8/08/17.
 */

var mongoose = require('mongoose');
var commentSchema = mongoose
    .Schema(
        {   _user : {type : mongoose.Schema.Types.ObjectId, ref : "UserModel"},
            _post : {type : mongoose.Schema.Types.ObjectId, ref : "PostModel"},
            content : String,
            votes : Number,
            dateCreated : {type : Date, default : Date.now()}
        }, {collection : "comment"});

module.exports = commentSchema;


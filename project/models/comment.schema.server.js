/**
 * Created by ani on 8/08/17.
 */

var mongoose = require('mongoose');
var commentSchema = mongoose
    .Schema(
        {   _user : {type : mongoose.Schema.Types.ObjectId, ref : "userModel"},
            _post : {type : mongoose.Schema.Types.ObjectId, ref : "postModel"},
            _parentComment : {type : mongoose.Schema.Types.ObjectId, ref : "commentModel"}, // not sure if this will be used
            _childComments : [{type : mongoose.Schema.Types.ObjectId, ref : "commentModel"}],
            content : String,
            votes : Number,
            dateCreated : {type : Date, default : Date.now()}
        }, {collection : "comment"});

module.exports = commentSchema;


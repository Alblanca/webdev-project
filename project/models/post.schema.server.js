/**
 * Created by ani on 8/08/17.
 */

var mongoose = require('mongoose');
var postSchema = mongoose
    .Schema(
        {   _user : {type : mongoose.Schema.Types.ObjectId, ref : "userModel"},
            _board : {type : mongoose.Schema.Types.ObjectId, ref : "boardModel"},
            title : String,
            content : String,
            votes : Number,
            comments :    [{type : mongoose.Schema.Types.ObjectId, ref : "commentModel"}],
            dateCreated : {type : Date, default : Date.now()},
            tags : Array,
            isEndorsed : {type : Boolean, default : false}
        }, {collection : "post"});

module.exports = postSchema;
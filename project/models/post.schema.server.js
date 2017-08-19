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
            comments :    [{type : mongoose.Schema.Types.ObjectId, ref : "commentModel"}],
            dateCreated : {type : Date, default : new Date().toJSON().slice(0,10)},
            tags : Array,
            isEndorsed : {type : Boolean, default : false},
            votes : [{
                user: {type: mongoose.Schema.Types.ObjectId, ref : "userModel"},
                isUpvote: {type: Boolean}
            }]
        }, {collection : "post"});

module.exports = postSchema;
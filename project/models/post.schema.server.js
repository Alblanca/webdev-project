/**
 * Created by ani on 8/08/17.
 */

var mongoose = require('mongoose');
var postSchema = mongoose
    .Schema(
        {   _user : {type : mongoose.Schema.Types.ObjectId, ref : "UserModel"},
            _board : {type : mongoose.Schema.Types.ObjectId, ref : "BoardModel"},
            title : String,
            content : String,
            comments :    [{type : mongoose.Schema.Types.ObjectId, ref : "CommentModel"}],
            dateCreated : {type : Date, default : new Date().toJSON().slice(0,10)},
            tags : Array,
            isEndorsed : {type : Boolean, default : false},
            votes : [{
                voter: {type: mongoose.Schema.Types.ObjectId, ref : "UserModel"},
                isUpvote: {type: Boolean}
            }]
        }, {collection : "post"});


// Virtual property "score"

postSchema.virtual('score').get(function () {
     var num = 0;
     for(i = 0; i < this.votes.length; i++) {
         if(this.votes[i].isUpvote) {
             num++;
         } else {
             num--;
         }
     }
     return num;
});

module.exports = postSchema;

/**
 * Created by ani on 8/21/17.
 */
var mongoose = require('mongoose');

var overwatchSchema = mongoose
    .Schema(
        {   _user : {type : mongoose.Schema.Types.ObjectId, ref : "UserModel"},
            statsJSON : JSON,
            heroesJSON : JSON,
            SR : Number,
            rank : String,
            mostPlayed : String
        });
/**
 * Created by ani on 8/08/17.
 */
var mongoose = require('mongoose');
var boardSchema = mongoose
    .Schema(
        {
            name : String,
            description : String,
            posts : [{type : mongoose.Schema.Types.ObjectId, ref : "postModel"}],
            bannerUrl : String,
            bannerIconUrl: String
        }, {collection : "board"});

module.exports = boardSchema;
var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
    {   username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        nickname: String,
        // websites: [{type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}],   //1. arrays of references
        isAdmin: {type: Boolean, default: false},
        savedPosts : [{type: mongoose.Schema.Types.ObjectId, ref:"postModel"}],
        posts : [{type: mongoose.Schema.Types.ObjectId, ref:"postModel"}],
        google: {
            id:    String,
            token: String
        },
        blizzard: {
            id: String,
            token: String,
            provider: String
        }
    }, {collection: "user"});

module.exports = userSchema;
var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
    {   username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        nickname: String,
        introduction: String,
        isAdmin: {type: Boolean, default: false},
        savedPosts : [{type: mongoose.Schema.Types.ObjectId, ref:"PostModel"}],
        posts : [{type: mongoose.Schema.Types.ObjectId, ref:"PostModel"}],
        google: {
            id:    String,
            token: String
        },
        blizzard: {
            id: String,
            token: String,
            provider: String,
            battletag: String
        }
    }, {collection: "user"});

module.exports = userSchema;
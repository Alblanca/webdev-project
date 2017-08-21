var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
    {   username: String,
        password: String,
        role: {type: String, enum:['ADMIN', 'USER', 'COACH'], default: 'USER'},
        firstName: String,
        lastName: String,
        email: String,
        nickname: String,
        introduction: String,
        savedPosts : [{type: mongoose.Schema.Types.ObjectId, ref:"PostModel"}],
        posts : [{type: mongoose.Schema.Types.ObjectId, ref:"PostModel"}],
        created: {type:Date, default:Date.now},
        google: {
            id:    String,
            token: String
        },
        blizzard: {
            id: String,
            token: String,
            provider: String,
            battletag: String
        },
        isEndorsed: {type: Boolean, default: false}
    }, {collection: "user"});

module.exports = userSchema;
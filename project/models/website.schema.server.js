var mongoose = require("mongoose");
var websiteSchema = mongoose.Schema({
    name: String,
    description: String,
    developer: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    pages: [{type: mongoose.Schema.Types.ObjectId, ref:"PageModel"}],   //1. arrays of references
    created: {type: Date, default: Date.now}
}, {collection: "website"});


module.exports = websiteSchema;


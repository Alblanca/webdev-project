var mongoose = require("mongoose");
var pageSchema = mongoose.Schema({
    website: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
    name: String,
    description: String,
    created: {type: Date, default: Date.now}
    // widgets: [{type: mongoose.Schema.Types.ObjectId, ref:"PageModel"}]
}, {collection: "page"});


module.exports = pageSchema;


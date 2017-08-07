var mongoose = require("mongoose");
var websiteSchema = mongoose.Schema({
    name: String,
    description: String,
    developer: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    created: {type: Date, default: Date.now}
}, {collection: "website"});

websiteModel.createWebsite = createWebsite;

module.exports = websiteModel;

function createWebsite(developerId, website) {
    website.developer = developerId;
    return websiteModel.create(website);
}
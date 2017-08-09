var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("websiteModel", websiteSchema);
var userModel = require("./user.model.server", userSchema);
var userSchema = require("./user.schema.server")

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesForUser = findWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;

module.exports = websiteModel;
// create website, update, remove ...

function updateWebsite(websiteId, website) {
    return websiteModel
        .update(
             {_id: websiteId}, {$set: website}
        );
}

function deleteWebsite(developerId, websiteId) {
    return websiteModel
        .remove({_id : websiteId})
        .then(function (status) {
           return userModel.removeWebsite(developerId, websiteId);
        });
}

function findWebsitesForUser(developerId) {
    return websiteModel.find({developer: developerId});
}

function createWebsite(developerId, website) {
    website.developer = developerId; //website is pointing to user, but user does not know this

    var websiteTmp = null;
    // if parent knows existence of child
    return websiteModel
        .create(website)
        .then(function (websiteDoc) {
            websiteTmp = websiteDoc;
            userModel.addWebsite(websiteDoc);
        })
        .then(function (userDoc) {
            return websiteTmp;
        })

}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}
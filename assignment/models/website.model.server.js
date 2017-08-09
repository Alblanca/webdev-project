var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userSchema = require("./user.schema.server");
var userModel = require("./user.model.server", userSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesForUser = findWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

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
            userModel.addWebsite(developerId, websiteDoc._id);
        })
        .then(function (userDoc) {
            return websiteTmp;
        });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function addPage(websiteId, pageId) {
    console.log(websiteId);
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save(); //goes and write this to database
        });
}

function removePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

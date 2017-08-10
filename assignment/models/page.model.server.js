var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var db = require("./database");
var websiteModel = require("./website.model.server");

var pageModel = mongoose.model("PageModel", pageSchema);

pageModel.findPagesForWebsite = findPagesForWebsite;
pageModel.createPage = createPage;
pageModel.deletePage = deletePage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.addWidget = addWidget;
module.exports = pageModel;

function updatePage(pageId, page) {
    return pageModel
        .update(
            {_id: pageId}, {$set: page}
        );
}

function findPagesForWebsite(websiteId) {
    return pageModel.find({website: websiteId});
}

function createPage(websiteId, page) {
    page.website = websiteId;

    var pageTmp = null;

    return pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTmp = pageDoc;
            websiteModel.addPage(websiteId, pageDoc._id);
        })
        .then(function (websiteDoc) {
            return pageTmp;
        });
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id : pageId})
        .then(function (status) {
            return websiteModel.removePage(websiteId, pageId);
        });
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

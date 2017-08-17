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
pageModel.removeWidget = removeWidget;
pageModel.updateWidgetPosition = updateWidgetPosition;
pageModel.findWidgetsForPage = findWidgetsForPage;
module.exports = pageModel;

function findWidgetsForPage(pageId) {
    return pageModel
        .find({_id: pageId})
        .populate('widgets')
        .exec();
}

function updateWidgetPosition(pageId, startIndex, endIndex) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            var tempWidget = page.widgets[startIndex];
            widgets[startIndex] = widgets[endIndex];
            widgets[endIndex] = tempWidget;
            page.widgets = widgets;
            page.widgets.splice(0, 0);

            return page.save();
        });
}

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

function removeWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

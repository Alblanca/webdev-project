var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("./database");
var pageModel = require("./page.model.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

module.exports = widgetModel;

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsForPage = findWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function createWidget(widget, pageId) {
    widget.page = pageId;

    return widgetModel
        .create(widget)
        .then(function (widgetDoc) {
            widgetTmp = widgetDoc;
            pageModel.addWidget(pageId, widgetDoc._id);
        })
        .then(function (pageDoc) {
            return widgetTmp;
        });
}

function findWidgetsForPage(pageId) {
    return widgetModel.find({page: pageId});
}


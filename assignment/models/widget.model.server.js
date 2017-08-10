var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("./database");
var pageModel = require("./page.model.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

module.exports = widgetModel;

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;


function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id : widgetId})
        .then(function (status) {
            return pageModel.removeWidget(pageId, widgetId);
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update(
        {_id : widgetId}, {$set: widget}
    );
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



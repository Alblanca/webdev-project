var mongoose = require("mongoose");
var commentSchema = require("./comment.schema.server");
var db = require("./database");
var postModel = require("./post.model.server");
var commentModel = mongoose.model("CommentModel", commentSchema);

module.exports = commentModel;

commentModel.addComment = addComment;

// widgetModel.createWidget = createWidget;
// widgetModel.findWidgetById = findWidgetById;
// widgetModel.updateWidget = updateWidget;
// widgetModel.deleteWidget = deleteWidget;


function addComment(comment) {
    return commentModel
        .create(comment)
        .then(function (comment) {
        commentTmp = comment;
    })
        .then(function (comment) {
            return commentTmp;
        });

}

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



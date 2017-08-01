/**
 * Created by berti on 8/1/2017.
 */
var app = require("../express");

app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findWidgetsForPage);
app.post("/api/user/:userId/website/:websiteId/page/:pageId/widget", createWidget);
app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);

var widgets = [
    { "_id": "123","name": "lorem","widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234","name": "lorem", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345","name": "lorem", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456","name": "lorem", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567","name": "lorem", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678","name": "lorem", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789","name": "lorem", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function updateWidget(req, res) {
    var widget = req.body;

    for(var w in widgets) {
        if(widgets[w]._id === widget._id) {
            delete widgets[w];
            widgets[w] = widget;

            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
    return;
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            delete widgets[w];

            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(400);
    return;
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            res.send(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
    return;
}

function createWidget(req, res) {
    var widget = req.body;
    var pid = req.params.pageId;

    widget.pageId = pid;
    widget._id = (new Date()).getTime() + "";

    widgets.push(widget);

    res.json(widget);
    return;
}

function findWidgetsForPage(req, res) {
    var pid = req.params.pageId;

    var _widgets = [];
    for(var w in widgets) {
        if(widgets[w].pageId === pid) {
            _widgets.push(widgets[w]);
        }
    }
    res.json(_widgets);
    return;
}
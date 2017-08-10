/**
 * Created by berti on 8/1/2017.
 */
var app = require("../express");
var widgetModel = require("./models/widget.model.server");

app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findWidgetsForPage);
app.post("/api/user/:userId/website/:websiteId/page/:pageId/widget", createWidget);
app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/", updateWidgetPosition);

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

function updateWidgetPosition(req, res) {
    var startIndex = req.query.startIndex;
    var endIndex = req.query.endIndex;
    var pageId = req.params.pageId;

    var tempWidget = widgets[startIndex];
    widgets[startIndex] = widgets[endIndex];
    widgets[endIndex] = tempWidget;

    res.sendStatus(200);
    return;
}

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

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
            return;
        }, function (err) {
            res.sendStatus(404).send(err.message);
            return;
        });
}

function createWidget(req, res) {
    var widget = req.body;
    var pid = req.params.pageId;

    widgetModel
        .createWidget(widget, pid)
        .then(function (widget) {
            res.json(widget);
            return;
        }, function (err) {
            res.send(err.message);
            return;
        });
}

function findWidgetsForPage(req, res) {
    var pid = req.params.pageId;

    widgetModel
        .findWidgetsForPage(pid)
        .then(function (widgets) {
            res.json(widgets);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function getWidgetById(id) {
    for(var w in widgets) {
        if(widgets[w]._id === id) {
            return widgets[w];
        }
    }
    return null;
}

var multer = require('multer');
// var upload = multer({ dest: 'public/assignment/uploads/'});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assignment/uploads/')
    },
    filename: function (req, file, cb) {
        var givenName = req.body.filename;
        var fileName = file.originalname;
        cb(null, fileName);
    }
});

var upload = multer({ storage: storage });
app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;
    var givenName = req.body.filename;
    var widgetText = req.body.widgetText;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = givenName? givenName: myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    //update everything
    widget = getWidgetById(widgetId);
    widget.url = 'uploads/'+originalname;
    widget.width = width;
    widget.text = widgetText;
    widget.name = givenName;

    var callbackUrl   = "../assignment/#!/user/"+userId+"/website/"+websiteId + "/page/" + pageId + "/widget/" + widgetId;

    res.redirect(callbackUrl);

}


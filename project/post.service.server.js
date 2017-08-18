/**
 * Created by berti on 8/1/2017.
 */
var app = require("../express");
var postModel = require("./models/post.model.server");

app.get("/api/user/:userId/website/:websiteId/page", findPagesForWebpage);
app.post("/api/user/:userId/website/:websiteId/page", createPage);
app.get("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.put("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;

    pageModel
        .deletePage(websiteId, pageId)
        .then(function (status) {
            res.sendStatus(200);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });

}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;

    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
            return;
        }, function (err) {
            res.send(err);
            return;
        });
}

function findPagesForWebpage(req, res) {
    var wid = req.params.websiteId;

    pageModel
        .findPagesForWebsite(wid)
        .then(function (pages) {
            res.json(pages);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}
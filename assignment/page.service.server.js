/**
 * Created by berti on 8/1/2017.
 */
var app = require("../express");

app.get("/api/user/:userId/website/:websiteId/page", findPagesForWebpage);
app.post("/api/user/:userId/website/:websiteId/page", createPage);
app.get("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.put("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

function deletePage(req, res) {
    var pageId = req.params.pageId;

    for (var p in pages) {
        if(pages[p]._id === pageId) {
            delete pages[p];

            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
    return;
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    for (var p in pages) {
        if(pages[p]._id === pageId) {
            pages[p].name = page.name;
            pages[p].description = page.description;

            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
    return;
}

function findPageById(req, res) {
    var pageId = req.params.pageId;

    for (var p in pages) {
        if(pages[p]._id === pageId) {
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
    return;
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;

    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);

    res.json(page);
    return;
}

function findPagesForWebpage(req, res) {
    var wid = req.params.websiteId;
    var _pages = [];

    for (var p in pages) {
        if(pages[p].websiteId === wid) {
            _pages.push(pages[p]);
        }
    }
    res.json(_pages);
    return;
}
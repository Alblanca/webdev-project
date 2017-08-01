/**
 * Created by berti on 7/31/2017.
 */
var app = require("../express");

app.get("/api/user/:userId/website", findWebsitesForUser);
app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website/:websiteId", findWebsiteById);
app.put("/api/user/:userId/website/:websiteId", updateWebsite);
app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    for(var w in websites) {
        if (websites[w]._id === websiteId) {
            delete websites[w];
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
    return;
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params.websiteId;

    for(var w in websites) {
        if (websites[w]._id === websiteId) {
            websites[w].name = website.name;
            websites[w].description = website.description;

            res.json(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
    return;
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;

    for(var w in websites) {
        if (websites[w]._id === websiteId) {
            res.json(websites[w]);
            return;
        }
    }

    res.sendStatus(404);
    return;
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    website.developerId = userId;
    website._id = (new Date()).getTime() + "";

    websites.push(website);
    res.json(website);
    return;
}

function findWebsitesForUser(req, res) {
    var userId = req.params.userId;
    var sites = [];

    for (var w in websites) {
        if(websites[w].developerId === userId) {
            sites.push(websites[w]);
        }
    }
    res.json(sites);
    return;
}


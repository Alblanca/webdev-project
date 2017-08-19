/**
 * Created by berti on 7/31/2017.
 */
var app = require("../express");
var boardModel = require("./models/board.model.server.js" );

// var websiteModel = mongoose.model("")

// app.get("/api/user/:userId/website", findWebsitesForUser);
// app.post("/api/user/:userId/website", createWebsite);
// app.get("/api/user/:userId/website/:websiteId", findWebsiteById);
// app.put("/api/user/:userId/website/:websiteId", updateWebsite);
// app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

app.get("/api/boards", findAllBoards);
app.post("/api/boards", createBoard);

function findAllBoards(req, res) {
    boardModel
        .findAllBoards()
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function createBoard(req, res) {
    var board = req.body;
    boardModel
        .createBoard(board)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var developerId = req.params.userId;

    websiteModel
        .deleteWebsite(developerId, websiteId)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params.websiteId;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;

    websiteModel
        .createWebsite(userId, website)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function findWebsitesForUser(req, res) {
    var userId = req.params.userId;

    websiteModel
        .findWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
            return;
        });
}


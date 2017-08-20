/**
 * Created by berti on 7/31/2017.
 */
var app = require("../express");
var boardModel = require("./models/board.model.server.js" );

// var websiteModel = mongoose.model("")

// app.get("/api/user/:userId/website", findWebsitesForUser);
// app.post("/api/user/:userId/website", createWebsite);
// app.get("/api/user/:userId/website/:websiteId", findWebsiteById);

app.get("/api/populatedBoards", findPopulatedBoards);
app.get("/api/boards", findAllBoards);
app.post("/api/boards", createBoard);
app.get("/api/boards/:boardId", findBoardById);
app.put("/api/boards/:boardId", updateBoard);
app.delete("/api/boards/:boardId", deleteBoard);

function findPopulatedBoards(req, res) {
    boardModel
        .findPopulatedBoards()
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

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

function findBoardById(req, res) {
    var boardId = req.params.boardId;
    boardModel
        .findBoardById(boardId)
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

function deleteBoard(req, res) {
    var boardId = req.params.boardId;

    boardModel
        .deleteBoard(boardId)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function updateBoard(req, res) {
    var board = req.body;

    boardModel
        .updateBoard(board)
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


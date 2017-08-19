/**
 * Created by berti on 8/1/2017.
 */
var app = require("../express");
var postModel = require("./models/post.model.server");

// app.get("/api/user/:userId/website/:websiteId/page", findPagesForWebpage);
// app.post("/api/user/:userId/website/:websiteId/page", createPage);
// app.get("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
// app.put("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);
// app.delete("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);

app.get("/api/boards/:boardId/posts", findPostsByBoardId);
app.post("/api/boards/:boardId/new", createPost);
app.get("/api/post/:postId", findPostById);
app.post("/api/post/:postId", addComment);
app.get("/api/post/:postId/usr", findPopulatedUserByPostId);

function findPopulatedUserByPostId(req, res) {
    var postId = req.params.postId;
    postModel
        .findPopulatedUserByPostId(postId)
        .then(function (result) {
            console.log('owo');
            console.log(result._user);
            res.json(result);
            return;
        });
}

function findPostsByBoardId(req, res) {
    var boardId = req.params.boardId;
    postModel
        .findPostsByBoardId(boardId)
        .then(function (posts) {
            res.json(posts);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function createPost(req, res) {
    var post = req.body;

    postModel
        .createPost(post)
        .then(function (post) {
            res.json(post);
            return;
        }, function (err) {
            res.send(err);
            return;
        });
}

function findPostById(req, res) {
    var postId = req.params.postId;

    postModel
        .findPostById(postId)
        .then(function (post) {
            res.json(post);
            return;
        }, function (err) {
            res.send(err);
            return;
        });
}

function addComment(req, res) {
    var comment = req.body.comment;
    var user = req.body.user;
    var postId = req.params.postId;
    console.log(comment);
    postModel
        .addComment(comment, user, postId)
        .then(function (post) {
            res.json(post);
            return;
        }, function (err) {
            res.send(err);
            return;
        });
}









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
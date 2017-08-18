var mongoose = require("mongoose");
var boardSchema = require("./board.schema.server");
var boardModel = mongoose.model("BoardModel", boardSchema);
// var userSchema = require("./user.schema.server");
// var userModel = require("./user.model.server", userSchema);

// websiteModel.createWebsite = createWebsite;
// websiteModel.findWebsitesForUser = findWebsitesForUser;
// websiteModel.findWebsiteById = findWebsiteById;
// websiteModel.deleteWebsite = deleteWebsite;
// websiteModel.updateWebsite = updateWebsite;
// websiteModel.addPage = addPage;
// websiteModel.removePage = removePage;

boardModel.findAllBoards = findAllBoards;
boardModel.createBoard = createBoard;
boardModel.addPost = addPost;
boardModel.findBoardById = findBoardById;

module.exports = boardModel;
// create website, update, remove ...

function findAllBoards() {
    return boardModel.find();
}

function createBoard(board){
    return boardModel
        .create(board)
        .then(function (result) {
            return result;
        });
}

function addPost(boardId, postId) {
    return boardModel
        .findBoardById(boardId)
        .then(function (board) {
            board.posts.push(postId);
            return board.save(); //goes and write this to database
        });
}

function findBoardById(boardId) {
    return boardModel.findById(boardId);
}





function updateWebsite(websiteId, website) {
    return websiteModel
        .update(
             {_id: websiteId}, {$set: website}
        );
}

function deleteWebsite(developerId, websiteId) {
    return websiteModel
        .remove({_id : websiteId})
        .then(function (status) {
           return userModel.removeWebsite(developerId, websiteId);
        });
}

function findWebsitesForUser(developerId) {
    return websiteModel.find({developer: developerId});
}

function createWebsite(developerId, website) {
    website.developer = developerId; //website is pointing to user, but user does not know this

    var websiteTmp = null;
    // if parent knows existence of child
    return websiteModel
        .create(website)
        .then(function (websiteDoc) {
            websiteTmp = websiteDoc;
            userModel.addWebsite(developerId, websiteDoc._id);
        })
        .then(function (userDoc) {
            return websiteTmp;
        });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save(); //goes and write this to database
        });
}

function removePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

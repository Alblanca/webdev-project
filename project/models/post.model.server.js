var mongoose = require("mongoose");
var postSchema = require("./post.schema.server");
var db = require("./database");
var boardModel = require("./board.model.server");
var userModel = require("./user.model.server");
var commentModel = require("./comment.model.server");

var postModel = mongoose.model("PostModel", postSchema);
//
// pageModel.findPagesForWebsite = findPagesForWebsite;
// pageModel.createPage = createPage;
// pageModel.deletePage = deletePage;
// pageModel.findPageById = findPageById;
// pageModel.updatePage = updatePage;
// pageModel.addWidget = addWidget;
// pageModel.removeWidget = removeWidget;
// pageModel.updateWidgetPosition = updateWidgetPosition;
// pageModel.findWidgetsForPage = findWidgetsForPage;

postModel.findPostsByBoardId = findPostsByBoardId;
postModel.createPost = createPost;
postModel.findPostById = findPostById;
postModel.addComment = addComment;
postModel.findPopulatedUserByPostId = findPopulatedUserByPostId;

module.exports = postModel;

function findPopulatedUserByPostId(postId) {
    return postModel
        .findById(postId)
        .populate('_user')
        .exec(function (err, res) {
            return res;
        });

    // return postModel.findById(postId).populate('_user').exec();
}

function findPostsByBoardId(boardId) {
    console.log("sdafkljasdklfjaskdljf",postModel.find({_board : boardId}));
    return postModel
        .find({_board : boardId})
        .populate('_user')
        .populate('posts')
        .exec(function (err, res) {
            console.log(res);
            return res;
        });
}

function createPost(post) {
    var boardId = post._board;
    var userId = post._user;
    return postModel
        .create(post)
        .then(function (postDoc) {
            postTmp = postDoc;
            boardModel.addPost(boardId, postDoc._id);
            userModel.addPost(userId, postDoc._id);
        })
        .then(function (postDoc) {
            return postTmp;
        });
}


function findPostById(postId) {
    return postModel
        .findById(postId)
        .populate('comments')
        .exec(function (err, res) {
            return res;
        });
}

function addComment(comment, user, postId) {
    return commentModel
        .addComment(comment, user, postId)
        .then(function (comment) {
            postModel.findPostById(postId)
                .then(function (post) {
                    post.comments.push(comment);
                    return post.save();
                });
        });
}


function findWidgetsForPage(pageId) {
    return pageModel
        .find({_id: pageId})
        .populate('widgets')
        .exec();
}

function updateWidgetPosition(pageId, startIndex, endIndex) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            var tempWidget = page.widgets[startIndex];
            widgets[startIndex] = widgets[endIndex];
            widgets[endIndex] = tempWidget;
            page.widgets = widgets;
            page.widgets.splice(0, 0);

            return page.save();
        });
}

function updatePage(pageId, page) {
    return pageModel
        .update(
            {_id: pageId}, {$set: page}
        );
}

function findPagesForWebsite(websiteId) {
    return pageModel.find({website: websiteId});
}

function createPage(websiteId, page) {
    page.website = websiteId;

    var pageTmp = null;

    return pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTmp = pageDoc;
            websiteModel.addPage(websiteId, pageDoc._id);
        })
        .then(function (websiteDoc) {
            return pageTmp;
        });
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id : pageId})
        .then(function (status) {
            return websiteModel.removePage(websiteId, pageId);
        });
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function removeWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

var mongoose = require("mongoose");
var postSchema = require("./post.schema.server");
var db = require("./database");
var boardModel = require("./board.model.server");
var userModel = require("./user.model.server");
var commentModel = require("./comment.model.server");

var postModel = mongoose.model("PostModel", postSchema);

var testUser = new userModel({
    username: "random1",
    password: "raondom2"
});

var testUser2 = new userModel({
    username: "random2",
    password: "raondom2"
});

var testUser3 = new userModel({
    username: "random3",
    password: "raondom2"
});

var testObj = [{voter: testUser, isUpvote: true}, {voter: testUser2, isUpvote: true}, {voter: testUser3, isUpvote: false}];

var testPost = new postModel({
      title: "wow",
      content: "yeah",
      votes:[{voter: testUser, isUpvote: true}, {voter: testUser2, isUpvote: true}]
});

//
// pageModel.findPagesForWebsite = findPagesForWebsite;

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
postModel.updatePost = updatePost;
postModel.deletePost = deletePost;
postModel.endorsePost = endorsePost;
postModel.savePost = savePost;
postModel.searchPosts =searchPosts;

postModel.editComment = editComment;
postModel.deleteComment = deleteComment;
postModel.getAllPosts = getAllPosts;

module.exports = postModel;

function getAllPosts() {
    return postModel
        .find()
        .populate("_user")
        .exec(function (err, res) {
            return res;
        });
}

function searchPosts(term) {
    // return postModel
    //     .find({$text: {$search: term}}, {score: {$meta: "textScore"}})
    //     .sort( { score: { $meta: "textScore" }});

    return postModel
        .find({$text: {$search: term}});
}



function savePost(user, postId) {
    return userModel
        .savePost(user, postId);
}

function endorsePost(postId) {
    return postModel
        .findPostById(postId)
        .then(function (post) {
            post.isEndorsed = true;
            return post.save();
        })
}

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
    return postModel
        .find({_board : boardId})
        .populate('_user')
        .populate('posts')
        .exec(function (err, res) {
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
        .populate({
            path : 'comments',
            populate : {path: '_user', model:'UserModel'}})
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

function editComment(comment) {
    return commentModel
        .editComment(comment);
}

function deleteComment(commentId) {
    return commentModel
        .deleteComment(commentId);

    // return postModel.findPostById(postId)
    //             .then(function (post) {
    //                 var index = post.comments.indexOf(commentId);
    //                 post.comments.splice(index, 1);
    //                 post.save();
    //                 return;
    //             });
}

function deletePost(postId) {
    return postModel
        .remove({_id : postId})
        .then(function (status) {
            //return websiteModel.removePage(websiteId, pageId);
            return;
        });
}

function updatePost(postId, post) {
    return postModel
        .update(
            {_id: postId}, {$set: post}
        );
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

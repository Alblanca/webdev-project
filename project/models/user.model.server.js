var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("./database");

var userModel = mongoose.model("UserModel", userSchema);

userModel.removeWebsite = removeWebsite;
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.unregisterUser = unregisterUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByBlizzardId = findUserByBlizzardId;
userModel.findUserByNickname = findUserByNickname;

userModel.addPost = addPost;
userModel.savePost = savePost;

module.exports = userModel;

function addPost(userId, postId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.posts.push(postId);
            console.log(user);
            return user.save(); //goes and write this to database
        });
}

function savePost(postId, userId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.savedPosts.push(postId);
            console.log(user);
            return user.save(); //goes and write this to database
        });
}
    function findUserByNickname(nickname) {
        return userModel
            .findOne({'nickname': nickname});
    }

    function findUserByBlizzardId(bid) {
        return userModel
            .findOne({'blizzard.id': bid});
    }

    function findUserByGoogleId(gid) {
        return userModel
            .findOne({'google.id': gid});
    }

    function unregisterUser(userId) {
        return userModel.remove({_id: userId});
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return userModel
            .update({_id: userId},
                {$set: user});
    }

    function findUserById(userId) {
        var found = userModel.findById(userId);
        return found;
    }

    function createUser(user) {
        return userModel.create(user);
    }

    function addWebsite(developerId, websiteId) {
        return userModel
            .findUserById(developerId)
            .then(function (user) {
                user.websites.push(websiteId);
                return user.save(); //goes and write this to database
            });
    }

    function removeWebsite(developerId, websiteId) {
        return userModel
            .findById(developerId)
            .then(function (user) {
                var index = user.websites.indexOf(websiteId);
                user.websites.splice(index, 1);
                return user.save();
            });
    }


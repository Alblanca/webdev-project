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
userModel.getAllUsers = getAllUsers;

userModel.addPost = addPost;
userModel.savePost = savePost;
userModel.endorseUser = endorseUser;
userModel.favoriteUser = favoriteUser;
userModel.getFavUsers = getFavUsers;

module.exports = userModel;

function getFavUsers(username) {
    return userModel
        .findOne({username: username})
        .populate('favUsers')
        .exec();
}

function favoriteUser(username, toFav) {
    return userModel
        .findUserByUsername(username)
        .then(function (user) {
            user.favUsers.push(toFav);
            return user.save();
        });
}

    function getAllUsers() {
    return userModel.find();
}

function endorseUser(username) {
    return userModel
        .findUserByUsername(username)
        .then(function (user) {
            user.isEndorsed = true;
            return user.save();
        });
}


    function addPost(userId, postId) {
        return userModel
            .findUserById(userId)
            .then(function (user) {
                user.posts.push(postId);
                return user.save(); //goes and write this to database
            });
    }

function savePost(user, postId) {
    return userModel.findUserById(user._id)
        .then(function (user) {
        user.savedPosts.push(postId);
        return user.save();
        });
    // return userModel
    //     .findUserById(userId)
    //     .then(function (user) {
    //         user.savedPosts.push(postId);
    //         console.log(user);
    //         return user.save(); //goes and write this to database
    //     });
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


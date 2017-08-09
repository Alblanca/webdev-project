var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("./database");

var userModel = mongoose.model("UserModel", userSchema);

userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;

module.exports = userModel;

function findUserByUsername(username) {
    return userModel.findOne({username : username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username : username, password : password});
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


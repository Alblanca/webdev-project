/**
 * Created by berti on 7/31/2017.
 */
var app = require("../express");
var userModel = require("./models/user.model.server");

//http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", unregisterUser);

function unregisterUser(req, res) {
    var userId = req.params.userId;

    userModel
        .unregisterUser(userId)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        })
    //
    // for (var u in users) {
    //     if (users[u]._id === userId) {
    //         delete users[u];
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
    // return;
}

function updateUser(req, res) {
    var user = req.body;
    var userId = user._id;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function registerUser(req, res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
            return;
        })

}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            })
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
                return;
            }, function (err) {
                res.sendStatus(500).send(err);
                return;
            })
    }

}

function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, response) {
    var userId = req.params.userId;
    var what;
    return userModel
        .findUserById(userId)
        .then(function (user) {
            response.json(user);
            return;
        });
    response.send("can't find matched user");
    return;
}
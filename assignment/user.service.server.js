/**
 * Created by berti on 7/31/2017.
 */
var app = require("../express");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@wonder.com", isAdmin: true},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "alice@wonder.com"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "alice@wonder.com"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "alice@wonder.com"}
]

//http handlers
app.get("/api/user", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);


function updateUser(req, res) {
    var user = req.body;
    var userId = user._id;
    for (var u in users) {
        if (users[u]._id === userId) {
            users[u] = user;
            res.send(user);
            return;
        }
    }
    res.sendStatus(404);
    return;
}

function registerUser(req, res) {
    var user = req.body;

    user._id = (new Date()).getTime() + "";
    user.email = '';
    users.push(user);

    res.send(user);
    return;
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === username && password === _user.password) {
                res.send(_user);
                return;
            }
        }
        res.send("0");
        return;
    } else if(username) {
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
        return;
    }

}

function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, response) {
    for(var u in users) {
        if(users[u]._id === req.params.userId) {
            response.send(users[u]);
        }
    }
    response.send("can't find matched user");
}
/**
 * Created by berti on 7/24/2017.
 */
var app = require("../express");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@wonder.com", isAdmin: true},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "alice@wonder.com"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "alice@wonder.com"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "alice@wonder.com"}
]

app.get("/api/users", getAllUsers);
app.get("/api/users/:userId", getUserById);

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
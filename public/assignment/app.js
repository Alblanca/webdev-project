/**
 * Created by berti on 7/23/2017.
 */
var app = angular.module("WebAppMaker", ["ngRoute"]);
app.controller("loginController", loginController);

app.config(configuration);

function configuration($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "views/user/login.view.client.html"
        })
        .when("/profile", {
            templateUrl: "views/user/profile.view.client.html"
        })
        .when("/register", {
            templateUrl: "views/user/register.view.client.html"
        })
}

function loginController($scope) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ]

    $scope.login = function (user) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username == user.username && _user.password == user.password) {
                $scope.welcomeUser = _user;
            }
        }
    }
}

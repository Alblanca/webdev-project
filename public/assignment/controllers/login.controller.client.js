/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ]

    function loginController($scope, $location) {
        $scope.login = function (user) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username == user.username && _user.password == user.password) {
                    $scope.welcomeUser = _user;
                    $location.url("profile/" + _user._id);
                }
            }
        }
    }
})();

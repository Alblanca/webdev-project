/**
 * Created by berti on 7/23/2017.
 */
(function () {
        angular
            .module("WebAppMaker")
            .factory("userService", userService);
        
        function userService($http) {

            var users = [
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@wonder.com", isAdmin: true},
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "alice@wonder.com"},
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "alice@wonder.com"},
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "alice@wonder.com"}
            ]

            var api = {
                "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
                "findUserById" : findUserById,
                "findUserByUsername" : findUserByUsername,
                "registerUser" : registerUser,
                "updateUser" : updateUser,
                "unregisterUser" : unregisterUser
            };

            return api;

            function updateUser(user) {
                var url = "/api/user/" + user._id;
                return $http.put(url, user);
            }

            function unregisterUser(user) {
                for (var u in users) {
                    if (users[u]._id === user._id) {
                        delete users[u];
                    }
                }
            }

            function findUserByUsername(username) {
                var url = "/api/user?username=" + username;
                return $http.get(url);
            }

            function registerUser(user) {
                var url = "/api/user";

                return $http.post(url, user);

            }

            function findUserById(userId) {
                return $http.get("/api/user/" + userId);
            }
            
            function findUserByUsernameAndPassword(username, password) {
                var url = "/api/user?username="+username + "&password="+password;

                return $http.get(url);
            }

        }
})();
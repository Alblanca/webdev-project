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
                for (var u in users) {
                    if (users[u]._id === user._id) {
                        users[u].firstName = user.firstName;
                        users[u].lastName = user.lastName;
                        users[u].email = user.email;
                    }
                }
            }

            function unregisterUser(user) {
                for (var u in users) {
                    if (users[u]._id === user._id) {
                        delete users[u];
                    }
                }
            }

            function findUserByUsername(username) {
                for (var u in users) {
                    if (users[u].username === username) {
                        return users[u];
                    }
                }
                return null;
            }

            function registerUser(user) {
                user._id = (new Date()).getTime() + "";
                user.email = '';
                users.push(user);

                return user;
            }

            function findUserById(userId) {
                for (var u in users) {
                    if (users[u]._id === userId) {
                        return angular.copy(users[u]);
                    }
                }
                return null;
            }
            
            function findUserByUsernameAndPassword(username, password) {
                for (var u in users) {
                    var _user = users[u];
                    if (_user.username === username && password === _user.password) {
                        return _user;
                    }
                }
                return null;
            }

        }
})();
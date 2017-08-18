/**
 * Created by berti on 7/23/2017.
 */
(function () {
        angular
            .module("WebAppMaker")
            .factory("userService", userService);
        
        function userService($http) {

            var api = {
                "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
                "findUserById" : findUserById,
                "findUserByUsername" : findUserByUsername,
                "registerUser" : registerUser,
                "updateUser" : updateUser,
                "unregisterUser" : unregisterUser,
                "getCurrentUser" : getCurrentUser
            };

            return api;

            function getCurrentUser() {
                var url="/api/user/current";
                return $http.get(url);
            }

            function updateUser(user) {
                var url = "/api/user/" + user._id;
                return $http.put(url, user);
            }

            function unregisterUser(user) {
                var url = "/api/user/" + user._id;

                return $http.delete(url);
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
                return $http.get("/api/user/" + userId)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function findUserByUsernameAndPassword(username, password) {
                var url = "/api/user?username="+username + "&password="+password;

                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

        }
})();
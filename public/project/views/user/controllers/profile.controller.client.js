/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        //declare functions
        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;

        function init() {
            userService.findUserById(userId)
                .then(function (_user) {
                    model.user = _user;
                });

        }
        init();

        function updateUser(user) {
            userService
                .updateUser(user)
                .then(function () {
                    alert("User updated!");
                });
        }

        function unregisterUser(user) {
            userService
                .unregisterUser(user)
                .then(function () {
                    $location.url("/login");
                });
        }
    }

})();

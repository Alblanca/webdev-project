/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        //declare functions
        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });

        }
        init();

        function updateUser(user) {
            userService.updateUser(user);
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

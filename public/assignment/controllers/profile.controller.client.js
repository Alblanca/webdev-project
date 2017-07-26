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
            var ef = userService.findUserById(userId);
            console.log(ef);
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            userService.updateUser(user);
        }

        function unregisterUser(user) {
            userService.unregisterUser(user);
            $location.url("/login");
        }
    }

})();

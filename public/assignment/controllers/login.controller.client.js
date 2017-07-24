/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope) {
        var model = this;
        model.login = login;

        function init() {

        }
        init();

        function login(user) {
            var user = userService.findUserByUsernameAndPassword(user.username, user.password);
            if (user === null) {
                model.errorMessage = "User not found";
            } else {
                $rootScope.currentUser = user;
                $location.url("profile/" + user._id);
            }
        }
    }
})();

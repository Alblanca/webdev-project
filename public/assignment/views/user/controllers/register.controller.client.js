/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;
        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(user) {
            // Password validation
            if(user.password === user.password2) {
                // Username validation
                var foundUser = userService.findUserByUsername(user.username);
                if (!foundUser) {
                    var _user = userService.registerUser(user);
                    $location.url("profile/" + user._id);
                } else {
                    model.errorMessage = "Username already exists";
                }
            } else {
                model.errorMessage = "Password does not match";
            }
        }
    }
}) ();
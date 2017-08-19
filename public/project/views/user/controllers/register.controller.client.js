/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
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
                userService
                    .findUserByUsername(user.username)
                    .then(function (response) {
                        var foundUser = response.data;
                        if (foundUser === "") {
                            return userService.registerUser(user);
                        } else {
                            model.errorMessage = "Username already exists";
                            return;
                        }
                    })
                    .then(function (res) {
                        var _user = res.data;
                        $location.url("profile/");
                    });
            } else {
                model.errorMessage = "Password does not match";
            }
        }
    }
}) ();
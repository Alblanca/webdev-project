/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("registerController", registerController);

    var workFunction = "bitch";

    function registerController($window, userService, $location, $rootScope) {
        var model = this;
        model.registerUser = registerUser;
        model.onClickBack = onClickBack;
        function init() {

        }
        init();

        function onClickBack() {
            $('.nav a[href="#Login"]').tab('show');
        }

        function registerUser(user) {
            // content validation
            var errorMsg = validateUsernameAndPassword(user);
            if(errorMsg) {
                model.errorMessage = errorMsg;
                shakeAlert();
                return;
            }
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
                            shakeAlert();
                            return;
                        }
                    })
                    .then(function (res) {
                        // $location.url("profile/");
                        if(res) {
                            $window.location.reload();
                        }
                    });
            } else {
                model.errorMessage = "Password does not match";
                shakeAlert()
                return;
            }
        }


        //private functions

        function shakeAlert() {
            $('.modal').effect('shake');
        }

        function validateUsernameAndPassword(user) {
            if(user.username.length < 3) {
                return "Username needs to be at least 3 characters long!";
            } else if(user.password.length < 1 || user.password2.length < 1) {
                return "Please fill in all the information!"
            } else {
                return null;
            }
        }

    }
}) ();
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
                var promise = userService.findUserByUsername(user.username);
                promise
                    .then(function (response) {
                        var foundUser = response.data;
                        if (foundUser === "0") {
                            var _promise = userService.registerUser(user);
                            _promise
                                .then(function (res) {
                                    var _user = res.data;
                                    $location.url("profile/" + _user._id);
                                });
                        } else {
                            model.errorMessage = "Username already exists";
                        }
                    });
            } else {
                model.errorMessage = "Password does not match";
            }
        }
    }
}) ();
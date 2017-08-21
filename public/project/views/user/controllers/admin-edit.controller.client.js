/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("adminEditController", adminEditController);

    function adminEditController($scope, $routeParams, $location, userService, adminUser) {
        var model = this;

        //declare functions
        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;
        model.registerUser = registerUser;


        function init() {

            userService
                .getAllUsers()
                .then(function (response) {
                    model.users = response.data;
                });
        }
        init();

        function updateUser() {
            userService
                .updateUser(model.profileUser)
                .then(function () {
                    alert("User updated!");
                    $location.url("/profile/" + model.profileUser.username);
                });
        }

        function unregisterUser() {
            if (confirm("Are you sure to unregister this user?") == true) {
                userService
                    .unregisterUser(model.profileUser)
                    .then(function () {
                        $location.url("/");
                    });
            } else {

            }
        }

        function registerUser(user) {
            // content validation
            var errorMsg = validateUsernameAndPassword(user);
            //nickname verification
            errorMsg = validateNickname(user);

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
                            $location.url("/admin/edit");
                        }
                    });
            } else {
                model.errorMessage = "Password does not match";
                shakeAlert()
                return;
            }
        }

        //private functions

        function validateNickname(user) {
            var nickname = user.nickname;
            var whiteSpace =  nickname.indexOf(' ');
            if(nickname === "") { // user chose to not input nickname, abort.
                return null;
            }
            userService
                .findUserByNickname(nickname)
                .then(function (response) {
                    if(whiteSpace != -1) {
                        return "Nickname can't contain white spaces!";
                    }
                    var foundNickname = response.data;
                    if(foundNickname === "") {
                        return null;
                    } else {
                        return "Nickname Already exists!";
                    }
                });
        }

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

})();

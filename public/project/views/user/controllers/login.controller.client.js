/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("loginController", loginController);

    function loginController($window, $location, userService, $rootScope) {
        var model = this;
        model.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                model.errorMessage = "Please fill in username and password!";
                $('.modal').effect('shake');

                return;
            }
            userService
                .login(user.username, user.password)
                .then(function (_user) {

                    $('.modal').modal('toggle');
                    $window.location.reload();

                }, function (err) {
                    if(err.status === 401) {
                        model.errorMessage = "User not found. Check username and password again";
                    } else if(err.status === 400) {
                        model.errorMessage = "Please fill in username and password!";
                    } else {
                        model.errorMessage = "Internal Server Error. Please retry in a while";
                    }
                    $('.modal').effect('shake');
                });
                // .finally(function (wha) {
                //     console.log(wha);
                // });
        }
    }
})();

(function () {
    angular
        .module("OverHub")
        .controller("ohNavbarController", ohNavbarController);

    function ohNavbarController($window, $location, userService) {
        var model = this;

        model.logout = logout;

        function init() {
            userService
                .getCurrentUser()
                .then(function (response) {
                    model.currentUser = response.data;
                    console.log(model.currentUser);
                });
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $window.location.reload();
                });
        }

    }
})();
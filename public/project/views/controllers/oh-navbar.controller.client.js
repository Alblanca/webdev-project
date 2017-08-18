(function () {
    angular
        .module("OverHub")
        .controller("ohNavbarController", ohNavbarController);

    function ohNavbarController(userService) {
        var model = this;

        function init() {
            userService
                .getCurrentUser()
                .then(function (response) {
                    model.currentUser = response.data;
                    console.log(model.currentUser);
                });
        }
        init();

    }
})();
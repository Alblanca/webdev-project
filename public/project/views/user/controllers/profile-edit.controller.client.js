/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("profileEditController", profileEditController);

    function profileEditController($routeParams, $location, userService, currentUser) {
        var model = this;

        //declare functions
        model.profileUser = currentUser;
        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;

        function init() {

        }
        init();

        function updateUser(user) {
            userService
                .updateUser(user)
                .then(function () {
                    alert("User updated!");
                });
        }

        function unregisterUser(user) {
            userService
                .unregisterUser(user)
                .then(function () {
                    $location.url("/login");
                });
        }
    }

})();

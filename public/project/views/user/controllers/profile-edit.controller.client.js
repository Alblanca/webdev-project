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
    }

})();

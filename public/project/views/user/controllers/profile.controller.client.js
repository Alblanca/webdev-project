/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("profileController", profileController);

    function profileController($location, userService, currentUser) {
        var model = this;
        var userId = currentUser._id;

        //declare functions
        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;
        model.logout = logout;

        function init() {
            model.user = currentUser;
            model.displayName = currentUser.nickname ? currentUser.nickname : currentUser.username;
            if(currentUser.blizzard) {
                model.isAuthenticatedUser = true;
                model.battletag = user.blizzard.battletag;
            } else {
                model.isAuthenticatedUser = false;
            }

            model.introduction =
                (currentUser.introduction || currentUser.introduction ==='')
                ? currentUser.introduction
                : "This user has no introduction yet";
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/");
                });
        }

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

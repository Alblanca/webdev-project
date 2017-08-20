/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, userService, paramUser) {
        var model = this;

        //declare functions
        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;
        model.logout = logout;
        model.canEdit = false;

        function init() {
            model.paramUser = paramUser;
            model.displayName = paramUser.nickname ? paramUser.nickname : paramUser.username;
            if(paramUser.blizzard) {
                model.isAuthenticatedUser = true;
                model.battletag = paramUser.blizzard.battletag;
            } else {
                model.isAuthenticatedUser = false;
            }

            model.introduction =
                        (paramUser.introduction || paramUser.introduction ==='')
                            ? paramUser.introduction
                            : "This user has no introduction yet";

            userService
                .getCurrentUser()
                .then(function (response) {
                    if(response.data) {
                        model.currentUser = response.data;
                        model.canEdit = paramUser.username === model.currentUser.username;
                    }
                });

            // model.profileUser = null;
            // userService
            //     .findUserByUsername(paramUsername)
            //     .then(function (paramUser) {
            //
            //         model.profileUser = paramUser.data;
            //         model.displayName = paramUser.nickname ? paramUser.nickname : paramUser.username;
            //         if(paramUser.blizzard) {
            //             model.isAuthenticatedUser = true;
            //             model.battletag = paramUser.blizzard.battletag;
            //         } else {
            //             model.isAuthenticatedUser = false;
            //         }
            //         model.introduction =
            //             (paramUser.introduction || paramUser.introduction ==='')
            //                 ? paramUser.introduction
            //                 : "This user has no introduction yet";
            //
            //         userService
            //             .getCurrentUser()
            //             .then(function (response) {
            //                 model.currentUser = response.data;
            //                 model.canEdit = paramUsername === model.currentUser.username;
            //             });
            //     });


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

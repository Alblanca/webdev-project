/**
 * Created by ani on 8/19/10.
 */

(function () {
    angular
        .module("OverHub")
        .controller("commentComponentController", commentComponentController);

    function commentComponentController($window, $location, postService) {
        var commentModel = this;
        commentModel.editing = false;
        commentModel.editClicked = editClicked;

        function init() {
            // userService
            //     .getCurrentUser()
            //     .then(function (response) {
            //         model.currentUser = response.data;
            //     });
        }
        init();

        function editClicked() {
            commentModel.editing = true;
        }

        // function logout() {
        //     userService
        //         .logout()
        //         .then(function () {
        //             $window.location.reload();
        //         });
        // }

    }
})();

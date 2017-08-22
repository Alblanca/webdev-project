/**
 * Created by ani on 8/19/10.
 */

(function () {
    angular
        .module("OverHub")
        .controller("commentComponentController", commentComponentController);

    function commentComponentController($window, $location, postService, userService) {
        var commentModel = this;
        commentModel.editing = false;
        commentModel.editClicked = editClicked;
        commentModel.canEdit = false;

        function init() {
            // userService
            //     .getCurrentUser()
            //     .then(function (response) {
            //         model.currentUser = response.data;
            //     });
        }
        init();

        function editClicked(bool) {
            commentModel.editing = bool;
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

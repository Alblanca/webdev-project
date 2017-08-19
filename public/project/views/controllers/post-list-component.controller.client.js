/**
 * Created by ani on 8/10/17.
 */

(function () {
    angular
        .module("OverHub")
        .controller("postListComponentController", postListComponentController);

    function postListComponentController($window, $location, postService) {
        var model = this;
        model.getPostsByBoardId = getPostsByBoardId;

        function init() {
            // userService
            //     .getCurrentUser()
            //     .then(function (response) {
            //         model.currentUser = response.data;
            //     });
        }
        init();

        function getPostsByBoardId(boardId) {
            postService
                .findPostsByBoardId(boardId)
                .then(function (posts) {
                    model.posts = posts;
                });
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

/**
 * Created by ani on 8/10/17.
 */

(function () {
    angular
        .module("OverHub")
        .controller("postListComponentController", postListComponentController);

    function postListComponentController($window, $location, postService, $routeParams) {
        var model = this;
        model.boardId = $routeParams["boardId"];
        model.getPostsByBoardId = getPostsByBoardId;

        function init() {

        }
        init();

        function getPostsByBoardId(boardId) {
            postService
                .findPostsByBoardId(boardId)
                .then(function (board) {
                    model.posts = board.posts;
                    console.log(model.posts);
                });
        }
        // function getPostsByBoardId(boardId) {
        //
        // }

        // function logout() {
        //     userService
        //         .logout()
        //         .then(function () {
        //             $window.location.reload();
        //         });
        // }

}
})();

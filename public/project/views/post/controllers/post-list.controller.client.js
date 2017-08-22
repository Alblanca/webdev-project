/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("postListController", postListController);

    function postListController($routeParams, postService, boardService) {
        var model = this;
        model.boardId = $routeParams["boardId"];
        // model.websiteId = $routeParams["websiteId"];
        model.searchPost = searchPost;

        function init() {
            postService
                .findPostsByBoardId(model.boardId)
                .then(function (posts) {
                    model.posts = posts;
                });

            boardService
                .findBoardById(model.boardId)
                .then(function (response) {
                    model.board = response;
                    console.log(model.board);
                });
        }
        init ();

        function searchPost(searchTerm) {
            postService
                .searchPosts(searchTerm, model.boardId)
                .then(function (response) {
                    model.posts = response.data;
                });
        }
    }
})();
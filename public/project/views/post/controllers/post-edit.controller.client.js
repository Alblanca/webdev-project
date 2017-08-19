/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("postEditController", postEditController);

    function postEditController($routeParams, postService, $location, currentUser) {
        var model = this;
        // model.userId = $routeParams["userId"];
        model.boardId = $routeParams["boardId"];

        model.updatePost = updatePost;
        model.deletePost = deletePost;

        function init() {
            // pageService
            //     .findPagesForWebpage(model.userId, model.websiteId)
            //     .then(function (pages) {
            //         model.pages = pages;
            //     });
        }
        init ();

        function updatePost(post) {
            // if(!post || !post.title || !post.content) {
            //     alert("no content!");
            //     return;
            // }
            //
            // post._board = model.boardId;
            // post._user = currentUser;
            //
            // postService
            //     .createPost(post)
            //     .then(function () {
            //         $location.url("/boards/" + model.boardId);
            //     });
        }

        function deletePost() {

        }

    }
})();
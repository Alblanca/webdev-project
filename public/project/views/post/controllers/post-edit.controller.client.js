/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("postEditController", postEditController);

    function postEditController($routeParams, postService, $location) {
        var model = this;
        // model.userId = $routeParams["userId"];
        model.boardId = $routeParams["boardId"];
        model.postId = $routeParams["postId"];

        model.updatePost = updatePost;
        model.deletePost = deletePost;

        function init() {
            postService
                .findPostById(model.postId)
                .then(function (post) {
                    model.post = post;
                });
            // pageService
            //     .findPagesForWebpage(model.userId, model.websiteId)
            //     .then(function (pages) {
            //         model.pages = pages;
            //     });
        }
        init ();

        function updatePost(post) {
            postService
                .updatePost(post)
                .then(function () {
                    $location.url("/boards/"+model.boardId+"/post/"+model.postId);
                });
        }

        function deletePost() {
                postService
                    .deletePost(model.postId)
                    .then(function () {
                        $location.url("/boards/"+model.boardId);
                    });
        }

    }
})();
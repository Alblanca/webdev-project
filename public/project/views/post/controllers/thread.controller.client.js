/**
 * Created by ani on 8/10/17.
 */
(function () {
    angular
        .module("OverHub")
        .controller("threadViewController", threadViewController);

    function threadViewController($routeParams, postService, $location) {
        var model = this;
        // model.userId = $routeParams["userId"];
        model.boardId = $routeParams["boardId"];
        model.postId = $routeParams["postId"];

        function init() {
            postService
                .findPostById(model.postId)
                .then(function (post) {
                    console.log(post);
                    model.post = post;
                });

            // pageService
            //     .findPagesForWebpage(model.userId, model.websiteId)
            //     .then(function (pages) {
            //         model.pages = pages;
            //     });
        }
        init ();

        function createPost(post) {
            if(!post || !post.title || !post.content) {
                alert("no content!");
                return;
            }

            postService
                .createPost(model.boardId, post)
                .then(function () {
                    $location.url("/boards/" + model.boardId);
                });
        }

    }
})();
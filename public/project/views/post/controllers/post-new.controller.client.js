/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("postNewController", postNewController);

    function postNewController($routeParams, postService, $location) {
        var model = this;
        // model.userId = $routeParams["userId"];
        model.boardId = $routeParams["boardId"];

        model.createPost = createPost;

        function init() {
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
                    $location.url("/boards/" + model.boardId + "/new");
                });
        }

    }
})();
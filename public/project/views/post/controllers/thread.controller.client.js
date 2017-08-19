/**
 * Created by ani on 8/10/17.
 */
(function () {
    angular
        .module("OverHub")
        .controller("threadViewController", threadViewController);

    function threadViewController($routeParams, postService, $location) {
        var model = this;
        model.tempComment = "";
        // model.userId = $routeParams["userId"];
        model.boardId = $routeParams["boardId"];
        model.postId = $routeParams["postId"];
        //model.endorsePost = endorsePost();
        model.addComment = addComment();

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

        function addComment(comment) {
            var currentUser = "teststring";
            comment._user = currentUser;
            postService
                .addComment(comment)
                .then(function () {
                    $location.url("/boards/" + model.boardId + "/post/" + model.postId);
                });
        }

        // function endorsePost() {
        //     postService
        //         .endorsePost(model.post)
        // }
    }
})();
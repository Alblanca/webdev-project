/**
 * Created by ani on 8/10/17.
 */
(function () {
    angular
        .module("OverHub")
        .controller("threadViewController", threadViewController);

    function threadViewController($routeParams, postService, $location, $route, userService) {
        var model = this;
        model.tempComment = "";
        // model.userId = $routeParams["userId"];
        model.boardId = $routeParams["boardId"];
        model.postId = $routeParams["postId"];
        model.endorsePost = endorsePost;
        model.addComment = addComment;

        function init() {
            postService
                .findPostById(model.postId)
                .then(function (post) {
                    model.post = post;
                    model.comments = model.post.comments;
                    console.log(model.comments);
                });
            postService
                .findPopulatedUserByPostId(model.postId)
                .then(function (post) {
                    model.user = post._user;
                });
            userService
                .getCurrentUser()
                .then(function (user) {
                   model.currUser = user.data;
                });
            // pageService
            //     .findPagesForWebpage(model.userId, model.websiteId)
            //     .then(function (pages) {
            //         model.pages = pages;
            //     });
        }
        init ();

        function addComment(comment) {
            postService
                .addComment(comment, model.currUser, model.postId)
                .then(function () {
                    // $location.url("/boards/" + model.boardId + "/post/" + model.postId);
                    $route.reload();
                });
        }

        function endorsePost() {
            postService
                .endorsePost(model.postId)
                .then(function () {
                    $route.reload();
                    alert('Post is now coach-endorsed!')
                });
        }

        // function endorsePost() {
        //     postService
        //         .endorsePost(model.post)
        // }
    }
})();
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
        model.editComment = editComment;
        model.deleteComment = deleteComment;
        model.savePost = savePost;

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

        function savePost() {
            if (model.currUser) {
                postService
                    .savePost(model.currUser, model.postId)
                    .then(function () {
                        $route.reload();
                        alert('Post saved to profile.');
                    });
            } else {
                alert('Must be signed in to save post.');
            }
        }

        //TODO Comment related functions should NOT be here. Should implement commentController
        function addComment(comment) {
            if (model.currUser) {
                postService
                    .addComment(comment, model.currUser, model.postId)
                    .then(function () {
                        // $location.url("/boards/" + model.boardId + "/post/" + model.postId);
                        $route.reload();
                    });
            } else {
                alert('Must be signed in to comment.');
            }
        }

        function editComment(comment) {
            postService
                .editComment(comment, model.postId)
                .then(function () {
                   $route.reload();
                });
        }

        function deleteComment(commentId) {
            postService
                .deleteComment(commentId)
                .then(function () {
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
/**
 * Created by ani on 8/10/17.
 */
(function () {
    angular
        .module("OverHub")
        .controller("threadViewController", threadViewController);

    function threadViewController($routeParams, postService, $location, userService) {
        var model = this;
        model.tempComment = "";
        // model.userId = $routeParams["userId"];
        model.boardId = $routeParams["boardId"];
        model.postId = $routeParams["postId"];
        //model.endorsePost = endorsePost();
        model.addComment = addComment;

        function init() {
            postService
                .findPostById(model.postId)
                .then(function (post) {
                    model.post = post;
                });
            postService
                .findPopulatedUserByPostId(model.postId)
                .then(function (post) {
                    model.user = post._user;
                    console.log(model.user);
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
            commentObj = {_user : model.currUser, _post : model.postId, content : comment};
            console.log(commentObj);
            postService
                .addComment(commentObj)
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
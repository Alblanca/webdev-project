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
        model.votePost = votePost;

        function init() {
            postService
                .findPostById(model.postId)
                .then(function (post) {
                    model.post = post;
                    model.comments = model.post.comments;
                    userService
                        .getCurrentUser()
                        .then(function (user) {
                            model.currUser = user.data;
                            model.voterInfo = getVoterInfo(model.post.votes);
                            updateButtonUI();
                        });
                });
            postService
                .findPopulatedUserByPostId(model.postId)
                .then(function (post) {
                    model.user = post._user;
                });

        }
        init ();

        function savePost() {
            if (model.currUser) {
                if (model.currUser.savedPosts.indexOf(model.postId) >= 0) {
                    alert('Already saved this post.');
                } else {
                    postService
                        .savePost(model.currUser, model.postId)
                        .then(function () {
                            $route.reload();
                            alert('Post saved to profile.');
                        });
                }
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
                .deleteComment(commentId, model.postId)
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

        function votePost(isUpvote) {
            if(!model.currUser) { //login verification
                alert("You need to login to perform this");
                return;
            }
            if(model.post._user === model.currUser._id) {
                alert("You can't vote your own post");
                return;
            }

            //create temporary copy of post object
            var voterObj = {
                voter: model.currUser,
                isUpvote: isUpvote
            };
            var tempPost = model.post;
            var voteMessage = "Successfully voted!";

            //update voter info and push
            if(!model.voterInfo.hasVoted) {
                // user never voted
                tempPost.votes.push(voterObj);

            } else if(model.voterInfo.hasVoted && (model.voterInfo.isUpvote === isUpvote)) {
                // user already voted and pushed same vote button
                // delete user from list of voters
                var index = model.voterInfo.voterIndex;
                tempPost.votes.splice(index, 1);
                voteMessage = "Vote cancelled!";
            } else {
                // user already voted but wants to push other vote button
                //update vote info
                var index = model.voterInfo.voterIndex;
                tempPost.votes[index] = voterObj;
                voteMessage = "Vote changed!";

            }

            postService
                .updatePost(tempPost)
                .then(function () {
                    alert(voteMessage);
                    $route.reload();
                    return;
                });
        }

        //private functions
        function getVoterInfo(votes) {
            var voterInfo = {hasVoted: false, isUpvote: false}
            for(var i =0; i < votes.length; i++) {
                if(votes[i].voter === model.currUser._id) {
                    voterInfo.isUpvote = votes[i].isUpvote;
                    voterInfo.hasVoted = true;
                    voterInfo.voterIndex = i;
                }
            }
            return voterInfo;
        }

        function updateButtonUI() {
            if(!model.voterInfo.hasVoted) {
                return;
            }
            if(model.voterInfo.isUpvote) {
                $('#voteUpBtn').addClass('override-upbtn');
            } else {
                $('#voteDownBtn').addClass('override-downbtn')
            }
        }



    }
})();
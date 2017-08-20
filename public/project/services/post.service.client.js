/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("OverHub")
        .factory("postService", postService);
    function postService($http) {

       var api = {
           "findPostsByBoardId" : findPostsByBoardId,
           "createPost" : createPost,
           "findPostById" : findPostById,
           "addComment" : addComment,
           "findPopulatedUserByPostId" : findPopulatedUserByPostId,
           "updatePost" : updatePost,
           "deletePost" : deletePost,
           "endorsePost" : endorsePost,
           "editComment" : editComment,
           "deleteComment" : deleteComment,
           "savePost" : savePost,
           "searchPosts" : searchPosts,
           "getAllPosts" : getAllPosts,

           "findPagesForWebpage" : findPagesForWebpage,
           "findPageById" : findPageById,
           "createPage" : createPage

       };

       return api;

       function getAllPosts() {
           var url="/api/allPosts";

           return $http.get(url);
       }

       function savePost(user, postId) {
           var url = "/api/post/" + postId + "/save";
           return $http.put(url, user);
       }

       function findPopulatedUserByPostId(postId) {
           var url = "/api/post/" + postId + "/usr";

           return $http.get(url)
               .then(function (response) {
                   return response.data;
               });
       }

        function findPostsByBoardId(boardId) {
            var url = "/api/boards/" + boardId + '/posts';

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPost(post) {
            var boardId = post._id;
            var url = "/api/boards/" + boardId + "/new";

            return $http.post(url, post)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPostById(postId) {
            var url = "/api/post/" + postId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addComment(comment, user, postId) {
            var url = "/api/post/" + postId;
            var commentObj = {comment: comment, user: user};

            return $http.post(url, commentObj)
                .then(function(response) {
                    return response.data;
                });
        }

        function deletePost(postId) {
            var url = "/api/post/" + postId;

            return $http.delete(url);
        }

        function updatePost(post) {
           var postId = post._id;
            var url = "/api/post/" + postId;

            return $http.put(url, post);
        }

        function endorsePost(postId) {
           var url = "/api/post/" + postId + "/endorse";
           return $http.get(url, postId);
        }

        function editComment(comment, postId) {
            var url = "/api/post/" + postId + "/comment/" + comment._id;

            return $http.put(url, comment);
        }

        function deleteComment(commentId) {
            var url = "/api/comment/" + commentId;
            return $http.delete(url);
        }


        function searchPosts(searchTerm, boardId) {
            var url = "/api/boards/" + boardId + "/search?searchTerm=" + searchTerm;

            return $http.get(url);
        }







        function findPagesForWebpage(userId, wid) {
            var url = "/api/user/" + userId + "/website/" + wid + "/page";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function createPage(userId, websiteId, page) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page";

            return $http.post(url, page);
        }

        function findPageById(uid, wid, pid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();
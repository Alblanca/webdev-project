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

           "findPagesForWebpage" : findPagesForWebpage,
           "findPageById" : findPageById,
           "createPage" : createPage

       };

       return api;

       function findPopulatedUserByPostId(postId) {
           var url = "/api/post/" + postId + "/usr";

           return $http.get(url)
               .then(function (response) {
                   return response.data;
               });
       }

        function findPostsByBoardId(boardId) {
           console.log(boardId, "asdkfjalskdjfkla");
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
           return $http.put(url, postId);
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

        function updatePage(uid, wid, pid, page) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid;

            return $http.put(url, page);
        }

        function deletePage(uid, wid, pid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid;

            return $http.delete(url);
        }

    }

})();
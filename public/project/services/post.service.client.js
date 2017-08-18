/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("OverHub")
        .factory("postService", postService);
    function postService($http) {

       var api = {
           "findPagesForWebpage" : findPagesForWebpage,
           "findPageById" : findPageById,
           "createPage" : createPage,
           "updatePage" : updatePage,
           "deletePage" : deletePage
       };

       return api;

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
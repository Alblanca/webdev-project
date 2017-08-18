/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("OverHub")
        .service("boardService", boardService);

    function boardService($http) {

        this.findAllBoards = findAllBoards;
        this.createBoard = createBoard;

        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.updateWebsite = updateWebsite;

        function findAllBoards() {
            var url = "/api/boards";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function createBoard(board) {
            var url= "/api/boards";
            return $http.post(url, board);
        }

        function findWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";

           return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWebsite(website, userId) {
            var url = "/api/user/" + userId + "/website";

            return $http.post(url, website);
        }

        function findWebsiteById(userId, id) {
            var url = "/api/user/" + userId + "/website/" + id;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(userId, id) {
            var url = "/api/user/" + userId + "/website/" + id;

            return $http.delete(url);
        }

        function updateWebsite(website, userId, websiteId) {
            var url = "/api/user/" +  userId + "/website/" + websiteId;

            return $http.put(url, website);
        }

    }

})();
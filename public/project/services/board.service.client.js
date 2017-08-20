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
        this.findBoardById = findBoardById;
        this.deleteBoard = deleteBoard;
        this.updateBoard = updateBoard;
        this.findPopulatedBoards = findPopulatedBoards;


        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;

        function findPopulatedBoards() {
            var url ="/api/populatedBoards";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllBoards() {
            var url = "/api/boards";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function findBoardById(boardId) {
            var url = "/api/boards/" + boardId;
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

        function deleteBoard(boardId) {
            var url = "/api/boards/" + boardId;

            return $http.delete(url);
        }

        function updateBoard(board) {
            var url = "/api/boards/" + board._id;

            return $http.put(url, board);
        }

    }

})();
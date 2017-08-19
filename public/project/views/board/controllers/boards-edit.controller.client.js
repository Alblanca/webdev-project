/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("boardEditController", boardEditController);

    function boardEditController($routeParams, boardService, $location) {
        var model = this;
        // model.userId = $routeParams["userId"];
        model.boardId = $routeParams["boardId"];
        model.updateBoard = updateBoard;
        model.deleteBoard = deleteBoard;

        function init() {
            boardService
                .findBoardById(model.boardId)
                .then(function (board) {
                    // var length = boards.length;
                    // '[[b1, b2, b3],[b1,b2,b3],[b1]]'
                    model.board = board;
                });
            // websiteService
            //     .findWebsitesForUser(model.userId)
            //     .then(function (websites) {
            //         model.websites = websites;
            //     });
        }
        init();

        // function createWebsite(website) {
        //     websiteService
        //         .createWebsite(website, model.userId)
        //         .then(function () {
        //             $location.url("/user/"+ model.userId + "/website");
        //         });
        // }
        function updateBoard(board) {
            boardService
                .updateBoard(board)
                .then(function () {
                    $location.url("/boards")
                });
        }

        function deleteBoard() {
            boardService
                .deleteBoard(model.board._id)
                .then(function () {
                    $location.url("/boards")
                });
        }
    }
})();
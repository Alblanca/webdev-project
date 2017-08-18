/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("boardNewController", boardNewController);

    function boardNewController($routeParams, boardService, $location) {
        var model = this;
        // model.userId = $routeParams["userId"];
        model.createBoard = createBoard;

        function init() {
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
        function createBoard(board) {
            boardService
                .createBoard(board)
                .then(function () {
                    $location.url("/boards")
                });
        }
    }
})();
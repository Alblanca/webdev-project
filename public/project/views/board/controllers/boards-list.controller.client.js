/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("boardListController", boardListController);

    function boardListController($routeParams, boardService) {
        var model = this;
        // model.userId = $routeParams["userId"];

        function init() {
            boardService
                .findAllBoards()
                .then(function (boards) {
                    model.boards = boards;
                });
        }
        init();

    }
})();
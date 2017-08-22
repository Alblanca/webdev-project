/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("boardListController", boardListController);

    function boardListController($routeParams, boardService, userService) {
        var model = this;

        function init() {
            boardService
                .findAllBoards()
                .then(function (boards) {
                    // var length = boards.length;
                    // '[[b1, b2, b3],[b1,b2,b3],[b1]]'
                    model.boards = boards;
                });
            userService
                .getCurrentUser()
                .then(function (user) {
                   model.user = user.data;
                });

        }
        init();

    }
})();
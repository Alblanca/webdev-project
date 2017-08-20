/**
 * Created by ani on 8/19/10.
 */

(function () {
    angular
        .module("OverHub")
        .controller("recentPostController", recentPostController);

    function recentPostController($window, $location, boardService) {
        var model = this;

        function init() {
            boardService
                .findAllBoards()
                .then(function (response) {
                    model.boards = response;
                    console.log(model.boards);
                });
        }
        init();

    }
})();

/**
 * Created by ani on 8/19/10.
 */

(function () {
    angular
        .module("OverHub")
        .controller("miniTableController", miniTableController);

    function miniTableController($window, $location, boardService) {
        var commentModel = this;
        commentModel.editing = false;
        commentModel.editClicked = editClicked;

        function init() {

        }
        init();

        function editClicked(bool) {
            commentModel.editing = bool;
        }

    }
})();

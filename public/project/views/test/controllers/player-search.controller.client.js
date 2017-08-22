/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("playerSearchController", playerSearchController);

    function playerSearchController($location, $rootScope, overwatchService) {
        var model = this;
        model.test = test;

        function init() {
            return overwatchService
                .getOverwatchProfile("Alblanca#1581");

        }
        init();

        function test() {

        }

    }
})();

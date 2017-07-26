/**
 * Created by berti on 7/25/2017.
 */
/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService, $sce) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];

        function init() {

        }
        init();

    }
})();
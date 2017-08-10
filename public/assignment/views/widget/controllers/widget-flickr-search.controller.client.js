(function () {
   angular
       .module("WebAppMaker")
       .controller("imageSearchController", imageSearchController);

    function imageSearchController($routeParams) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];
        model.widgetId = $routeParams["widgetId"];

        function init() {

        }
        init ();
    }
})();
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

    function widgetNewController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];

        model.createWidget = createWidget;
        model.widgetOk = widgetOk;

        function init() {

        }
        init();

        function widgetOk(widgetType, widget) {
            createWidget(widgetType, widget);
        }

        function createWidget(widgetType, widget) {
            widgetService.createWidget(model.pageId, widgetType, widget);
            $location.url("/user/"+model.userId+"/website/"+
                model.websiteId+"/page/" + model.pageId+"/widget");
        }

    }
})();
/**
 * Created by berti on 7/25/2017.
 */
/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];
        model.widgetId = $routeParams["widgetId"];

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.widgetOk = widgetOk;

        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();

        function widgetOk(widgetType, widget) {
            model.updateWidget(widgetType, widget);
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url("/user/"+model.userId+"/website/"+
                model.websiteId+"/page/" + model.pageId+"/widget");
        }

        function updateWidget(widgetType, widget) {
            widgetService.updateWidget(widgetType, model.widgetId, widget);
            $location.url("/user/"+model.userId+"/website/"+
                model.websiteId+"/page/" + model.pageId+"/widget");
        }
    }
})();
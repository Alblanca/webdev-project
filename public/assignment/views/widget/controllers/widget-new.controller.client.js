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

        function init() {

        }
        init();

        function createWidget(widgetType) {
            widgetService
                .createWidget(model.userId, model.websiteId, model.pageId, widgetType)
                .then(function (newWidget) {
                    var url = "/user/"+ model.userId +"/website/" + model.websiteId + "/page/" +
                        model.pageId + "/widget" + newWidget._id;
                    console.log(url);
                    $location.url("/user/"+ model.userId +"/website/" + model.websiteId + "/page/" +
                        model.pageId + "/widget/" + newWidget._id);
                });
        }

    }
})();
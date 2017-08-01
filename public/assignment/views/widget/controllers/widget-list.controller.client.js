/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];

        model.trustHtmlContent = trustHtmlContent;
        model.trustUrlResource = trustUrlResource;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;
        // model.getWidgetEditUrl = getWidgetEditUrl;
        model.warnUnimplemented = warnUnimplemented;

        function init() {
            widgetService
                .findWidgetsForPage(model.userId, model.websiteId, model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        function warnUnimplemented() {
            alert("Not yet implemented feature!");
        }

        function trustUrlResource(url) {
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

        function getWidgetIncludeUrl(widgetType) {
            return "views/widget/editors/widget-" + widgetType + ".component.client.html";
        }

        // function getWidgetEditUrl(widget) {
        //     return "#!/user/"+ model.userId +"/website/"+ model.websiteId +
        //         "/page/" + model.pageId +"/widget/" + widget._id;
        // }
    }
})();
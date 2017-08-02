(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("widgetList", widgetListDirective);

    function widgetListDirective($http) {
        function linkFunction(scope, element) {
            var widgetList = element.find("#widgetList");
            widgetList.sortable({
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function(event, ui) {
                    endIndex = $(ui.item).index();
                    scope.model.updateWidgetPosition(startIndex, endIndex);
                }
            });
            var startIndex = -1;
            var endIndex = -1;
        }

        return {
            templateUrl: "views/widget/editors/widget-list.component.client.html",
            link : linkFunction
        }
    }
})();
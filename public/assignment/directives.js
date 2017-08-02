(function () {
    angular
        .module("myDirectives", [])
        .directive("widgetList", widgetListDirective)
        .directive("hello", helloDirective);

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
    
    function itemListDirective($http) {
        function linkFunction(scope, element) {
            console.log(scope);
            var ul = element.find("ul");
            var startIndex = -1;
            var endIndex = -1;
            ul.sortable({
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    console.log([startIndex, endIndex]);
                    $http.put("/api/widget/123?start="+startIndex+"&end="+endIndex);
                }
            });
        }
        return {
            templateUrl: "widget-list.html",
            link: linkFunction
        }
    }
    
    function helloDirective() {
        return {
            templateUrl: "helloWorld.html"
        };
    }
})();
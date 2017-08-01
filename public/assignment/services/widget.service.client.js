/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);

    function widgetService($http) {

       this.findWidgetsForPage = findWidgetsForPage;
       this.createWidget = createWidget;
       this.deleteWidget = deleteWidget;
       this.updateWidget = updateWidget;
       this.findWidgetById = findWidgetById;

       function findWidgetsForPage(uid, wid, pid) {
           var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid +"/widget";

           return $http.get(url)
               .then(function (response) {
                   return response.data;
               });
       }

        function createWidget(uid, wid, pid, widgetType) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid +"/widget";
            var widget = {"widgetType" : widgetType};

            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(uid, wid, pid, widget) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid +"/widget/" + widget._id;

            return $http.put(url, widget);
        }

        function deleteWidget(uid, wid, pid, widgetId) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid +"/widget/" + widgetId;

            return $http.delete(url);
        }

        function findWidgetById(uid, wid, pid, widgetId) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid +"/widget/" + widgetId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
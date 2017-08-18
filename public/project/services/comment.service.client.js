/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("OverHub")
        .service("commentService", commentService);

    function commentService($http) {

       this.findWidgetsForPage = findWidgetsForPage;
       this.createWidget = createWidget;
       this.deleteWidget = deleteWidget;
       this.updateWidget = updateWidget;
       this.findWidgetById = findWidgetById;
       this.updateWidgetPosition = updateWidgetPosition;

       function updateWidgetPosition(uid, wid, pid, widgetId, startIndex, endIndex) {
           var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid +
               "/widget?startIndex=" + startIndex + "&endIndex=" + endIndex;

           return $http.put(url);
       }

       function findWidgetsForPage(uid, wid, pid) {
           var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid +"/widget";

           return $http.get(url)
               .then(function (response) {
                   return response.data[0].widgets;
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
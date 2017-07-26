/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);

    function widgetService() {
       var widgets = [
            { "_id": "123","name": "lorem","widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234","name": "lorem", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345","name": "lorem", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456","name": "lorem", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567","name": "lorem", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678","name": "lorem", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789","name": "lorem", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

       this.findWidgetsForPage = findWidgetsForPage;
       this.createWidget = createWidget;
       this.deleteWidget = deleteWidget;
       this.updateWidget = updateWidget;
       this.findWidgetById = findWidgetById;

       function findWidgetsForPage(pid) {
           var _widgets = [];
           for(var w in widgets) {
               if(widgets[w].pageId === pid) {
                   _widgets.push(widgets[w]);
               }
           }
           return _widgets;
       }

        function createWidget(pid, widgetType, widget) {
            widget.pageId = pid;
            widget._id = (new Date()).getTime() + "";
            widget.widgetType = widgetType;

            widgets.push(widget);

            return;
        }

        function updateWidget(widgetType, widgetId, widget) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widget.widgetType = widgetType;
                    widget._id = widgetId;
                    delete widgets[w];
                    widgets[w] = widget;
                }
            }
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    delete widgets[w];
                }
            }
            return;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
        }

    }
})();
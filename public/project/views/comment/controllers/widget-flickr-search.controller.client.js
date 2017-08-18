(function () {
   angular
       .module("WebAppMaker")
       .controller("imageSearchController", imageSearchController);

    function imageSearchController($routeParams, $location, searchService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];
        model.widgetId = $routeParams["widgetId"];

        model.searchPhotos = searchPhotos;
        model.choosePhoto = choosePhoto;

        function init() {

        }
        init ();

        function choosePhoto(photo) {
            searchService
                .choosePhoto(model.userId, model.websiteId, model.pageId, model.widgetId, photo)
                .then(function (status) {
                    var url = "user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget";
                   $location.url(url);
                });
        }

        function searchPhotos(searchText) {
            searchService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }
})();
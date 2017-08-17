/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("OverHub")
        .service("testService", testService);

    function testService($http) {

        this.searchPhotos = searchPhotos;
        this.choosePhoto = choosePhoto;
        this.searchUser = searchUser;

        var key = "0d4e41fcf71b4b12ffba22c3c0d5f182";
        var secret = "33a2aeae5f3afb0f";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchUser(battleTag) {
            var reqUrl ="https://owapi.net/api/v3/u/"+ battleTag +"/stats?format=json_pretty";

            return $http.get(reqUrl);
        }

        function choosePhoto(uid, wid, pid, widgetId, photo) {
            var _url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid +"/widget/" + widgetId;
            var photoUrl ="https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/"+ photo.id +"_"+ photo.secret + ".jpg"
            var tmpObj = {url: photoUrl}

            return $http.put(_url, tmpObj)
                .then(function (response) {
                    return response;
                });
        }

        function searchPhotos(searchText) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);

            return $http.get(url);
        }
        
    }
})();
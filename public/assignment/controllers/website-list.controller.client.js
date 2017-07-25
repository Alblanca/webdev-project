/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];

        model.findWebsiteById = findWebsiteById;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        function findWebsiteById(websiteId) {
            var _website = websiteService.findWebsiteById(websiteId);
            var url = "/user/" + model.userId + "/website/";
            url += _website._id + "";
            $location.url(url);
        }
    }
})();
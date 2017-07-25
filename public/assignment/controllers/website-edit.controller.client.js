/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];

        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init ();

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url("/user/"+ model.userId+"/website");
        }

        function updateWebsite(websiteId) {
            websiteService.updateWebsite(websiteId);
            $location.url("/user/"+ model.userId +"/website");
        }
    }
})();
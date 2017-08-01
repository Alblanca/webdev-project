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
            websiteService.findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });

            websiteService
                .findWebsiteById(model.userId, model.websiteId)
                .then(function (website) {
                    model.website = website;
                });
        }
        init ();

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url("/user/"+ model.userId+"/website");
        }

        function updateWebsite(website, websiteId) {
            websiteService.updateWebsite(website, websiteId);
            $location.url("/user/"+ model.userId +"/website");
        }
    }
})();
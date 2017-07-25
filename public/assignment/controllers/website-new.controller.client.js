/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        function createWebsite(website) {
            websiteService.createWebsite(website, model.userId);
            $location.url("/user/"+ model.userId + "/website");
        }
    }
})();
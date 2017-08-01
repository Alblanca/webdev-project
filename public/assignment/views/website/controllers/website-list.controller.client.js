/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;
        model.userId = $routeParams["userId"];

        function init() {
            websiteService.findWebsitesForUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
        }
        init();

    }
})();
/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("postListController", postListController);

    function postListController($routeParams, postService) {
        var model = this;
        // model.userId = $routeParams["userId"];
        // model.websiteId = $routeParams["websiteId"];

        function init() {
            // pageService
            //     .findPagesForWebpage(model.userId, model.websiteId)
            //     .then(function (pages) {
            //         model.pages = pages;
            //     });
        }
        init ();
    }
})();
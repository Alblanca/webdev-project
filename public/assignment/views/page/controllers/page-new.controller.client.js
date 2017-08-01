/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];

        model.createPage = createPage;

        function init() {
            pageService
                .findPagesForWebpage(model.userId, model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init ();

        function createPage(page) {
            if(!page || !page.name || !page.description) {
                alert("no content!");
                return;
            }

            pageService
                .createPage(model.userId, model.websiteId, page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }

    }
})();
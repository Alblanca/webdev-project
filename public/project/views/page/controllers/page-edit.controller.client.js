/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService, $location) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService
                .findPagesForWebpage(model.userId, model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService
                .findPageById(model.userId, model.websiteId, model.pageId)
                .then(function (page) {
                    model.page = page;
                });
        }
        init();

        function updatePage(page) {
            pageService
                .updatePage(model.userId, model.websiteId, model.pageId, page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }

        function deletePage(pid) {
            pageService
                .deletePage(model.userId, model.websiteId, pid)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }
    }
})();
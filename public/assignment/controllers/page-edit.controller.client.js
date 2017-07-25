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
            model.pages = pageService.findPagesForWebpage(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        function updatePage(pid, page) {
            pageService.updatePage(model.pageId, page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

        function deletePage(pid) {
            pageService.deletePage(pid);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();
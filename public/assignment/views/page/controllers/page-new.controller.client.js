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
            model.pages = pageService.findPagesForWebpage(model.websiteId);
        }
        init ();

        function createPage(page) {
            if(!page || !page.name || !page.description) {
                alert("no content!");
                return;
            }

            pageService.createPage(model.websiteId, page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

    }
})();
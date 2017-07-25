/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];

        model.findPageById = findPageById;

        function init() {
            model.pages = pageService.findPagesForWebpage(model.websiteId);
        }
        init ();

        function findPageById(pid) {
            var foundPage = pageService.findPageById(pid);
            $location.url("/user/"+ model.userId +"/website/" + model.websiteId + "/page/" + foundPage._id);
        }
    }
})();
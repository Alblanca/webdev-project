/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);
    function pageService() {
       var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

       var api = {
           "findPagesForWebpage" : findPagesForWebpage
       };

       return api;

        function findPagesForWebpage(wid) {
            var _pages = [];

            for (var p in pages) {
                if(pages[p].websiteId === wid) {
                    var pp = pages[p];
                    _pages.push(pages[p]);
                }
            }
            return _pages;
        }

    }
})();
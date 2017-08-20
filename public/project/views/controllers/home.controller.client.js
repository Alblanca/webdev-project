/**
 * Created by ani on 8/19/10.
 */

(function () {
    angular
        .module("OverHub")
        .controller("homeController", homeController);

    function homeController($window, $location, postService, $filter) {
        var model = this;

        function init() {
            postService
                .getAllPosts()
                .then(function (response) {
                    var posts = response.data;
                    var descending = $filter('orderBy')(posts, '-score');
                    model.posts = $filter('limitTo')(descending, 5);
                });
        }
        init();

    }
})();

(function () {
    angular
        .module("overHubDirectives", [])
        .directive("overhubNavbar", overhubNavbar)
        .directive("postListComponent", postListComponent)
        .directive("recentPostsComponent", recentPostsComponent)
        .directive("commentsComponent", commentsComponent);

    function overhubNavbar($http) {
        // function linkFunction(scope, element) {
        //     var widgetList = element.find("#widgetList");
        //     widgetList.sortable({
        //         start: function (event, ui) {
        //             startIndex = $(ui.item).index();
        //         },
        //         stop: function(event, ui) {
        //             endIndex = $(ui.item).index();
        //             scope.model
        //                 .updateWidgetPosition(startIndex, endIndex);
        //             setTimeout(function(){
        //                 //do what you need here
        //             }, 20000);
        //         }
        //     });
        //     var startIndex = -1;
        //     var endIndex = -1;
        // }

        return {
            templateUrl: "views/home/templates/oh-navbar.component.client.html",
            controller: 'ohNavbarController',
            controllerAs: 'navController'
            // link : linkFunction
        }
    }

    function postListComponent($http) {
        return {
            templateUrl: "views/home/templates/post-list.component.client.html",
            controller: "postListComponentController",
            controllerAs: "postList"
        }
    }

    function recentPostsComponent($http) {
        return {
            templateUrl: "views/home/templates/recent-posts.component.client.html",
            controller: "recentPostController",
            controllerAs: "recentPostModel"
        }
    }

    function commentsComponent($http) {
        return {
            templateUrl: "views/home/templates/comment.component.client.html",
            controller: "commentComponentController",
            controllerAs: "commentModel"
        }
    }

})();
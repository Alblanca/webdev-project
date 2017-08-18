(function () {
    angular
        .module("OverHub")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {
        // $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $routeProvider
        // .when("/", {
        //     templateUrl: "views/home.view.client.html",
        //     controller:  "homeController",
        //     controllerAs: "model"
        // })
            .when("/", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller:  "loginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller:  "loginController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    asdf: checkLogin
                }
            })
            .when("/unauthorized", {
                templateUrl: "views/user/templates/unauthorized.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/test", {
                templateUrl: "views/test/templates/player-search.view.client.html",
                controller: "playerSearchController",
                controllerAs: "model"
            });
            // //website routes
            // .when("/user/:userId/website", {
            //     templateUrl: "views/website/templates/website-list.view.client.html",
            //     controller: "websiteListController",
            //     controllerAs: "model"
            // })
            // .when("/user/:userId/website/new", {
            //     templateUrl: "views/website/templates/website-new.view.client.html",
            //     controller: "websiteNewController",
            //     controllerAs: "model"
            // })
            // .when("/user/:userId/website/:websiteId", {
            //     templateUrl: "views/website/templates/website-edit.view.client.html",
            //     controller: "websiteEditController",
            //     controllerAs: "model"
            // })
            // //page routes
            // .when("/user/:userId/website/:websiteId/page", {
            //     templateUrl: "views/page/templates/page-list.view.client.html",
            //     controller: "pageListController",
            //     controllerAs: "model"
            // })
            // .when("/user/:userId/website/:websiteId/page/new", {
            //     templateUrl: "views/page/templates/page-new.view.client.html",
            //     controller: "pageNewController",
            //     controllerAs: "model"
            // })
            // .when("/user/:userId/website/:websiteId/page/:pageId", {
            //     templateUrl: "views/page/templates/page-edit.view.client.html",
            //     controller: "pageEditController",
            //     controllerAs: "model"
            // })
            // //widget routes
            // .when("/user/:userId/website/:websiteId/page/:pageId/widget", {
            //     templateUrl: "views/widget/templates/widget-list.view.client.html",
            //     controller: "widgetListController",
            //     controllerAs: "model"
            // })
            // .when("/user/:userId/website/:websiteId/page/:pageId/widget/new", {
            //     templateUrl: "views/widget/templates/widget-chooser.view.client.html",
            //     controller: "widgetNewController",
            //     controllerAs: "model"
            // })
            // .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", {
            //     templateUrl: "views/widget/templates/widget-edit.view.client.html",
            //     controller: "widgetEditController",
            //     controllerAs: "model"
            // })
            // .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/search", {
            //     templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
            //     controller: "imageSearchController",
            //     controllerAs: "model"
            // })
            // .otherwise({redirectTo : "/login"});

    }
    
    function checkLogin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url("/unauthorized");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

})();

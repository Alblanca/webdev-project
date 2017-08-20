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
                templateUrl: "views/home/templates/body.view.client.html",
                controller:  "homeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller:  "loginController",
                controllerAs: "model"
            })
            .when("/profile/:username", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    paramUser: checkProfileUser
                }
            })
            .when("/profile/:username/edit", {
                templateUrl:"views/user/templates/profile-edit.view.client.html",
                controller: "profileEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin,
                    profileUser: checkProfileUser,
                    useless: checkEditProfile
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
            })
            // //website routes
            .when("/boards", {
                templateUrl: "views/board/templates/boards.view.client.html",
                controller: "boardListController",
                controllerAs: "model"
            })
            .when("/boards/new", {
                templateUrl: "views/board/templates/boards-new.view.client.html",
                controller: 'boardNewController',
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/boards/:boardId/edit", {
                templateUrl: "views/board/templates/boards-edit.view.client.html",
                controller: 'boardEditController',
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/boards/:boardId", {
                templateUrl: "views/post/templates/posts.view.client.html",
                controller: 'postListController',
                controllerAs: "model"
            })
            .when("/boards/:boardId/new", {
                templateUrl: "views/post/templates/posts-new.view.client.html",
                controller: "postNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/boards/:boardId/post/:postId", {
                templateUrl: "views/post/templates/thread.view.client.html",
                controller: "threadViewController",
                controllerAs: "model"
            })
            .when("/boards/:boardId/post/:postId/edit", {
                templateUrl: "views/post/templates/posts-edit.view.client.html",
                controller: "postEditController",
                controllerAs: "model"
            })
            .when("/terminate-auth", {
                templateUrl: "views/home/templates/terminate-auth.view.client.html"
            });
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

    function checkEditProfile($route, userService, $q, $location) {
        var deferred = $q.defer();
        var paramUsername = $route.current.params.username;

        userService
            .checkLogin()
            .then(function (user) {
                if(user.username === paramUsername) {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url("/unauthorized");
                }
            });
        return deferred.promise;
    }


    function checkProfileUser($route, userService, $q, $location) {
        var deferred = $q.defer();
        var paramUsername = $route.current.params.username;

        userService
            .findUserByUsername(paramUsername)
            .then(function (res) {
                if(res.data === '') {
                    deferred.reject();
                    $location.url("/unauthorized");
                } else {
                    deferred.resolve(res.data);
                }
            });
        return deferred.promise;
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

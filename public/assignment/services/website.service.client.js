/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("websiteService", websiteService);

    function websiteService($http) {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.updateWebsite = updateWebsite;

        function findWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";

            return $http.get(url);
        }

        function createWebsite(website, userId) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            websites.push(website);

            return;
        }

        function findWebsiteById(id) {
            for(var w in websites) {
                if (websites[w]._id === id) {
                    return angular.copy(websites[w]);
                }
            }
        }

        function deleteWebsite(id) {
            for(var w in websites) {
                if (websites[w]._id === id) {
                    delete websites[w];

                }
            }
        }

        function updateWebsite(website, id) {
            for(var w in websites) {
                if (websites[w]._id === id) {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                }
            }
        }

    }

})();
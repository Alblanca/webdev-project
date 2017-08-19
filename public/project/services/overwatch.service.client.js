/**
 * Created by berti on 7/24/2017.
 */
(function () {
    angular
        .module("OverHub")
        .service("overwatchService", overwatchService);

    function overwatchService($http) {

        this.findAllBoards = findAllBoards;
        this.getRawStat = findRawStat;

        var baseApiUrl = "https://owapi.net/api/v3/u/";
        var prettify = "?format=json_pretty";
        var stats = "/stats";
        var blob = "/blob";
        var achievements = "/achievements";
        var heroes = "/heroes";

        function findAllBoards() {
            var url = "/api/boards";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function findRawStat(battletag) {
            var uid = parseBattleTag(battletag);

            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                })
        }

        //private function
        function parseBattleTag(btg) {
            return btg.split('#').join('-');
        }


    }

})();
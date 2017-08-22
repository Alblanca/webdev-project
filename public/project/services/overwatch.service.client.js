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
        this.searchUserHeroes = searchUserHeroes;
        this.searchUser = searchUser;
        this.getTemporaryResult = getTemporaryResult;

        var baseApiUrl = "https://owapi.net/api/v3/u/";
        var prettify = "?format=json_pretty";
        var stats = "/stats";
        var blob = "/blob";
        var achievements = "/achievements";
        var heroes = "/heroes";

        function findAllBoards() {
            var url = "/api/boards";
            return $http.get(url)
                .then(function (response) {
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

        function searchUser(searchText) {
            var apiText = null;
            apiText = searchText.replace('#', '-');

            testService
                .searchUser(apiText)
                .then(function (res) {
                    var playa = JSON.stringify(res.data, null, 2);
                    model.searchData = playa;

                    model.SR = res.data.us.stats.competitive.overall_stats.comprank;
                    model.compRank = res.data.us.stats.competitive.overall_stats.tier;


                });
        }

        function searchUserHeroes(searchText) {
            var apiText = null;
            apiText = searchText.replace('#', '-');

            testService
                .searchUserHeroes(apiText)
                .then(function (res) {
                    var playa = JSON.stringify(res.data, null, 2);
                    model.searchData = playa;

                    var heroPlaytimes = res.data.us.heroes.playtime.quickplay;

                    var maxProp = null;
                    var maxValue = -1;
                    for (var prop in heroPlaytimes) {
                        if (heroPlaytimes.hasOwnProperty(prop)) {
                            var value = heroPlaytimes[prop];
                            if (value > maxValue) {
                                maxProp = prop;
                                maxValue = value;
                            }
                        }
                    }

                    model.mostPlayedHero = maxProp;

                });
        }

        function searchUser(battleTag) {
            var reqUrl = "https://owapi.net/api/v3/u/" + battleTag + "/stats?format=json_pretty";

            return $http.get(reqUrl);
        }

        function searchUserHeroes(battleTag) {
            var reqUrl = "https://owapi.net/api/v3/u/" + battleTag + "/heroes?format=json_pretty";

            return $http.get(reqUrl);
        }

        function getTemporaryResult(battleTag) {
            var blizzardObj = {
                battletag: battleTag,
                skillrating: 3670,
                tier: "Master",
                mostPlayedHero: "Genji",
                tierImageSource: "http://overlog.gg/img/rankIcon/Master.png",
                heroPortraitSource: "ohi-genji"
            };

            return blizzardObj;
        }
    }

})();
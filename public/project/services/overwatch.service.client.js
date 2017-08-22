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
        this.searchStats = searchStats;
        this.getTemporaryResult = getTemporaryResult;
        this.getOverwatchProfile = getOverwatchProfile;

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

        function searchStats(battletag) {
            var fixedBattleTag = parseBattleTag(battletag);

            var reqUrl = "https://owapi.net/api/v3/u/" + fixedBattleTag + "/blob?format=json_pretty";
            return $http.get(reqUrl)
                .then(function (jsonStats) {
                    var sreqUrl = "/api/parse/stats";
                    return $http.put(sreqUrl, jsonStats);
                }, function (err) {
                    return $http.put();
                });
        }

        function getOverwatchProfile(battletag) {
            searchStats(battletag)
                .then(function (res) {
                    var skillrating = res.data.skillrating;
                    var tier = res.data.tier;
                    if (tier != null) {
                        var tierUpper = tier[0].toUpperCase() + tier.slice(1);
                    } else {
                        tierUpper = "";
                    }
                    var mostPlayedHero = res.data.mostPlayedHero;

                    var blizzardObj = {
                        battletag: battletag,
                        skillrating: skillrating,
                        tier: tier,
                        mostPlayedHero: mostPlayedHero,
                        tierImageSource: "http://overlog.gg/img/rankIcon/Tier" + tierUpper + ".png",
                        heroPortraitSource: "ohi-" + mostPlayedHero
                    };

                    if (tier === null) {
                        blizzardObj.tierImageSource = "http://overlog.gg/img/rankIcon/rank-1.png";
                    }

                    return blizzardObj;
                });
        }
    }

})();
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

        function getOverwatchProfile(battletag) {
                overwatchService
                    .searchUser(battletag)
                    .then(function (res) {
                        var skillrating = res.data.skillrating;
                        var tier = res.data.tier;
                        var tierUpper = tier.toUpperCase();
                        overwatchService
                            .searchUserHeroes(battletag)
                            .then(function (res2) {
                                var mostPlayedHero = res2.data.mostPlayedHero;

                                var blizzardObj =  {
                                    battletag: battletag,
                                    skillrating: skillrating,
                                    tier: tier,
                                    mostPlayedHero: mostPlayedHero,
                                    tierImageSource: "http://overlog.gg/img/rankIcon/" + tierUpper + ".png",
                                    heroPortraitSource: "ohi-" + mostPlayedHero
                                };

                                return blizzardObj;

                            });
                    });
        }

        function searchUser(battleTag) {
            var fixedBattleTag = parseBattleTag(battleTag);

            var reqUrl = "https://owapi.net/api/v3/u/" + fixedBattleTag + "/stats?format=json_pretty";
            return $http.get(reqUrl)
                .then(function (jsonStats) {
                var sreqUrl = "/api/parse/stats";
                    return $http.put(sreqUrl, jsonStats);
                });
        }

        function searchUserHeroes(battleTag) {
            var fixedBattleTag = parseBattleTag(battleTag);

            var reqUrl = "https://owapi.net/api/v3/u/" + fixedBattleTag + "/heroes?format=json_pretty";
            return $http.get(reqUrl)
                .then(function (jsonStatsHero) {
                    var sreqUrl = "/api/parse/statshero";
                    return $http.put(sreqUrl, jsonStatsHero);
                });
        }

        function getTemporaryResult(battleTag) {
            var blizzardObj = {
                battletag: battleTag,
                skillrating: "3670",
                tier: "Master",
                mostPlayedHero: "Genji",
                tierImageSource: "http://overlog.gg/img/rankIcon/Master.png",
                heroPortraitSource: "ohi-genji"
            };
        }
    }

})();
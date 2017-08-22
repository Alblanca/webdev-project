/**
 * Created by ani on 8/21/17.
 */
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
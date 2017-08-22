/**
 * Created by ani on 8/21/17.
 */
var app = require("../express");
app.put("/api/parse/stats", parseStatsJson);
app.put("/api/parse/statshero", parseHeroJson);


function parseStatsJson(req, res) {
    var jsonData = req.body;

    var SR = jsonData.data.us.stats.competitive.overall_stats.comprank;
    var compRank = jsonData.data.us.stats.competitive.overall_stats.tier;

    return { skillrating : SR, tier : compRank}

}

function parseHeroJson(req, res) {
    var jsonData = req.body;

    var heroPlaytimes = jsonData.data.us.heroes.playtime.quickplay;

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

    var mostPlayed = maxProp;

    return { mostPlayedHero : mostPlayed }
}
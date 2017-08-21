/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("playerSearchController", playerSearchController);

    function playerSearchController($location, testService, $rootScope) {
        var model = this;
        model.login = login;
        model.searchUser = searchUser;
        model.searchUserHeroes = searchUserHeroes;

        function init() {

        }
        init();

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
                .searchUser(apiText)
                .then(function (res) {
                    var playa = JSON.stringify(res.data, null, 2);
                    model.searchData = playa;

                    model.SR = res.data.us.stats.competitive.overall_stats.comprank;
                    model.compRank = res.data.us.stats.competitive.overall_stats.tier;


                });
        }

        function login(user) {
            userService.findUserByUsernameAndPassword(user.username, user.password)
                .then(function (_user) {
                    if (_user === null) {
                        model.errorMessage = "User not found";
                    } else {
                        $rootScope.currentUser = _user;
                        $location.url("profile/" + _user._id);
                    }
                });
        }
    }
})();

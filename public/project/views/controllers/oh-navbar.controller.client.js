(function () {
    angular
        .module("OverHub")
        .controller("ohNavbarController", ohNavbarController);

    function ohNavbarController($window, $location, userService) {
        var model = this;

        model.logout = logout;
        model.savePost = savePost;
        model.findUserById = findUserById;

        function init() {
            userService
                .getCurrentUser()
                .then(function (response) {
                    model.currentUser = response.data;
                });
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $window.location.reload();
                });
        }

        function savePost(postId) {
            userService.savePost(postId, model.currentUser._id);
        }

        function findUserById(userId) {
            return userService.findUserById(userId);
        }

    }
})();
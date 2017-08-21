(function () {
    angular
        .module("OverHub")
        .controller("ohNavbarController", ohNavbarController);

    function ohNavbarController($routeParams, $window, $location, userService, boardService) {
        var model = this;
        var boardId = $routeParams["boardId"];

        model.logout = logout;
        model.savePost = savePost;
        model.findUserById = findUserById;

        function init() {
            userService
                .getCurrentUser()
                .then(function (response) {
                    model.currentUser = response.data;
                    model.isAdmin = (model.currentUser.role === 'ADMIN');
                });

            boardService
                .findAllBoards()
                .then(function (response) {
                    model.boards = response;
                    model.currentBoard = boardId
                        ? model.boards.find(x => x._id === boardId).name
                        : "Boards";
                });
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/");
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
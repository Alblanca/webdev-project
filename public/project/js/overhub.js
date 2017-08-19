(function () {
    //$('#loginRegisterModal').modal('show');

    // $scope.loadTags = function(query) {
    //     // An arrays of strings here will also be converted into an
    //     // array of objects
    //     return $http.get('tags.json');
    // };

    var tagPopoverContent = "<div><a href='google.com'>#google</a>, " +
        "<a href='facebook.com'>#facebook</a>, <a href='blizzard.com'>blizzard</a>, " +
        "<a href='blizzard.com'>#overwatch</a></div>";

    $(document).ready(function(){
        $('#tags-badge').popover({
            placement: 'left',
            animation: true,
            html: true,
            content:tagPopoverContent
        });
});

    // $().button(toggle);

    //$('.nav a[href="#Register"]').tab('show')


    // $(function () {
    //     $('[data-toggle="popover"]').popover()
    // });
    // $(function () {
    //     ('[data-toggle="tooltip"]').tooltip();
    // });
    // $('#tags-badge').tooltip({
    //     html: true,
    //     title: "hello",
    //     content: $('#popover-content').html(),
    //     placement: 'left'
    // });
})();

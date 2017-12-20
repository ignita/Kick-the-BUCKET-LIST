$(document).ready(function () {

    $(".card").each(function(index, elem) {
        var numCheck = $(this).find(".checkbox").length;
        
        $(this).find(".badge").text(numCheck);
    });
});

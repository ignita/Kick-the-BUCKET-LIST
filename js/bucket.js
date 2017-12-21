$(document).ready(function () {

    var $list, $newItemSubmit; 

    $('.card').each(function(index, elem) {
        var numCheck = $(this).find('.checkbox').length;
        
        $(this).find('.badge').text(numCheck);
    });

    $('.btn-add').on('click', function() {
        var text = $('input:text').val();
        $list = $(this).parent().siblings('.list-group');

        $list.append('<li class="list-group-item"><div class="checkbox checkbox-success"><input id="chk1_1" class="styled" type="checkbox"><label for="chk1_1">' + 'text' + '</label></div></li>');

    });

    var list_group = document.getElementsByClassName('.list-group');


});

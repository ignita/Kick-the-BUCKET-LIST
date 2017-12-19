// $(function () {

//         var $list, $newItemForm, $newItemButton;
//         var item = '';
//         $list = $('ul');
//         $newItemForm = $('#newItemForm');
//         $newItemButton = $('#newItemButton');

//         $('li').hide().each(function (index) {
//             $(this).delay(450 * index).fadeIn(1600);
//         });

//         // 아이템 개수
//         function updateCount() {
//             var items = $('li[class != complete]').length;
//             $('#counter').text(items);
//         }
//         updateCount();

//         // 새 아이템 폼 
//         $newItemButton.show();
//         $newItemForm.hide();
//         $('#showForm').on('click', function () {
//             $newItemButton.hide();
//             $newItemForm.show();
//         });

//         // 새 아이템 추가 
//         $newItemForm.on('submit', function (e) {
//             e.preventDefault();
//             var text = $('input:text').val();
//             $list.append('<li>' + text + '</li>');
//             $('input:text').val('');
//             updateCount();
//         });

//         $list.on('click', 'li', function () {
//             var $this = $(this);
//             var complete = $this.hasClass('complete');

//             if (complete === true) {
//                 $this.animate({
//                     opacity: 0.0,
//                     paddingLeft: '+=180'
//                 }, 500, 'swing', function () {
//                     $this.remove();
//                 });
//             } else {
//                 $this.attr('class', 'complete');
//                 // item = $this.text();
//                 // $this.remove();
//                 // $list
//                 //     .append('<li class=\"complete\">' + item + '</li>')
//                 //     .hide().fadeIn(300);
//                 // updateCount();
//             }
//         });

//     });

$(document).ready(function () {

    $('.card').on('click', function () {

        if ($(this).children('.back-facing').length !== 0) {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
            } else {
                $(this).removeClass('open');
                $(this).addClass('open');
            }
        }
    });

});
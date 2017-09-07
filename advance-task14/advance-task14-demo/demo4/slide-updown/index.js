
$('#outer-ct .tab').on('click', 'li', function () {
    var $$ = $(this)
    //获取.wrap的高度，避免写死代码造成之后修改css同时要修改js
    var contentHeight = $('#outer-ct .wrap').height()
    $$.addClass('active').siblings().removeClass('active')
    $$.parents('#outer-ct').find('.wrap .content')
        .animate({ top: -contentHeight * ($$.index()) })
})











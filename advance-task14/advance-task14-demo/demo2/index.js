$('#outer-ct .navbar').on('click', 'li', function () {
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
    
    var $$ = $(this).parents('#outer-ct').find('.panel')
    $$.removeClass('active')
    $$.eq($(this).index()).addClass('active')
})

//不用jquery写的话，在cover上添加一个display:none;，在css添加一个class选择器，将display设为block，再通过jquery将class绑定或者移除，同样可以实现效果，方法有多种，以下最简洁。
$('#outer-ct>.panel-ct>.panel>.main>.section>.cover').hide();
$('#outer-ct>.panel-ct>.panel>.main>.section').on('mouseenter mouseleave', function () {
    $(this).find('.cover').toggle()
})







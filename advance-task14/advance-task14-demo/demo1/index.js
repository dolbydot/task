$('#nav-sidebar>li').on('mouseenter', function () {
    $(this).find('.second-menu').addClass('hover')
}).on('mouseleave', function () {
    $(this).find('.second-menu').removeClass('hover')
})
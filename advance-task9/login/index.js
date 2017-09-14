
var modal = $('.modal'),
    loginHref = $('.loginHref'),
    registerHref = $('.registerHref'),
    modalCt = $('.modal-ct');

//modal状态切换
$('.icon-login').on('click', function () {
    modal.show()
})
$('.modal').on('click', '.close', function () {
    modal.hide()
})
$('main').on('click', function () {
    modal.hide()
})
$('.modal').on('click', function (e) {
    e.stopPropagation()//阻止事件传播——防止点击modal本身时隐藏
})


//点击登录框时给最外层容器加上一个类login并删除类register
loginHref.on('click', function () {
    modalCt.addClass('login').removeClass('register')
})
//点击注册框时给最外层容器加上一个类register并删除类login
registerHref.on('click', function () {
    modalCt.addClass('register').removeClass('login')
})

//表单验证
$('.modal-login form').submit(function (e) {
    //阻止表单自动提交
    e.preventDefault()
    if (!/^\w{3,8}$/.test($('.modal-login [name="username"]').val())) {
        $('.modal-login .errormsg').text('请输入3至8个字符组成的用户名，包括字母数字下划线')
        return false
    }
    if (!/^\w{6,16}$/.test($('.modal-login [name="password"]').val())) {
        $('.modal-login .errormsg').text('请输入6至16个字符组成的密码，包括字母数字下划线')
        return false
    }
    //手动提交
    this.submit()
})

$('.modal-register form').submit(function (e) {
    e.preventDefault()
    if (!/^\w{3,8}$/.test($('.modal-register [name="username"]').val())) {
        $('.modal-register .errormsg').text('请输入3至8个字符组成的用户名，包括字母数字下划线')
        return false
    }
    if (/^dot$|^dolby^/.test($('.modal-register [name="username"]').val())) {
        $('.modal-register .errormsg').text('用户名已存在')
        return false
    }
    if (!/^\w{6,16}$/.test($('.modal-register [name="password"]').val())) {
        $('.modal-register .errormsg').text('请输入6至16个字符组成的密码，包括字母数字下划线')
        return false
    }
    if ($('.modal-register [name="password"]').val() !== $('.modal-register [name="password2"]').val()) {
        $('.modal-register .errormsg').text('两次输入密码不一致，请重新输入')
        return false
    }
    this.submit()
})






var products = [
    {
        img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
        name: '珂兰 黄金手 猴哥款',
        price: '￥405.00'
    }, {
        img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
        name: '珂兰 黄金转运珠 猴哥款',
        price: '￥100.00'
    }, {
        img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
        name: '珂兰 黄金手链 3D猴哥款',
        price: '￥45.00'
    }
];

function addProd(products) {
    var html = ''
    html += '<li class="section">'
    html += '<img src="' + products.img + '" alt="">'
    html += '<p class="product-name">' + products.name + '</p>'
    html += '<p class="product-price">' + products.price + '</p>'
    html += '<div class="cover"><a href="" class="btn">立即抢购</a></div>'
    html += '</li>'
    return html
}

$('.loadMore').on('click', function (e) {
    e.preventDefault();
    $.each(products, function (index, prod) {
        var html = addProd(prod)
        $('.main').append(html)
    })
})

//事件代理，用添加class的法官法，避免了重复为新添加项绑定事件
$('.main').on('mouseenter', '.section', function (e) {
    $(this).find('.cover').addClass('hover')
}).on('mouseleave', '.section', function (e) {
    $(this).find('.cover').removeClass('hover')
})




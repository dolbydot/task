//不用jquery写的话，在cover上添加一个display:none;，在css添加一个class选择器，将display设为block，再通过jquery将class绑定或者移除，同样可以实现效果，方法有多种，以下最简洁。
$('#outer-ct>.main>.section>.cover').hide();
$('#outer-ct>.main>.section').on('mouseenter mouseleave', function () {
    $(this).find('.cover').toggle()
})

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

function addProd(prod) {
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







// //当用户打开页面时，我们要让他看到内容，而不是空白的占位图片，所以在滚动之前需要先判断一次
// $('img').each(function () {
//     //如果图片出现在可视窗口且没有被加载过就加载它
//     if (checkShow($(this)) && !isLoaded($(this))) {
//         loadImg($(this))
//     }
// })

// //核心思想
// $(window).on('scroll', function () {
//     $('img').each(function () {
//         //如果图片出现在可视窗口且没有被加载过就加载它
//         if (checkShow($(this)) && !isLoaded($(this))) {
//             loadImg($(this))
//         }
//     })
// })

//1-然后我们发现代码有所重复，所以需要做一些改进，创建一个lazyRander函数将重复的代码包裹起来，并且在用户打开页面时就调用一次这个函数
lazyRender()
var clock

function lazyRender() {
    //核心思想
    $('img').each(function () {
        //如果图片出现在可视窗口且没有被加载过就加载它
        if (checkShow($(this)) && !isLoaded($(this))) {
            loadImg($(this))
        }
    })
}

//2-再来做滚动时需要呈现的效果
$(window).on('scroll', function () {
    if (clock) {
        clearTimeout(clock)//5-优化定时器以达到优化滚动事件的目的，当用户滚动一次鼠标滚轮，假设触发了4次scroll事件，第一次触发时判断clock是否存在，不存在则什么都不做，存在clock则延时500毫秒调用lazyRender函数；如果500毫秒以内用户又触发了滚动事件，此时clock是存在的，就会执行clearTimeout取消掉当前的clock，接着重新设置一个新的clock，如果500毫秒內又触发了滚动事件，则又删除当前clock并设置新的clock，如此循环。当最后一次触发滚动事件，取消了当前clock并设置了新的clock，新的clock不会被取消，相当于用户手停之后500毫秒再去执行lazyRender函数，我们的终极目标是函数节流。
    }
    clock = setTimeout(function () {
        lazyRender()//4-定义一个定时器并赋值给变量clock,即在滚动事件发生后，过500毫秒调用lazyRender函数，还可继续优化定时器。
    }, 500)

})

//3-然而上面的滚动效果会带来性能问题，可以看作每滚动一个像素，核心代码就要做一次判断，这意味着所有的代码都要执行一次，导致的结果是，轻轻滚动鼠标代码就会执行很多次。
//基于以上原因，我们可以设置一个定时器，在满足用户需求的情况下，来减少代码执行的次数以提高页面性能

function checkShow($img) {
    var scrollTop = $(window).scrollTop(),
        windowHeight = $(window).height(),
        offsetTop = $img.offset().top;
    if (offsetTop < scrollTop + windowHeight && offsetTop + $img.height() > scrollTop) {
        return true
    }
    return false
}

function isLoaded($img) {
    return $img.attr('data-src') === $img.attr('src')
}

function loadImg($img) {
    $img.attr('src', $img.attr('data-src'))
}
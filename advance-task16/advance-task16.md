### 如何判断一个元素是否出现在窗口可视范围（浏览器的上边缘和下边缘之间，肉眼可视）。写一个函数 isVisible实现
为加深印象直接写出我测试的例子：
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="jquery.min.js"></script>
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            list-style: none;
        }

        li {
            background: aqua;
            height: 100px;
        }

        .middle {
            background: pink;
        }
    </style>
</head>

<body>
    <ul class="ct">
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
        <li>item 4</li>
        <li>item 5</li>
        <li>item 6</li>
        <li>item 7</li>
        <li>item 8</li>
        <li>item 9</li>
        <li>item 10</li>
        <li class="middle">hello world</li>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
        <li>item 4</li>
        <li>item 5</li>
        <li>item 6</li>
        <li>item 7</li>
        <li>item 8</li>
        <li>item 9</li>
        <li>item 10</li>

    </ul>
    <script>
        function isVisible($node) {
            var scrollTop = $(window).scrollTop();//滚动条卷曲高度
            var windowHeight = $(window).height();//可视内容区高度
            var offsetTop = $node.offset().top;//node偏移高度

            if (offsetTop < scrollTop + windowHeight && offsetTop + $node.height() > scrollTop) {
                console.log('true')
                console.log(scrollTop)
                console.log(windowHeight)
                console.log(offsetTop)
            } else {
                console.log('false')
            }
        }
        isVisible($('.middle'))
    </script>
</body>

</html>
```
分析过程：
先上一张画的很粗糙的图——

![大师兄所有，本图禁止转载！禁止转载！禁止转载！](http://upload-images.jianshu.io/upload_images/6851923-a523c4447718fb20.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 判断元素是否出现在浏览器的上边缘和下边缘之间，肉眼可视，首先要获取滚动条卷曲高度，可视内容区高度及node元素的偏移高度，先明白如何让node出现在我们肉眼所及之区域。
- 由上图可清晰看出，当`offsetTop = scrollTop + windowHeight`时，node刚好完全出于可视区下边缘之下，所以`offsetTop < scrollTop + windowHeight`可确保node出现在可视区及滚动条卷曲的区域之间，所以下一步是确保node不出现在滚动条卷曲的区域，即`offsetTop + $node.height() > scrollTop`，需要注意的是这里的计算都是以node左上角点为原点。
- 为什么要加上node自身的高度？因为当node出现在视野中，继续向下浏览页面，node会从视野上方消失，在完全消失之前，node对于肉眼来说仍是可见的，所以加上node的高度再去做计算，可以得到较为精确的结果。如果node高度值很大而你忽略了它，问题就会比较明显。

### 个人补充一题，如何判断一个元素是否滚动到了可视区域底部
与判断一个元素是否出现在窗口可视范围同理，直接看代码
```
$node = $('.middle');
var windowHeight = $(window).height();
var offsetTop = $node.offset().top;
$(window).on('scroll', function () {
    var scrollTop = $(window).scrollTop();//scrollTop是动态的，所以需要在函数內定义
    //我写的判断条件过于严苛，实际运用应该只用实现大致到了底部就好
    if ($node.height() + offsetTop - windowHeight-10 == scrollTop) {//一般将动态值放在运算符右边
        console.log('true')
    } else {
        console.log('false')
    }
})
```

![](http://upload-images.jianshu.io/upload_images/6851923-f8f5a4fe7422e137.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我写的判断条件过于严苛，所以较难捕获到true，实际运用应该只用实现大致到了底部就好

### 当窗口滚动时，判断一个元素是不是出现在窗口可视范围。每次出现都在控制台打印 true 。用代码实现
```
function isVisible($node) {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var offsetTop = $node.offset().top;

    if (offsetTop < scrollTop + windowHeight && offsetTop + $node.height() > scrollTop) {
        return true
    } else {
        return false
    }
}

//写法一
$(window).on('scroll', function () {
    if (isVisible($('.middle'))) {
        console.log(true)
    }
})

//写法二
$(function () {
    $(window).scroll(function () {
        if (isVisible($('.middle'))) {
            console.log(true)
        }
    })
})
```

### 当窗口滚动时，判断一个元素是不是出现在窗口可视范围。在元素第一次出现时在控制台打印 true，以后再次出现不做任何处理。用代码实现
```
function isVisible($node) {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var offsetTop = $node.offset().top;

    if (offsetTop < scrollTop + windowHeight && offsetTop + $node.height() > scrollTop) {
        return true
    } else {
        return false
    }
}

var isEleVisible = false
$(function () {
    $(window).scroll(function () {
        if (isVisible($('.middle')) && !isEleVisible) {
            console.log(true)
            isEleVisible = true
        }
    })
})
```

### 图片懒加载的原理是什么？
- 首先明白为什么要懒加载：
懒加载即延迟，对于图片过多的页面，为了加快页面加载速度，我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。
这样一来页面加载性能大幅提升，提高了用户体验。
- 实现原理：
    - 在页面载入时将img标签內的src指向一个小图片，即占位图，将真实地址存放于一个自定义属性data-src中，然后获取页面上的img标签并保存，开启一个定时器来遍历保存的img标签，接下来判断每个img是否出现在可视区，当某个img出现在了可视区域，就将真实地址赋值给该img的src并将该img从数组中删除以避免重复判断。
    - 我们需要判断元素是否出现在了可视区，以上第一题我做了详细解释，这里不重复说。
    - 实现流程：
当网页滚动事件被触发➡️执行加载图片操作➡️判断图片是否在可视区且是否已经加载过➡️在可视区且未被加载过则动态地将data-src的值赋给该图片的src属性。

### 实现视频中的图片懒加载效果
[我的实现](https://dolbydot.github.io/task/advance-task16/imgsLazyload/)

### （选做）实现如下 [新闻自动懒加载效果84](http://47.91.156.35:3001/auto-news.html) （这里是[参考代码](http://js.jirengu.com/nihi/1/edit?html,js,output)， 其中html里的为前端代码， js 里的内容为 router.js里的后端代码， 也可参考[往前班级视频264](http://jirengu.com/app/watch/1235/1?vsum=75))

mark一下之后再补充这个选做题

-----

**参考资料**：
- [*[jQuery 图片懒加载原理](https://segmentfault.com/a/1190000000437578)*](https://segmentfault.com/a/1190000000437578)
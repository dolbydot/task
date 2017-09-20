//获取数据
//把数据变为DOM，通过瀑布流的方式呈现在页面上
//当滚动到底部时重复以上操作

var curPage = 1
perPageCount = 10
colSumHeight = []
nodeWidth = $('.item').outerWidth(true)
colNum = parseInt($('#pic-ct').width() / nodeWidth)

for (var i = 0; i < colNum.length; i++) {
    colSumHeight[i] = 0
}

var isDataArrive = true
start()

function start() {
    getData(function (newList) {//1首先获取数据，异步的过程，不适合用函数声明
        console.log(newList)
        isDataArrive=true
        $.each(newList, function (idx, news) {//一条条获取信息
            var $node = getNode(newList)//将数据变为DOM方式放在页面上
            $node.find('img').load(function () {
                $('#pic-ct').append($node)
                console.log($node, 'loaded...')
                waterFallPlace($node)//将DOM通过瀑布流的方式放在页面上
            })//图片预加载：图片无需放到页面上也可以加载，需要时可直接出现
        })
        isDataArrive = false
    })
}

$(window).scroll(function () {//窗口滚动，判断#load是否出现，以此作为懒加载的触发时机
    if (!isDataArrive) return
    if (isVisible($('#load'))) {
        start()
    }
})

function getData(callback) {
    $.ajax({
        url: 'http://platform.sina.com.cn/slide/album_tech',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        data: {
            app_key: '1271687855',
            num: perPageCount,//一次要多少数据
            page: curPage//当前是第几页
        }
    }).done(function (ret) {
        if (ret && ret.status && ret.status.code === '0') {
            callback(ret.data)//如果数据没有问题，那么生成节点并摆放好位置
            curPage++
        } else {
            console.log('get error data')
        }
    })

}

function getNode(item) {
    var tpl = ''
    tpl += '<li class="item">'
    tpl += '<a href="' + item.url + '" class="link"><img src="' + item.img_url + '"alt=""></a>'
    tpl += '<h4 class="header">' + item.short_name + '</h4>'
    tpl += '<p class="desp">' + item.short_intro + '</p>'
    tpl += '</li>'
    return $(tpl)//创建jquery对象
}

function waterFallPlace($node) {
    // $node.each(function () {
        var idx = 0
        minSumHeight = colSumHeight[0]
        for (var i = 0; i < colSumHeight.length; i++) {
            if (colSumHeight[i] < minSumHeight) {//找到数组最小值并获取下标
                idx = i
                minSumHeight = colSumHeight[i]
            }//找到上一排中高度最小的列
        }

        $node.css({
            left: nodeWidth * idx,
            top: minSumHeight,
            opacity: 1
        })

        colSumHeight[idx] = $node.outerHeight(true) + colSumHeight[idx]
        $('#pic-ct').height(Math.max.apply(null, colSumHeight))
        //li都是绝对定位脱离文档流不能撑开服容器，使#load不可见可撑开父容器
    // })
}

function isVisible($el) {
    var scrollH = $(window).scrollTop()//滚动条卷曲高度
    winH = $(window).height()//窗口可视高度
    top = $el.offset().top//元素偏移高度

    if (top < scrollH + winH) {
        return true
    } else {
        return false
    }
}



























var waterFall = (function () {
    function init() {
        waterfall()//首次打开页面自动按照窗口大小进行排列
        $(window).resize(function () {
            waterfall()//窗口发生变化时自动重排
        })
    }

    function waterfall() {
        var cloLength = parseInt($('.content').width() / $('.item').width())//几列
        var itemArr = []//首先定义一个空数组，项数为列数，初始化数组中的每一项值为0
        for (var i = 0; i < cloLength; i++) {
            itemArr[i] = 0
        }

        $('.item').each(function () {//遍历每一个子div
            var minVal = Math.min.apply(null, itemArr)//得到数组中的最小值，即第一排div按照写的顺序排列
            var minIdx = itemArr.indexOf(minVal)//得到最小值的索引（下标）
            //对每一个子div执行以下操作
            $(this).css({
                //第一排的每一项top:0
                top: itemArr[minIdx],
                //第一排依次left:outerWidth(true)*0，left:outerWidth(true)*1,(包括padding，border，margin),left:outerWidth(true)*2,直到第一排末尾left:outerWidth(true)*(cloLength-1)
                left: $(this).outerWidth(true) * minIdx
            })
            //此时第二排开始增加元素，即按列增加，列的高度发生了变化，找到高度最小项的索引，并在该索引项下增加outerHeight(true),接着在剩余索引中找到高度最小项，再增加下一元素
            itemArr[minIdx] += $(this).outerHeight(true)
        })
    }

    return {
        init: init
    }
    //以上排列的项是按在代码中出现的顺序进行增加的，但增加的位置是按照前一排中最小值的索引来计算的。
    //通俗来说，我按顺序依次渲染到页面，但它不一定按从左到右依次排列。
})()

waterFall.init()




//实现tab对应content功能
$('#outer-ct .tab').on('click','li',function(){
    var $$=$(this)
    //让当前点击的元素显示样式，并隐藏它的邻居的样式
    $$.addClass('active').siblings().removeClass('active')
    //显示与tab当前的index对应的元素，隐藏其他邻居元素
    var $$$=$$.parents('#outer-ct').find('.content>li')
    $$$.eq($$.index()).addClass('active').siblings().removeClass('active')   
})
//如果只想实现tab效果，代码到此为止⬆









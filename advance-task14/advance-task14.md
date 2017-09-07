###  jQuery 能做什么？
首先要明白jQuery是一个JavaScript函数库，它极大地简化了JavaScript编程。
jQuery库包含以下特性，也就是jQuery的用途：
- HTML元素选取
- HTML元素的操作：取值和赋值、移动、复制、删除和创建等
- CSS操作
- 事件操作
- 特殊效果，如JavaScript 特效和动画
- HTML DOM 遍历和修改
- 工具方法
- AJAX
- Utilities

### jQuery 对象和 DOM 原生对象有什么区别？如何转化？
1. 联系：
    - jQuery对象可以通过jQuery包装DOM对象后产生
    - DOM对象也可以通过jQuery按索引取得

2. 区别：
    - jQuery 对象和 DOM 原生对象是两个完全不同的对象类型，两者不等价
    - jQuery 对象和 DOM 原生对象都有各自的方法且不能使用对方的任何方法。

3. 转化：
- DOM对象转成jQuery对象：用 $() 把DOM对象包装起来就可得到jQuery对象

![](http://upload-images.jianshu.io/upload_images/6851923-0d2beaa255b73d44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 - jQuery对象转成DOM对象：两种转换方式——类数组下标和get方法
    - 类数组下标的 [index] 的方法
    - get(index) 方法，get()不写参数会把所有对象转为DOM对象返回

![](http://upload-images.jianshu.io/upload_images/6851923-553e58b6849d22cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  ### jQuery中如何绑定事件？bind、unbind、delegate、live、on、off都有什么作用？推荐使用哪种？使用on绑定事件使用事件代理的写法？
- jQuery中用on方法绑定事件，用off方法卸载事件。
- bind、unbind、delegate、live都是jQuery1.7之前的方法，现已废弃，被on和off代替。
    - bind和on都用于绑定事件
    - unbind和off都用于卸载事件
    - delegate和on都可实现事件代理
    - live和bind绑定事件是一样的，但live方法会绑定相应的事件到document元素上

- 推荐使用on方法绑定事件，off方法卸载事件
- 用on绑定事件使用事件代理的写法
```
.on( events [,selector ] [,data ], handler(eventObject) )
```
示例：添加一个事件处理函数
```
// 普通事件绑定，最简单的用法
$('div').on('click', function(e){
    console.log(this);
    console.log(e);
})

// 事件委托或者事件代理，想让div 下面所有的span绑定事件，可以把事件绑定到div上
$('div').on('click', 'span', function(e){
    console.log(this);
    console.log(e);
});

// 可以在绑定的时候给事件处理程序传递一些参数
$('div').on('click', {name: 'Byron', age: 24}, function(e){
    console.log(e.data);
});
```
- 用off解绑事件使用事件代理的写法
```
.off( events [, selector ] [, handler ] )
```
示例：移除一个事件处理函数
```
function aClick() {
  $("div").show().fadeOut("slow");
}

$("#bind").click(function () {
  $("body").on("click", "#theone", aClick)
    .find("#theone").text("Can Click!");
});

$("#unbind").click(function () {
  $("body").off("click", "#theone", aClick)
    .find("#theone").text("Does nothing...");
});
.trigger( eventType [, extraParameters ] )
```
- trigger，根据绑定到匹配元素的给定的事件类型执行所有的处理程序和行为
```
.trigger( eventType [, extraParameters ] )
```
示例：创建一个点击事件并自动执行它
```
$('#foo').on('click', function() {
  alert($(this).text());
});
$('#foo').trigger('click');
```

### jQuery 如何展示/隐藏元素？
- 通过设置css的display属性来实现
```
var $h1 = $('h1')
$h1.css('display', 'block')
$h1.css('display', 'none')
```
- 通过增加或删除class来实现
```
//css部分
.status{
    display: none;
}

//js部分
var $h1 = $('h1')
$h1.addClass('status') //隐藏元素
$h1.removeClass('status') //展示元素
```
- 通过jQuery动画的hide、show、toggle方法实现
```
var $h1 = $('h1')
$h1.hide()//隐藏
$h1.show()//展示
$h1.toggle()//隐藏
```
其中toggle方法用于切换元素的隐藏、显示。

### jQuery 动画如何使用？
首先看四个参数：
duration：动画持续多久
easing：表示过渡使用哪种缓动函数，jQuery自身提供"linear" 和 "swing"
complete：在动画完成时执行的函数
opacity：不透明度

- 基础用法：
    - 隐藏元素
`.hide([duration ] [,easing ] [,complete ])`
    - 显示元素
`.show( [duration ] [, easing ] [, complete ])`
    - 切换元素
`.toggle( [duration ] [, easing ] [, complete ] )`
- 渐变
    - 淡入显示
`.fadeIn( [duration ] [, easing ] [, complete ] )`
    - 淡出隐藏
`.fadeOut( [duration ] [, easing ] [, complete ] )`
    - 调整匹配元素的透明度，方法通过匹配元素的不透明度做动画效果
`.fadeTo( duration, opacity [, easing ] [, complete ] )`
    - 调整匹配的元素的不透明度动画来显示或隐藏它们，方法执行匹配元素的不透明度动画。当被可见元素调用时，元素不透明度一旦达到0，display样式属性设置为none ，元素不再影响页面的布局。
`.fadeToggle( [duration ] [, easing ] [, complete ] )`
- 滑动
    - 滑动显示，方法将给匹配元素的高度的动画，这会导致页面的下面部分滑下去，弥补了显示的方式
`.slideDown( [duration ] [, easing ] [, complete ] )`
    - 滑动隐藏，方法将给匹配元素的高度的动画，这会导致页面的下面部分滑上去，当一个隐藏动画后，高度值达到0时，display 样式属性被设置为none，该元素不再影响页面布局。 
`.slideUp( [duration ] [, easing ] [, complete ] )`
    - 用滑动动画显示或隐藏一个匹配元素，方法将给匹配元素的高度的动画，这会导致页面中，在这个元素下面的内容往下或往上滑。display属性值保存在jQuery的数据缓存中，所以display可以方便以后可以恢复到其初始值。
如果一个元素的display属性值为inline，然后是隐藏和显示，这个元素将再次显示inline。当一个隐藏动画后，高度值达到0的时候，display 样式属性被设置为none，以确保该元素不再影响页面布局。
`.slideToggle( [duration ] [, easing ] [, complete ] )`
- 自定义
    - properties是一个CSS属性和值的对象,动画将根据这组对象移动。
`.animate( properties [, duration ] [, easing ] [, complete ] )`
    - options是一组包含动画选项的值的集合。
`.animate( properties, options )`
    - 当一个元素调用.stop()，当前正在运行的动画（如果有的话）立即停止。
`.stop( [clearQueue ] [, jumpToEnd ] )`

### 如何设置和获取元素内部 HTML 内容？如何设置和获取元素内部文本？
- 用html方法获取/修改元素的innerHTML
    - 没有传递参数时直接返回元素的innerHTML
`$('div').html()`
    - 传递了一个string参数时修改元素的innerHTML为参数值
`$('div').html('hello world')`
- 用text方法获取/修改元素的innerText
     - 没有传递参数时直接返回元素的innerText
`$('div').text()`
    - 传递了一个string参数时修改元素的innerText为参数值
`$('div').text('hello world')`

这种读写两用的方法很多，原理都类似
1. 如果结果是多个进行赋值操作的时候会给每个结果都赋值
2. 如果结果多个，获取值的时候，返回结果集中的第一个对象的相应值

### 如何设置和获取表单用户输入或者选择的内容？如何设置和获取元素属性？
- 用val方法设置和获取表单用户输入或者选择的内容
也是一个读写双用的方法，用来处理input的value，当方法没有参数的时候返回input的value值，当传递了一个参数的时候，方法修改input的value值为参数值
```
$('input').val()//获取用户输入或选择的内容
$('input').val('newValue');//设置用户输入或选择的内容
```
- 用attr和prop方法来设置和获取元素属性
```
$('div').attr()//获取元素属性
$('div').prop()//获取元素属性
$('div').attr('color','red')//设置元素属性
$('div').prop({
  background: "yellow",
  font-size: "3em"
})//设置元素属性
```
其中：attr多用于html原有属性，prop多用于自定义属性。

### 使用 jQuery实现如下效果![](http://upload-images.jianshu.io/upload_images/6851923-6a8c417efa2effb6.gif?imageMogr2/auto-orient/strip)

[*我的实现1*](https://dolbydot.github.io/task/advance-task14/advance-task14-demo/demo1/)

### 使用 jQuery 实现如下效果
![](http://upload-images.jianshu.io/upload_images/6851923-0f319edbd43b3698.gif?imageMogr2/auto-orient/strip)

[*我的实现2*](https://dolbydot.github.io/task/advance-task14/advance-task14-demo/demo2/)

### 实现如下效果
![](http://upload-images.jianshu.io/upload_images/6851923-27cc8d21981cf5c1.gif?imageMogr2/auto-orient/strip)
Ps:当点击按钮时使用如下数据
```
var products = [
	{
		img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
		name: '珂兰 黄金手 猴哥款',
		price: '￥405.00'
	},{
		img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
		name: '珂兰 黄金转运珠 猴哥款',
		price: '￥100.00'
	},{
		img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
		name: '珂兰 黄金手链 3D猴哥款',
		price: '￥45.00'
	}
];
```

[*我的实现3*](https://dolbydot.github.io/task/advance-task14/advance-task14-demo/demo3/)

### 模仿视频6，完成 **左右**切换的 Tab 效果

[*我的实现4*](https://dolbydot.github.io/task/advance-task14/advance-task14-demo/demo4/slide-updown/)

-----

**参考资料**
- [*[javascript 原生Dom对象和jQuery对象的联系和区别](http://zl378837964.iteye.com/blog/2327825)*](http://zl378837964.iteye.com/blog/2327825)
- [*jQuery动画*](http://book.jirengu.com/fe/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80/JQuery/%E5%8A%A8%E7%94%BB.html)
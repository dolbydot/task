### 下面的代码输出多少？修改代码让 `fnArr[i]()` 输出 i。使用 两种以上的方法
```   
 var fnArr = [];
    for (var i = 0; i < 10; i ++) {
        fnArr[i] =  function(){
    	    return i;
        };
    }
    console.log( fnArr[3]() );  //10
```
方法一：创建函数形成独立的作用域
```
var fnArr = [];
for (var i = 0; i < 10; i++) {
    var temp = function (i) {
        fnArr[i] = function () {
            return i;
        }
    }
    temp(i);
}
console.log(fnArr[3]()); //3
```
方法二：立即执行函数
```
var fnArr = [];
for (var i = 0; i < 10; i++) {
    !function (i) {
        fnArr[i] = function () {
            return i;
        }
    }(i);
}
console.log(fnArr[3]());
```
方法三：函数return函数
```
var fnArr = [];
for (var i = 0; i < 10; i++) {
    fnArr[i] = function (i) {
        return function () {
            return i;
        }
    }(i);
}
console.log(fnArr[3]());
```
方法四：通过let创建块级作用域
```
var fnArr = [];
for (let i = 0; i < 10; i++) {
    fnArr[i] = function () {
        return i;
    };
}
console.log(fnArr[3]());
```

### 封装一个汽车对象，可以通过如下方式获取汽车状态
```
var Car = (function () {
    var speed = 0;
    function setSpeed(s) {
        speed = s
    }
    function getSpeed() {
        return speed
    }
    function accelerate() {
        speed += 10
    }
    function decelerate() {
        speed -= 10
    }
    function getStatus() {
        if (speed > 0) {
            return 'running'
        } else {
            return 'stop'
        }
    }

    return {
        setSpeed: setSpeed,
        getSpeed: getSpeed,
        accelerate: accelerate,
        decelerate: decelerate,
        getStatus: getStatus
    }
})()

Car.setSpeed(30);
Car.getSpeed(); //30
Car.accelerate();
Car.getSpeed(); //40;
Car.decelerate();
Car.decelerate();
Car.getSpeed(); //20
Car.getStatus(); // 'running';
Car.decelerate();
Car.decelerate();
Car.getStatus();  //'stop';
//Car.speed;  //error
```

### 下面这段代码输出结果是? 为什么?
```
var a = 1;
setTimeout(function () {
    a = 2;
    console.log(a);//最后打印2
}, 0);
var a;
console.log(a);//首先打印1
a = 3;
console.log(a);//接着打印3
```
首先提升一下变量，改写后代码如下：
```
var a
a = 1;

setTimeout(function () {
    a = 2;
    console.log(a);
}, 0);

console.log(a);

a = 3;
console.log(a);
```
结果：1,3,2
原因：异步延迟到同步代码执行结束后才允许执行
- 代码从上往下依次执行，首先全局中声明了一个变量a且赋值为1，接着读到setTimeout定时器，虽然设置延迟时间为0，但只要有定时器的存在，解析器都会首先去执行别的代码，全部执行完之后，如果时间到了，就去执行定时器中的代码，时间没到就继续等到时间到了再执行定时器中的代码。所以首先执行第二句console.log(a)，打印的是全局中a的值1，所以首先打印1
- 接着读到a=3，即给全局中的变量a赋值为3，打印3
- 以上代码执行完毕，就来处理定时器中的内容，延迟为0毫秒，所以从以上过程来看实际上这个延迟比0毫秒多，因为解析器先去做了别的事情，0毫秒在这里的意思即不需要等待，立即执行，所以执行第一个参数函数体中的内容，执行到a=2，而函数中没有声明变量a，所以向外层作用域，即全局中进行查找，在全局中找到了a，于是在函数作用域中将a赋值为2并打印出来，结果为2


### 下面这段代码输出结果是? 为什么?
```
var flag = true;
setTimeout(function(){
    flag = false;
},0)
while(flag){}
console.log(flag);
```
- 没有任何输出
- 因为setTimeout会在当前代码执行队列结束后执行，while循环结束后才会执行setTimeout中的函数，所以while循环的条件永远是true，会无限循环下去，而while中没有任何代码，所以打印flag没有任何输出

### 下面这段代码输出？如何输出delayer: 0, delayer:1...（使用闭包来实现）
```
for(var i=0;i<5;i++){
	setTimeout(function(){
         console.log('delayer:' + i );//delayer:5,delayer:5,delayer:5,delayer:5,delayer:5
	}, 0);
	console.log(i);//0,1,2,3,4
}
```
- 首先打印外层的console.log(i)得到输出依次为0，1，2，3，4
- 接着执行内层console.log('delayer:' + i)得到输出依次为delayer:5,delayer:5,delayer:5,delayer:5,delayer:5

闭包实现
```
for (var i = 0; i < 5; i++) {
    !function () {
        var j = i
        setTimeout(function () {
            console.log('delayer:' + j);
        }, 0);
    }()
}
```

### 如何获取元素的真实宽高
```
function getCss(curEle, attr) {
    return window.getComputedStyle ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
}
getCss(ele, 'width');
getCss(ele, 'height');
```

### URL 如何编码解码？为什么要编码？
URL只能使用ASCII字符集通过因特网进行发送，也就是说URL中只能包含英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号，这意味着如果URL中包含汉字就必须编码后使用。麻烦的是，RFC 1738没有规定具体的编码方法，而是交给应用程序（浏览器）自己决定。这导致"URL编码"成为了一个混乱的领域。
解决办法：使用一些具体的方法进行编解码。
- 两种编码方式
    - encodeURI()
    - encodeURIComponent()
- 两种解码方式
    - decodeURI()
    - decodeURIComponent()

其中，encodeURIComponent()与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。decodeURI()和decodeURIComponent()区别与上同理。


### 补全如下函数，判断用户的浏览器类型
```
function isAndroid() {
    return /android/i.test(navigator.userAgent)
}
funcnction isIphone(){
    return /iphone/i.test(navigator.userAgent)
}
function isIpad() {
    return /ipad/i.test(navigator.userAgent)
}
function isIOS() {
    return /iphone|ipad/i.test(navigator.userAgent)
}
```
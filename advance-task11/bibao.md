## 闭包

 1. 你不需要知道闭包，依然可以把js用得很溜
 2. 把基础搞清楚，闭包自然就理解了

----------

## 变量的生命周期
- 默认作用域消失时，内存就被回收（所以变量的生命周期就是作用域的生命周期）
```
<script>
    var a=1;
</script>
```
在script全局中声明一个var a=1，当代码执行到这一句时，a=1就出生了(在此之前因为变量声明提升所以a值为undefined，什么都不是)，当关闭浏览器页面或刷新页面时，a就死了，刷新后的a是一个新的a，一般来说js变量的生命周期不可能超过页面的生命周期。
所以全局环境下的变量的生命周期就是window窗口的生命周期
```
<script>
    function f1(){
        var a=1; //也就是在这一行a有值了
        return undefined;
    }
    //浏览器执行到这一行，页面中还不存在a
    f1() //在这一行之后，a就诞生了
    //f1()执行完了之后a就死了
    f1() //再次调用产生的是新的a
    //f1()执行完以后新的a也死掉
</script>
```
如果a在一个函数里，当你写完这个函数时页面中还不存在a这个变量，只有当执行了f1，且到了var a=1这一行之后，a=1才出生,之前是undedined，那么a什么时候死呢？
当a所在的环境不见了的时候a就死掉了
那么环境什么时候不见呢？
当执行完var a=1这一句之后return，如果没有return浏览器会默认return一个undefined，return执行后回到f1()，开始执行下一行，所在下一行的时候，a就死了（也就是说f1执行完以后a就死了），a所对应的内存就释放了可以给别人用。再调用一次f1时，产生的是一个新的a，执行完函数后新的a也会死。
所以函数中声明的变量一般来说就是函数执行的生命周期，函数开始执行，它就出生了，函数执行完了，它就死了。

- 如果变量被引用着内存则不能被回收
```
<script>
    function f1(){
        var a={name:'a'}; //也就是在这一行a有值了,常量a=1是一样的意思，这里用对象来举例
        var b=2;
        window.xxx=a;
        return undefined;
    }
    //浏览器执行到这一行，页面中还不存在a和b
    f1() //在这一行之后，a和b就诞生了
    //f1()执行完了之后b就死了,a为什么没有死，因为a在被别人引用。
    console.log(window.xxx); //{name:'a'},通过这种方法将a暴露出来，可以理解f1执行完之后变量a这个名字死了，但它的值和内存还在，函数执行完以后还可以访问到，那么内存什么时候释放呢？当引用它的window死了，它就死了。
    window.xxx={name:'b'} //如果window.xxx指向了别的东西，a已经没用了，a就可以死了，并不是覆盖，是把新的对象赋值给了xxx,是赋值，赋值，赋值。
</script>
```
----------


## var作用域
- 就近原则
```
<script>
    var a;
    function f1(){
        var a; 
        function f2(){
            a=1; //只看父级，a=1对应的时f1里的a
        }
        function f3(){
            var a;
        }
    }
</script>
```
```
<script>
    function f2(){}
    function f1(){
        function f2(){}
        f2() //执行的就是上面一行的f2，一层层往外查找。
    }
</script>
```
- 词法作用域
无论代码是否执行，只要看层级关系就能知道给变量a赋的值对应的是哪一个变量，这就是词法作用域。
```
<script>
    var a;
    function f1(){
        var a; 
        function f2(){
            var a;
            f3(); //执行f3，指的是全局中的a，因为函数最终结果与在哪执行无关，只与初始所在环境有关
            a=1; 
        }
    }
    function f3(){
        a=2;
    }
</script>
```
- 同名的不同变量
- 以上代码中f1()中的a和f2()中的a是不同的两个变量

----------

## 立即执行函数
当函数不被调用时，函数的内容解析器看都不会看（语法的错误会检查，逻辑错误不会被检查）

- 想得到一个独立的作用域，那么要声明一个函数
- 想运行代码，必须执行（调用）声明的函数

假设我们的目的是不要全局变量（函数也是变量），不要全局变量是因为实际工作中一个js代码由多个人编写，全局变量容易和别人的代码发生冲突。

```
//function f1(){
    //var a;
    //a=1;
    //console.log(a);
//} 注释掉的几行就是函数f1，将函数f1替换到下面，并且把函数名f1去掉
f1();
//改后如下
function(){
    var a;
    a=1;
    console.log(a);
}()
//这样修改的好处是：去掉了全局变量f1，声明了一个匿名函数立即执行
坏处：语法不对，报错
于是很多人放弃了这一写法，直到有一天有人不小心在function加了!,!的作用是对函数运行之后的结果求值，这个值并不重要，因为我们要的是作用域。
//再次修改，声明了一个函数并立即执行，创建了一个独立的作用域，！是为了不报错,除了!,-、+、~都可以，尽量不要括号，容易出问题。

//写法一
!function(){
    var a;
    a=1;
    console.log(a);
}()

//写法二
function f2(){
    var a;
    a=2;
    console.log(a);
}
f2();
```
写法一和写法二都是为了产生独立的作用域，避免发生代码冲突，我们就可以在定义的函数作用域内为所欲为地声明任何变量。
全局变量是邪恶的，永远不要用。
怎样避免写全局变量呢？
在ES6之前只有一种方法，就是利用函数里的局部变量，这就是立即执行函数的意义所在。
```
//写法1
function sss(p1,p2){}
//写法2
function sss(){
    var p1=arguments[0];//arguments[0]就是外面传进来的第一个参数
    var p2=arguments[1];//arguments[1]就是外面传进来的第二个参数
}
//写法一和写法二基本等价,都是在函数作用域内声明的p1和p2

//所以以下两种写法也是等价的
//写法三
!function(a){ 
    a=1;
    console.log(a);
}()

//写法四
!function(){
    var a=arguments[0]; //arguments就是外面传进来的参数(也就是函数花括号后面的小括号中传进来的参数，传进来啥呢？啥也没有)
    a=1;
    console.log(a);
}(/*没有传参*/)
//所以arguments是一个空的数组，所以先声明一个变量a初始化为undefined，接着给a赋值1
//如果在全局中声明一个a并赋值为100，改写代码：
var a=100;
!function(a){
    a=1; ️
    console.log(a); //
}()
console.log(a);//如果传递给function函数的参数a指的是全局中的a，那么全局中打印a得到的应该为1；如果传递给function函数的参数a指的是function形参中声明的a，那么全局中打印a得到的应该还是100，那么实际结果究竟是多少呢？
//结果：里面的a打印为1，外面的a打印为100
//结论：传递给function()的参数a是形参声明的变量，值就是传进去的第一个参数。

//什么是传进去的第一个参数呢？
var a=100
!function(a){
    console.log(a); //99，相当于var a=第一个传递进来的参数
}(99)
console.log(a); //100

//如果有多个参数呢？
var a=100;
!function(a,b){
    console.log(a,b); //99 "hello"，相当于var a=第一个传递进来的参数arguments[0]，var b=第二个传递进来的参数arguments[1]
}(99,'hello')
console.log(a);

//结论：传递给function的参数a，b是全新的a和b，属于函数的作用域内的变量，与外面无关。

//最关键的来了！
var a=100;
!function(a){//第一行的a
    console.log(a); 
}(a)//第二行的a
console.log(a);

//那么第一行的a和第二行的a是同一个a吗？
//当然不是！
//第一行的a是函数作用域内的a，第二行的a是全局作用域中的a，以上代码中，只是恰好在执行函数时把全局中的a赋值给函数中声明的a，这也印证了前面所说的，不同作用域中的同名变量是不同的。

//例子来印证
//例1
var a=100;
!function(a){
    console.log(a); //100,因为函数内只是定义了a但并没有给a赋值，所以会去找外层作用域中有没有变量a，找到了就返回外层作用域中a的值
}(a)
console.log(a); //100，全局作用域下a为100

//例2
var a=100;
!function(a){
var a=1;
    console.log(a); //1，函数的作用域中定义了a为1，所以打印a为1
}(a)
console.log(a); //100，全局中a为100
```

总结一下立即执行函数：
```
var a = 1;
function xxx(a){
    a = 2;
}
xxx(a);
console.log(a);
```
 结论：xxx是废话，删掉，删掉后就是匿名函数，接着语法报错，加个运算符，改写函数就成了立即执行函数。
 
 ----------

## 变量(声明)提升
- 浏览器在执行代码之前，会先把所有声明提升到作用域的顶部
- 你却从来都不知道去提升一下变量
- 只要你提升变量，面试题就是小case
```
function a(){};
var a=100;
console.log(a); //100
```
```
var a=100;
function a(){};
console.log(a); //100
```
```
console.log(a); //function a(){}
var a=100;
function a(){};
```
```
console.log(a);//undefined
var a=100;
console.log(a);//100
```
```
var a=100;
var a=function(){};
function a(){};
console.log(a);//function(){}

//提升改写以下更直观，一定要提升了再看代码，不然一定错，提升只会发生在当前作用域内
var a;
var a;
function a(){};
a=100;
a=function(){};
console.log(a);//function(){} 
```
然后很多时候想要提升却无从下手
```
var a=100;//(1)
f1();
function f1(){
    var b=2;
    if(b===1){
        var a;//(2)
    }
    a=99; //这里的a指的是第一个a还是第二个a？
}

//提升一下先
var a;
function f1(){
    var b;
    var a;//这里从if里直接提升到外面是因为js里没有块级作用域，只有函数作用域和全局的概念（后面会学到的let有块级作用域），所以if、while、for等流控制语句中的变量都会提升到包含它的函数活着全局中
    b=2;
    if(b===1){
    }
    a=99; //结论：当然是第二个a
}
a=100;
f1();
```

 ----------

## 时机(异步)
```
<body>
<button id="button">click me</button>
<script>
var button=document.querySelector('button');
button.onclick=function f(){
    console.log('A');//只有用户点击了button的情况下A才会被打印出来
}
console.log('B');//正常情况下B一定会被打印出来
//所以B一定在A前面被打印出来

//当用户点击按钮时，浏览器会执行函数f，把函数f挂载到onclick上，即button.onclick,onclick的执行时不确定的，所以当浏览器执行它时会手动执行button.onclick.call(target,event)这一句代码，这就是异步，先写的代码后执行，后写的代码先执行。
</script>
</body>
```

 ----------

## 面试题
```
<body>
    <ul>
        <li>选项1</li>
        <li>选项2</li>
        <li>选项3</li>
        <li>选项4</li>
        <li>选项5</li>
        <li>选项6</li>
    </ul>
    <script>
        var items = document.querySelectorAll('li');
        for (var i = 0; i < items.length; i++) {
            items[i].onclick = function () {
                console.log(i);
            }
        }
    </script>
</body>
```
改写一下代码～
```
<script>
    //获取页面上的所有li，items是一个伪数组
    var items;
    var i;
    items = document.querySelectorAll('li');
    for (i = 0; i < items.length; i++) {
        //i==0,1,2,3,4,5
        items[i].onclick = function () {
            console.log(i);//C
        }
    }
    //i==6
    console.log(i);//D
    //D处的i肯定会被打印，C处的i不一定被打印，只有用户点击时才会有打印值。不管有没有D处的代码，C处的代码都是后执行。
    //D处的i就是全局中的i，也就是for循环里提升出去的i，for循环开始执行后，过程为i=0，item[0].onclick=console.log(i),此时i还是一个变量，值是不确定的；i=1，item[1].onclick=console.log(i),此时i还是一个变量，值是不确定的；……依此类推到i=5，item[5].onclick=console.log(i),执行完循环之后，i=5，i++，D处打印结果为6，此时用户点击li元素，控制台打印C处的i，也就是全局中的i，值为6。
    //因为C处的肯定在D之后执行，而他们打印的都是全局中的i，所以点击的每一个li打印出的都是6
</script>
```
可是如果这不是你想要的结果，你希望的是点击页面上的6个li得到的是0，1，2，3，4，5而不是6个6，那么怎样做呢？
试着改写一下函数：
```
for (i = 0; i < items.length; i++) {
            //6次循环中，函数被创建了6次，这不是一个声明，而是一个赋值，6个函数就有6个j，每一个j都等于不同的值。i只有一个。
            var temp = function (j) {
                console.log(j);//0,1,2,3,4,5
                items[j].onclick = function () {
                    console.log(j);//用户点击对应的也是0,1,2,3,4,5
                }
            }
            temp(i);
        }
```
精髓是：以前是一个变量i贯穿整个6次循环，现在是每一次循环都是一个新的变量j，那么怎样得到一个新的变量呢？直接在for循环里声明var j肯定不行，因为变量j会被提升到全局作用域中，与i的效果相同,所以必须创建一个函数，这个函数就是一个新的作用域，就会有6个不同的j。

以上代码中出现了一个前面的知识点————立即执行函数，所以还可以改写一下
```
for (i = 0; i < items.length; i++) {
    !function (j) {
        items[j].onclick = function () {
            console.log(j);
        }
    }(i);
}
```
还有没有别的方法呢？有
```
for (i = 0; i < items.length; i++) {
    function temp(j) {
        return function () {
            console.log(j);
        }
    }
    var fn = temp(i);
    items[i].onclick = fn;
}
```
优化上述代码,j写为i（改写后的i与全局中的i不是同一个，只是同名而已），转成立即执行函数
```
for (i = 0; i < items.length; i++) {
    var fn = function (i) {
        return function () {
            console.log(i);
        }
    }(i);
    items[i].onclick = fn;
}
```
去掉变量fn,然后得到的就是回答这个面试题的标准答案
```
for (i = 0; i < items.length; i++) {
    items[i].onclick = function (i) {
        return function () {
            console.log(i);
        }
    }(i);
}
```

解释：因为用了闭包，所以出现了问题（闭包造成的），但这不是闭包的问题，是声明会提升的问题，所以声明一个新的作用域阻隔变量提升问题，解决办法是使用立即执行函数产生新的作用域。

-----
下面再上一个相似的面试题目
```
var arr = [];
    for (var i = 0; i < 6; i++) {
        arr[i] = function () {
            console.log(i);//6，因为i是贯穿全局的变量
    }
}
console.log(arr[3]());
```
改写一下
```
var arr = [];
    for (var i = 0; i < 6; i++) {
        arr[i] = function () {
            console.log(i);//这里没有异步，但fn执行前i已经是6了，所以打印6，因为i是贯穿全局的变量
    }
}
let fn=arr[3];
i===6;
fn();//去执行console.log(i),得到6
```
如果想要console.log(i)得到的是0，1，2……这种形式的，只需要创建一个作用域：
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
也可改成立即执行函数
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
函数return函数也可
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
最简单的，通过let创建块级作用域
```
var fnArr = [];
for (let i = 0; i < 10; i++) {
    fnArr[i] = function () {
        return i;
    };
}
console.log(fnArr[3]());
```

## 闭包
声明一个变量，在函数里去使用这个变量，外面声明的变量加上整个函数题就是一个闭包。如下所示
```
var local='变量';
function foo(){
    console.log(local)
}
```
知道什么是闭包没有任何意义，但和垃圾回收结合在一起就有意义了，
```
var fn=functino(){
    //b不会被引用，但b占用的内存也不会被回收，这就是内存泄漏，但不是闭包的错，是IE的锅
    var b={
        name:'b'
    }
    //以下就是闭包
    var a={
        name:'a'
    }
    
    return function(){
        return a
    }
}()
//
console.log(fn())
//谁也不能访问b了
```
面试官问闭包，其实就是问的立即执行函数，问题是闭包造成的，解决办法是立即执行函数，原理是创建新的作用域。
闭包有什么作用：暴露局部变量，虽然外面访问不到，但可以通过函数去间接得操作它。
立即执行函数专克闭包。
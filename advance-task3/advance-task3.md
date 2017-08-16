### 函数声明和函数表达式有什么区别
函数声明语法：`function functionName(arg0,arg1,arg2){ //函数体 }`
函数表达式语法：`var function = function(arg0,arg1,arg2){ //函数体 }`

区别：
使用function关键字可以声明一个函数，它的特征是函数声明提升，执行代码前会先读取函数声明，即函数声明不必放在调用的前面，它可以放在当前作用域任何位置；函数表达式在使用前必须先赋值，所以声明必须放在调用前面，不然浏览器解析代码时会认为函数还不存在而抛出错误，理解函数提升的关键就是理解函数声明与函数表达式之间的区别。
- 函数声明示例
```
//函数声明
function sayHi(){
  console.log('hi');
}
//函数调用
sayHi();
```
或者
```
//函数调用
sayHi();
//函数声明
function sayHi(){
  console.log('hi');
}
```
- 函数表达式示例
```
//函数声明
var sayHi = function(){
  console.log('Hi!');
};
//函数调用
sayHi();
```
以下是错误做法
```
//函数调用
sayHi();
//函数声明
var sayHi = function(){
  console.log('Hi!');
};
会抛出错误：函数还不存在
```

### 什么是变量的声明前置？什么是函数的声明前置
[变量声明前置与函数声明前置](http://www.jianshu.com/p/28bc5951b6d9)

### arguments 是什么？
arguments是一个类数组对象，除了length属性外没有任何数组属性，是所有函数中可用的局部变量，仅在函数内部有效。
- 可通过arguments对象来访问函数的参数列表，使用方括号语法访问参数列表的每一个元素，第一个条目的索引为0，即第一项为arguments[0]，第二项为arguments[1]，以此类推。
- 通过访问arguments对象的length属性可以确有多少个参数传递给了函数。
- arguments对象中的值可以被重写并会自动反映到对应的命名参数，所以值与对应命名参数的值保持同步。如果只传入了一个参数，那么为arguments[1]设置的值不会反映到命名参数中，因为arguments对象的长度由传入的参数个数决定，而不由定义函数时的命名参数的个数决定。
- 在严格模式下重写arguments的值会导致语法错误，代码不会执行。

使用场景：调用一个函数时，当这个函数的参数数量比它显式声明的参数数量更多时，就可以使用 arguments 对象。

### 函数的"重载"怎样实现
- 概念：函数重载指同一函数名对应着多个函数的实现。即每种实现对应一个函数体，这些函数名字相同，但参数类型或个数或顺序不同。
- 函数重载主要是为了解决两个问题：
    - 可变参数类型
    - 可变参数个数
    - 可变参数顺序
- 基本设计原则：当两个函数除了参数类型和参数个数不同以外其他功能完全相同时，利用函数重载；两个函数功能不同时不应使用重载，而应使用一个名字不同的函数。

js是弱类型语言，参数不是固定的某个类型，所以在js中没有重载，同名函数后面的会覆盖前面的。但我们也可以实现重载所需要的功能。
实现：
写一个函数，在函数体内针对不同的参数调用执行不同的逻辑。
```
function printPeopleInfo(name,age,sex){
	if(name){
		console.log(name);
	}
	if(age){
		console.log(age);
	}
	if(sex){
		console.log(sex);
	}
}
printPeopleInfo("dot",23);  //dot 23
printPeopleInfo("dot","female",23);  //dot female 23
```
```
function add(){
	var num=0;
	for(var i=0;i<arguments.length;i++){
		num+=arguments[i];
	}
	console.log(num);
}
add(1);  //1
add(1,2,3);  //6
```
注意：始终记住函数名只是一个指向函数对象的指针，并不会与某个函数绑定。

### 立即执行函数表达式是什么？有什么作用
- 立即执行函数表达式：
缩写IIFE，是一种利用javascript函数生成新作用域的编程方法，也叫自执行函数。
- 作用：
    - 令函数中声明的变量绕过js的变量置顶声明规则
    - 避免新的变量被解释成全局变量或函数名占用全局变量名的情况
    - 在禁止访问函数內变量声明的情况下允许外部对函数的调用
- 实现：因js里的()里不能包含语句，所以解析器会将()里的代码解析成function表达式并立即执行。
```
// 以下都能实现立即执行
(function(){ /* code */ }());
(function(){ /* code */ })();
```
```
// function前加一元运算符也可实现，advance-task2我有提到过
!function () { /* code */ } ();
~function () { /* code */ } ();
-function () { /* code */ } ();
+function () { /* code */ } ();
```

### 求n!，用递归来实现
- 方法一：
```
var factorial = (function f(n){
    if (n <= 0){
        return 1;
    } else {
        return n * f(n-1);
    }
});
factorial(5);  //120
```

- 方法二：
```
function factorial(n){
  if(n === 1) {
    return 1;
  }
  return n * factorial(n-1);
}
factorial(5);
```

### 以下代码输出什么？
```
function getInfo(name, age, sex) {
    console.log('name:', name);
    console.log('age:', age);
    console.log('sex:', sex);
    console.log(arguments);
    arguments[0] = 'valley';
    console.log('name', name);
}

getInfo('饥人谷', 2, '男');
getInfo('小谷', 3);
getInfo('男'); 
```
输出分别为：
```
name: 饥人谷
age: 2
sex: 男
["饥人谷",2,"男"]
name valley
```
```
name: 饥人谷
age: 3
sex: undefined
["小谷",3]
name valley
```
```
name: 男
age: undefined
sex: undefined
["男"]
name valley
```

### 写一个函数，返回参数的平方和
```
function sumOfSquares() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += Math.pow(arguments[i], 2);
    }
    return sum;
}
var result = sumOfSquares(2, 3, 4);
var result2 = sumOfSquares(1, 3);
console.log(result);  //29
console.log(result2);   //10
```

 ### 如下代码的输出是？为什么
```
	console.log(a);  //undefined，因为变量a声明提升并赋值为undefined，先读取变量声明
	var a = 1;
	console.log(b);  //抛出ReferenceError:b is not defined，因为b没有声明
```

### 如下代码的输出是？为什么
```
	sayName('world');
	sayAge(10);
	function sayName(name){
		console.log('hello ', name);  //hello world，因为sayName函数声明提升
	}
	var sayAge = function(age){
		console.log(age);  //抛出TypeError: sayAge is not a function，因为sayAge是函数表达式，使用前必须赋值，而声明放在了调用的后面，此时函数还不存在，所以会报错
	};
```

#### 扩充——执行环境与作用域
理解了这两个知识点才能做以下四题
##### 执行环境与环境对象：
为了保证指令的顺序，在运行时需要一个容器，把一系列函数、表达式、语句（统称为脚本）包起来。而脚本之间也具有相关性，实现一个功能所需要的脚本，又往往再构成一个集合。
比如一个汽车工厂，有一个子工厂专门生产螺钉。整个汽车工厂就是一个大容器，螺钉工厂就是一个小容器，其中生产螺帽的车间构成一个脚本集合，生产螺栓的车间构成一个脚本集合。
这样的一个集合就是脚本的执行环境，而一个脚本执行环境的直接容器就是其环境对象。
上例中，车间就是执行环境，螺钉工厂就是车间的环境对象。
可见执行环境、环境对象的概念是相对、有精度和角度的。
换个角度，螺丝工厂也是一个执行环境，汽车工厂也是螺丝工厂的环境对象。
在JS中，通常以对象作为环境对象，具体运行脚本的函数为执行环境。
如上所言，注意以下两点：
- 函数本身作为特殊的对象，换个角度也可以充当环境对象：

```
function a(){};
a.color = "red";
a.getColor = function(){
    console.log(this.color);    //red
    console.log(this);   //function a(){};
};
a.getColor();
```
- 由于函数的打包性，就像一个车间可以搬到不同的工厂，其环境对象就要看具体情况而言：
```
function a(){console.log(this.name)};
var object = {
    name: 'Amily'
}
var name = 'Shaw';
a();    //Shaw
a.apply(object);    //Amily
```
执行环境通过栈来保存，所以也叫环境栈，每当调用一个函数就向栈中推入该函数的执行环境，函数执行之后栈将其环境弹出，把控制权返回给之前的执行环境，栈底是全局执行环境。

##### 作用域链：
脚本执行时，肯定需要使用变量，但有些变量不是在该执行环境内定义的。此时需要一个机制，使得一个执行环境中的脚本能拿到另一个执行环境中的变量。这个机制必须有规矩，明确哪些变量能跨环境拿，哪些不能。这个机制就是作用域链。
作用域链由一连串的变量构成，这些变量不是杂乱无章的，而是根据自身所在的执行环境，由内层环境到外层环境，按顺序链下去的。考虑到有同级的执行环境，数据结构上更像一棵树。
内部环境可通过作用域链访问所有外部环境，但外部环境不能访问内部环境中的任何变量与函数，同级执行环境间没法直接访问对方的变量，除非 return 到下一链中，例如：
```
var a = function(){
    var name = 'Amily';
}
var b = function(){
    alert(name);    //undefined
}
```
通过try-catch语句和with语句可在作用域链前端临时添加变量对象，此时，同名变量以给定的变量对象中的变量优先。

注意：简单理解栈和作用域链，栈就像一个桶，window是最先推到栈底的，接着推入次外层变量对象，一直到最内层变量对象，即最内层在上，从作用域的角度来看，查找作用域就是在栈里从上往下查找的过程，全局执行环境的变量对象始终都是作用域链中的最后一个对象。
```
var color = "blue";
function changeColor(){
        var anotherColor = "red";
        function swapColors(){
                var tempColor = anotherColor;
                anotherColor = color;
                color = tempColor;
                // 这里可以访问color、anotherColor、tempColor
        }
        // 这里可以访问color、anotherColor
}
changeColor();
// 这里只能访问color
```
##### 变量作用域
变量作用域相对于某个具体变量而言，指能够通过作用域链拿到该变量的所有执行环境。
##### 垃圾收集
JS有自动垃圾收集机制，分别是标记清除和引用计数。
前者通过执行环境来标记，后者通过地址的引用次数来标记，两者都是在无法访问后，被作为垃圾清除。
在大型应用中，通常通过将无用的变量设置为 null 来进行手动垃圾清除。

明确了以上概念，再来看以下四题会容易很多～

### 如下代码输出什么? 写出作用域链查找过程伪代码
```
var x = 10;
bar() ;
function foo() {
  console.log(x);
}
function bar(){
  var x = 30;
  foo();
}
```
- 输出结果：10 undefined
- 查找过程：不会写查找过程伪代码但能理解。
    - 函数最终结果与在哪执行无关，只与初始所在环境有关，foo函数未执行时要得到x的值，首先在自身作用域中查找有无x变量，没有找到即向外层作用域，本例中为全局作用域中查找，注意同级函数间并不能访问对方的作用域这一点。继续刚才的步骤，foo在全局中找到了x，所以即使foo函数身处bar函数中，取得的也是全局作用域中x的值，也就是10.
    - undefined的出现可以理解为一个来自控制台的调戏～
细心的话会发现，写一个函数return的时候，控制台会出现最后一行变量或表达式的值，return表示不背锅，一切都是console.log自作主张打印的结果，忽略它就好，如果没有return一个函数，直接console.log一下，控制台也会多打一个undefined，因为函数没有return就会返回一个undefined，而这个undefined就会被控制台打印出来，注意这是个坑，所以以下都不写出undefined。

### 如下代码输出什么? 写出作用域链查找过程伪代码
```
var x = 10;
bar() ;
function bar(){
  var x = 30;
  function foo(){
    console.log(x) ;
  }
  foo();
}	
```
- 输出结果：30
- 查找过程：调用foo函数时，foo函数先在自身作用域中查找变量x，没有找到于是依次向外层查找，在bar函数中找到了x值为30，不再继续向外查找，控制台打印30。

### 以下代码输出什么? 写出作用域链的查找过程伪代码
```
var x = 10;
bar() 
function bar(){
  var x = 30;
  (function (){
    console.log(x)
  })()
}
```
- 输出结果：30
- 查找过程：函数bar里存在一个立即执行函数，立即执行函数在自身作用域没找到x变量于是继续向外层查找，找到x=30，打印30.

### 以下代码输出什么？ 写出作用域链查找过程伪代码
```
var a = 1;

function fn(){
  console.log(a) //(1)
  var a = 5
  console.log(a) //(2)
  a++
  var a
  fn3() //(3)
  fn2() //(4)
  console.log(a) //(5)

  function fn2(){
    console.log(a)
    a = 20
  }
}

function fn3(){
  console.log(a)
  a = 200
}

fn()
console.log(a) //(6)
```
- 输出结果：从上到下依次是undefined、5、1、6、20、200
- 查找过程：
    - 调用函数fn，进入fn的执行环境，var a变量声明前置并初始化a为undefined，所以(1)处打印undefined；
    - 给a赋值5，所以(2)处打印5；
    - 继续执行a++，得到a为6留到下次使用
    - 继续执行函数fn3()，进入fn3作用域，fn3内没有声明变量a于是向外层查找，而fn(3)所处作用域为全局作用域，无论它在哪执行，永远都是打印的全局变量1，所以(3)处打印1，继续向下读取a=200，fn3不存在函数嵌套的情况，里面的a也未被声明，所以a是一个全局变量，全局中声明了变量a，于是替换全局变量a的值1为200，所以(6)处打印200；
    - 接着调用fn2函数，进入fn2执行环境，没有找到变量a，于是向外层函数fn中查找，得到了上上一步中的值6，所以(4)处打印6，继续向下读取a=20，a未被声明于是会逐级向上查找变量a，在父函数fn中找到了变量a并赋值20，所以(5)处打印20。

分析：fn3改变了全局变量a的值，fn2改变了fn中局部变量a的值。

**注意**！！！

![mdn](http://upload-images.jianshu.io/upload_images/6851923-ef43cc4f1c502f41.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![阮一峰](http://upload-images.jianshu.io/upload_images/6851923-d0cb74a09659102b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

mdn和阮一峰的教程中指出，所有未声明的变量都是全局的。
**这句话不太准确，因为没有考虑到函数嵌套的情况**。

在未声明变量的情况下，子函数是可以引用父函数内的变量的，它从子函数向父函数一层层向上查找，一直找到全局作用域，找到了变量，就使用那个作用域所在的变量，如果一直没找到，就会在全局创建一个(非严格模式下)。

![你不知道的javascript(上)](http://upload-images.jianshu.io/upload_images/6851923-feafcf00da78a0b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**参考资料**:
- [*变量底层*](https://www.zybuluo.com/cxshaw/note/295245)
- [*var*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var)
- [*学习javascript闭包(Closure)*](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
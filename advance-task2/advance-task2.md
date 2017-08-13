### JavaScript 定义了几种数据类型? 哪些是原始类型?哪些是复杂类型?原始类型和复杂类型的区别是什么?
1. 六种数据类型，分别是Undefined,Null,Boolean,Number,String,Object，其中Object是复杂类型，其他五种都是简单类型，也称为原始类型。

- Undefined:  Undefined类型只有一个值，即特殊的undefined，在使用var声明变量但未对其初始化时这个变量的值就是undefined，引入这个值是为了区分空对象指针与未经初始化的变量。
- Null:Null也是只有一个值的数据类型，这个特殊的值是null，null表示空对象指针，这也正是使用typeof操作符检测null值时返回“object”的原因（其实这就是一个bug无疑）
- Boolean:使用得最多的一种类型，只有两个值true/false，true不一定为1，false也不一定为0，它执行的是Boolean转换，可以对任何数据类型的值调用Boolean()函数，而且总会返回一个Boolean值，具体返回什么值取决于转换值的数据类型及其实际值。
- Number:使用IEEE754格式来表示整点和浮点数值。
- String:由零或多个16位Unicode字符组成的字符序列，即字符串。字符串外包裹单引号和双引号都可以。
- Object:ECMAScript中的对象是一种数据与功能的集合，对象课通过执行new操作符后跟要创建的对象类型的名称来创建，而创建Object类型的实例并为其添加属性和／或方法就可以创建自定义对象。Object类型是所有它的实例的基础。

2. 区别
- 基本类型变量存的是值，复杂类型的变量存的是内存地址。
- 基本类型在赋值的时copy值，复杂类型在赋值的时候只copy地址，不copy值。

### typeof和instanceof的作用和区别?
1. 作用：
- typeof:检测给定变量的数据类型并返回字符串值，该字符串值用来说明运算数的数据类型。typeof是一个操作符而不是函数，通过typeof操作符来区分函数和其他对象是有必要的。
返回的值有：string、boolean、number、undefined、string、function。
- instance:判断某个引用类型的值具体是什么类型的对象，如果变量是给定的引用类型就返回true，反之返回false。
所有引用类型的值都是Object的实例，instanceof操作符检测引用类型的值和Object构造函数时始终返回true，检测基本类型的值时始终返回false。
2. 区别：
- typeof用于确定一个值是字符串、数值、布尔值还是undefined，也可用于判断function，但不能用来判断对象类型的值和null基本类型的值，因为都会返回Object。typeof也可用来判断变量是否存在。
- instanceof用来确定引用类型的值究竟是什么类型的对象，所以只能用来判断对象和函数。

### 如何判断一个变量是否是数字、字符串、布尔、函数
**用typeof操作符**。
示例：
```
var s = "dot";
var b = true;
var i = 22;
var u;
var f = function () {};

alert(typeof s);   //string
alert(typeof b);   //boolean
alert(typeof i);   //number
alert(typeof u);   //undefined
alert(typeof f);   //function
```

### NaN是什么? 有什么特别之处?
1. NaN即非数值（Not a Number），是一个特殊的数值，用于表示一个本来要返回数值的操作数未返回数值的情况（这样就不会抛出错误了）。在其他编程语言中，任何数值除以非数值都会导致错误从而停止代码执行，但在ECMAScript中，任何数值除以非数值会返回NaN，不会影响其他代码的执行。
2. 特别之处：
- 任何涉及NaN的操作（如NaN/10）都会返回NaN，这个特点在多步计算中可能导致问题。
- NaN与任何值都不相等，包括NaN本身。如`alert(NaN == NaN);   //false`

### 如何把非数值转化为数值?
3个函数可以实现转换：
Number()——可用于任何数据类型
parseInt(),parseFloat()——专用于把字符串转换成数值
```
var num1 = Number("hello world");  //NaN
var num2 = Number("");  //0
var num3 = Number("000011");  //11
var num4 = Number("true");  //1
var num5 = Number("0.0001");  //0.0001
var num6 = Number("1.0010");  //1.001


var num7 = parseInt("0xA");  //10,0x表示十六进制
var num8 = parseInt("0xf");  //15,0x后的字母不区分大小写
var num9 = parseInt("22.5");  //22 
var num10 = parseInt("70");  //70
var num11 = parseInt("1234blue");  //1234
var num12 = parseInt("");  //NaN
var num13 = parseInt("0xAF", 16);  //175,16代表十六进制解析
var num14 = parseInt("AF", 16);  //175,指定了16的字符串可以不加0x
var num15 = parseInt("AF");  //NaN
var num16 = parseInt("10", 2);  //2,为避免错误解析，应任何时候都明确指定基数
var num17 = parseInt("10", 8);  //8
var num18 = parseInt("10", 10);  //10
var num19 = parseInt("10", 16);  //16


var num20 = parseFloat("1234blue");  //1234
var num21 = parseFloat("0xA");  //0
var num22 = parseFloat("22.5");  //22.5
var num23 = parseFloat("22.34.5");  //22.34
var num24 = parseFloat("0908.5");  //0908.5
var num25 = parseFloat("3.125e7");  //31250000
```

### ==与===有什么区别
==表示相等操作符，先转换再比较，转换之后比较相等则返回true；===表示全等操作符，仅比较而不转换，未经转换就相等则返回true。
```
var result1 = ("55" == 55);  //true，转换后相等
var result2 = (null == undefined);  //true

var result3 = ("55" === 55);  //false，数据类型不同所以不相等
var result4 = (null === undefined);  //false
```

### break与continue有什么区别
break和continue语句用于在循环中精确控制代码的执行，其中break语句会立即退出循环，强制继续执行循环后面的语句；continue虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行并输出在此之前和之后所有的结果。

### void 0 和 undefined在使用场景上有什么区别
先说一下概念，void是个运算符，对后面给定的表达式求值并返回undefined，undefined是一个值。
undefined并不是保留字，它只是全局对象的一个属性，在低版本的IE中或是局部作用域中可能会被重写（这是有弊端的，所以在ES5之后window.undefined被定义为不可写、不可配置的属性）；但void 0返回的值一定是undefined并且不能被重写。其实void后面无论跟上什么表达式，如void 1，void (1+1)，void (0) 或者 void "hello"，void (new Date()) 等等，返回的都是undefined，能够完美替代undefined，至于为什么用void 0，是因为它最短，写起来也方便。
1. undefined使用场景：全局作用域。

2. void使用场景：局部作用域。
- 生成undefined
- 利用 void运算符让 JavaScript 引擎把一个函数识别成函数表达式而不是函数声明让函数立即执行。
通常情况下先声明函数再进行函数调用取得结果：
```
function dot(){
console.log(12);
}
dot();  //12 undefined
原因：12是打印出来的结果，函数没有return就会有undefined
```
用了void运算符之后，函数就被识别成一个立即执行的函数表达式（除了void，大多数运算符，如+，-等都有立即执行函数的作用，但可能会出现副作用）：
```
void function dot(){
console.log(12);
}()  //12 undefined
```
```
+ function dot(){
console.log(12);
}()  //12 NaN
原因：+undefined就会出现NaN
```
- 充当javascript:协议的URL生成undefined。
javascript:协议声明了 URL 的主体是任意的 javascript 代码，由 javascript 解释器编译执行，通常使用 javascript:URL 执行某些不改变当前页面文档的代码，要做到这一点，必须确保 URL 的最后一条语句没有返回值，比如使用 void 0。
对于网页中的点赞、收藏等按钮，如果使用 a 标签来实现的话，往往会用到 href="javascript:void(0)" 等类似的代码，这段代码的作用点击链接时让页面不跳转。在 href="javascript:void(0)" 中，使用了一个以 javascript: 协议开头的 URI，浏览器默认会对冒号后面的代码求值，然后将结果显示在新的页面，但有一种情况例外，如果结果是 undefined，浏览器就不会刷新页面渲染新值了。

###以下代码的输出结果是?为什么?
`console.log(1+1);`   //2 原因：1和1都是数值会做加法运算
`console.log("2"+"4");`  //"24" 原因：两个都是字符串会拼接
`console.log(2+"4");`   //"24" 原因：一个数值一个字符串，数值会被转化成字符串然后与另一字符串拼接
`console.log(+"4");`. //4 原因：在只有一个字符串参数时会尝试将其转换成数值

### 以下代码的输出结果是?
```
var a = 1;  
a+++a;  
typeof a+2;  //"number2" 
原因：a+++a等于3，typeof3返回"number"是一个字符串，字符串与数值做加法，数值会被转化成字符串然后与另一字符串拼接，得到"number2"
```

### 以下代码的输出结果是? 为什么
``` 
var a = 1;
var b = 3;
console.log( a+++b );  //4 
原因：++运算符优先级高于+，所以a+++b也可更改为a++(+b),a++结果仍为1，1+3=4
```
总结：
```
var a=1;
a+++a;  //3 
原因：a+++a=(a++)+a,a++仍为1，其后置递增的值留到下次使用，即后面的a值已经变为2，1+2=3
```
```
var a=3;
a+++a;  //7 
原因：与上同理，是3+4而不是4+3
```
前置操作符++a,--a，先运算后执行；后置操作符a++,a--，先执行后运算，执行后的值留到下一次使用
```
var a=20;
++a;  //21
```
```
var a=20;
--a;  //19
```
```
var b=20;
b++;  //20
b+b;  //42
```
```
var b=20;
b--;  //20
b+b;  //38
```

### 遍历数组，打印数组里每一项的平方
 ```
var arr=[3,4,5];
arr.forEach(function(item,index,array){
console.log(item*item);
});  //9 16 25
```
### 遍历 JSON, 打印里面的值
```
var obj = {
 name: 'hunger', 
 sex: 'male', 
 age: 28 
};
for(var a in obj){
  console.log(obj[a]);
}  //hunger male 28
```

### 以下代码输出结果是? 为什么 （选做题目）
```
var a = 1, b = 2, c = 3;
var val = typeof a + b || c >0
console.log(val);  //"number2"  原因：typeof优先级16，+优先级13，||优先级5，>号优先级11，所以先运算typeof a+b，得到"number2"字符串值，因为是非空字符串所以布尔属性值为true，逻辑或运算中，如果第一个操作数求值为true就不用对第二个操作数求值，所以结果直接返回"number2"字符串值。
```
```
var d = 5;
var data = d ==5 && console.log('bb')；
console.log(data);  //bb undefined undefined 
原因：=为赋值，优先级3，==等号优先级10，&&优先级6，所以先运算==，得到d==5，值为true，接着执行console.log打印出'bb',没有指明返回值所以返回undefined，接着做逻辑与运算，true&&undefined返回undefined并赋值给data，最后打印出data为undefined，所以最终结果是控制台打印出字符串bb和两个undefined。
```
```
var d = 5;
var data2 = d = 0 || console.log('haha');
console.log(data2);  //haha undefined undefined 
原因：||优先级最高，先执行第一个运算数0，即false，所以继续看第二个运算数，首先打印出haha字符串，返回undefined，接着false与undefined做逻辑或运算得到undefined（第一个运算数是false的话直接返回第二个运算数的值），将undefined赋值给d，将d赋值给data2，打印出data2位undefined，所以最终结果是控制台打印出字符串haha和两个undefined。
```
 ```
var x = !!"Hello" + (!"world", !!"from here!!");
console.log(x);  //
原因：圆括号优先级最高，逗号优先级最低，所以会先执行括号里的内容并返回表达式最后一项，!后跟非空字符串返回false，即!"world"返回false(这一项可忽略)，!!即同时使用两个逻辑非操作符，会模拟Boolean()转型函数的行为，第一个!返回一个布尔值，第二个逻辑非操作对该布尔值求反，即 !!"from here!!"和!!"Hello"结果都为true，所以`var x = !!"Hello" + (!"world", !!"from here!!");`可改写为`var x = true+true;`调用toString()方法取得相应字符串值并转换，得到`var x = 2;`,所以打印出x值为2，没有指明返回值则返回undefined。
```

**参考资料：**
- [*JS里基本类型(值)和复杂类型(引用)有什么区别?*](http://blog.jirengu.com/?p=308)
- [*运算符优先级*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
- [*json循环遍历方法*](https://www.w3cschool.cn/json/somu1pl8.html)
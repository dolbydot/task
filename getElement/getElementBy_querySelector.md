实际前端开发工作中，我们经常会遇到要获取某些元素，以达到更新该元素的样式、内容等目的。而文档对象模型 (DOM) 是HTML和XML文档的编程接口，它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。DOM 将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合，它会将web页面和脚本或程序语言连接起来。也因此，JavaScript可以通过DOM API获取元素节点，方法有如下几种：其中`querySelector()`和`querySelectorAll()`为ES5的元素选择方法

### 1、getElementById()：
接收一个参数：要取得的元素的ID(区分大小写，必须严格匹配)，返回一个Element对象（也可看作是动态NodeList集合，只是集合中只包含一个匹配的元素，但也会实时反映DOM节点的变化），若当前文档中拥有特定ID的元素不存在则返回nul。
语法：
```
element = document.getElementById(id);
```
示例：删除
```
<body>
    <div id="myDiv">
        <p class="myP">hello world</p>
        <p class="myP">hello dolby</p>
        <p class="myP">hello dot</p>
        <p class="myP">hello bean</p>
    </div>
    <script>
        var div = document.getElementById("myDiv");
        console.log(div); //(1)
        var body=document.querySelector('body');
        body.removeChild(div);
        console.log(body); //(2)
    </script>
</body>
```
```
//(1)处打印值
    <div id="myDiv">
        <p class="myP">hello world</p>
        <p class="myP">hello dolby</p>
        <p class="myP">hello dot</p>
        <p class="myP">hello bean</p>
    </div>

//(2)处打印值
<body>
    <script>
        var div = document.getElementById("myDiv");
        console.log(div); //(1)
        var body=document.querySelector('body');
        body.removeChild(div);
        console.log(body); //(2)
    </script>
</body>
```
示例：
```
<!DOCTYPE html>
<html>
<head>
  <title>getElementById example</title>
  <script>
  function changeColor(newColor) {
    var elem = document.getElementById("para1");
    elem.style.color = newColor;
  }
  </script>
</head>
<body>
  <p id="para1">Some text here</p>
  <button onclick="changeColor('blue');">blue</button>
  <button onclick="changeColor('red');">red</button>
</body>
</html>
```
getElementById()方法不会搜索不在文档中的元素。当创建一个元素且分配ID后，必须要使用insertBefore()或其他类似的方法把元素插入到文档中之后才能使用 getElementById() 获取到:
```
var element = document.createElement("div");
element.id = 'testqq';
var el = document.getElementById('testqq'); // el will be null!
```

### 2、getElementsByClassName()：
接收一个参数，即包含一个或多个类名的字符串（类名通过空格分隔），返回一个HTMLCollection动态集合（也可以说返回一个NodeList类数组对象），集合中包含以当前元素为根节点，所有指定 class 名的子元素。
语法：
```
var elements = document.getElementsByClassName(names); 
var elements = rootElement.getElementsByClassName(names);
```
getElementsByClassName 可以在任意的元素上调用，不仅仅是document。 调用这个方法的元素将作为本次查找的根元素。
示例：
- 获取所有 class 为 'test' 的元素:
```
document.getElementsByClassName('test');
```
- 获取所有 class 同时包括 'red' 和 'test' 的元素:
```
document.getElementsByClassName('red test');
```
- 在id 为'main'的元素的子节点中，获取所有class为'test'的元素:
```
document.getElementById('main').getElementsByClassName('test');
```
示例：删除
```
//html代码
<div class="myDiv">
        <p class="myP">hello world</p>
        <p class="myP">hello dolby</p>
        <p class="myP">hello dot</p>
        <p class="myP">hello bean</p>
    </div>
```
```
//js代码一
    <script>
        var div = document.getElementsByClassName("myDiv");
        console.log(div); //(3)
        var p = document.getElementsByClassName("myP");
        for (var i = 0; i < p.length; i++) {
            div[0].removeChild(p[i]);
        }
        console.log(p); //(4)
    </script>
```
```
//(3)处打印值
[div.myDiv] //一个动态的HTMLCollection集合，长度为1，innerHTML为<p class="myP">hello dolby</p>，<p class="myP">hello bean</p>，为什么没有其他两个p元素一会儿解释。

//(4)处打印值
[p.myP,p.myP] //一个动态的HTMLCollection集合，长度为2，innerHTML分别为"hello dolby"，"hello bean"。
```
以上用删除节点的方法验证了getElementsByClassName方法返回的是一个HTMLCollection动态集合。

⬆️以上代码中，首先div取得了页面中类名为"myDiv"的元素组成的动态集合，p取得了页面中类名为"myP"的元素组成的动态集合，接着用一个for循环来删除"myDiv"集合中第一项（即上例中唯一的div元素）中的"myP"集合中的每一项，结果只有第一项和第三项被删除了，这是为什么呢？
原因是动态集合中DOM结构的变化能够自动反映到所保存的对象中，最开始p.legth=4，当i=0时删除了页面中第一个p元素，此后p.length=3；i=1时删除了剩余的三个p中的项目索引为1的项，此后p.length=2；i=2时已不满足i<p.length这一条件，所以不会继续执行循环。至此只删除了页面上的第一和第三个p元素，所以打印p得到了一个长度为2的HTMLCollection动态集合，其中包含"hello dolby"和"hello bean"，p的变化也实时反映到了动态集合div中，所以才有(1)处的打印结果。

那么怎样才能遍历类数组对象HTMLCollection集合中的每一项并且删除所有项呢？
还是一个for循环搞定⬇️，每次删除对象集合中的最后一项就可以啦～
```
//js代码二
    <script>
        var div = document.getElementsByClassName("myDiv")[0];
        console.log(div); //(5)
        var p = document.getElementsByClassName("myP");
        for (var i=p.length;i--;){
            div.removeChild(p[i]);
        }
        console.log(p); //(6)
    </script>
```
```
//(5)处打印值
<div class="myDiv"></div>

//(6)处打印值
[] //空的HTMLCollection集合，长度为0
```

### 3、getElementsByTagName()：
接收一个参数：要取得的元素的标签名（不区分大小写），返回一个HTMLCollection动态集合（也可以说返回一个NodeList类数组对象）,集合中包含以当前元素为根节点（不包括当前元素自身），所有指定标签名的子元素，子元素的顺序是在当前元素的子树中出现的顺序，如果没有搜索到元素则集合为空。
语法：
```
elements = element.getElementsByTagName(tagName)
```
示例：
```
// check the alignment on a number of cells in a table. 
var table = document.getElementById("forecast-table"); 
var cells = table.getElementsByTagName("td"); 
for (var i = 0; i < cells.length; i++) { 
    var status = cells[i].getAttribute("data-status"); 
    if ( status == "open" ) { 
        // grab the data 
    }
}
```
示例：删除
```
<body>
    <div id="myDiv">
        <p class="myP">hello world</p>
        <p class="myP">hello dolby</p>
        <p class="myP">hello dot</p>
        <p class="myP">hello bean</p>
    </div>
    <script>
        var div = document.getElementById("myDiv");
        console.log(div); //(7)
        var p = document.getElementsByTagName("p");
//以下for循环改为for (var i=0,len=p.length;i<len;i++) {div.removeChild(p[0]);}也可；将集合p的长度赋值给变量len，这样len就是一个固定值，每次都删除当前集合项目索引为0的项，就可以循环遍历删除掉集合里的所有项。
        for (var i=p.length;i--;){
            div.removeChild(p[i]);
        }
        console.log(p); //(8)
    </script>
</body>
```
与getElementByClassName相同，返回动态集合，所以循环删除结果也相同
```
//(7)处打印值
<div id="myDiv"></div>

//(8)处打印值
[] //空的HTMLCollection集合，长度为0
```

### 4、getElementsByName()：
接收一个参数：带有给定name属性值的元素，返回一个动态NodeList类数组对象，对象中包含以当前元素为根节点，所有指定name属性值的子元素。最常用的场景是取得单选按钮。
示例：
```
<!DOCTYPE html>
<html lang="en">
<head>
 ...
</head>

<body>
<form name="up"><input type="text"></form>
<div name="down"><input type="text"></div>

<script>
var up_forms = document.getElementsByName("up");
console.log(up_forms[0].tagName); // returns "FORM"
</script>
</body>
</html>
```
示例：删除
```
<body>
    <div id="myDiv">
        <input type="radio" name="fav-color">red
        <input type="radio" name="fav-color">green
        <input type="radio" name="fav-color">blue
    </div>
    <script>
        var div = document.getElementById("myDiv");
        console.log(div); //(9)
        var ipt_favCol = document.getElementsByName("fav-color");
        for (var i = ipt_favCol.length; i--;) {
            div.removeChild(ipt_favCol[i]);
        }
        console.log(ipt_favCol); //(10)
    </script>
</body>
```
getElementByName返回的是一个NodeList动态集合
```
//(9)处打印值
<div id="myDiv">
"red"
"green"
"blue"
</div>

//(10)处打印值
[] //空的NodeList集合，长度为0
```

### 5、querySelector()：
接收一个参数：一个包含一个或多个CSS 选择器的字符串（多个选择器以逗号分隔），返回匹配指定CSS选择器的第一个元素节点（无法选中CSS伪元素），没有发现匹配的节点则返回null。
语法：
```
element = document.querySelector(selectors);
```
示例：一个强大的选择方式
```
<div class="user-panel main">
    <input name="login"/> //这个标签将被返回
</div>

<script>
    var el = document.querySelector("div.user-panel.main input[name=login]");
</script>
```
示例：如果要匹配的ID或选择器不符合 CSS 语法（比如不恰当地使用了冒号或者空格），你必须用反斜杠将这些字符转义。由于 JavaScript 中，反斜杠是转义字符，所以当你输入一个文本串时，你必须将它转义两次（一次是为 JavaScript 字符串转义，另一次是为 querySelector 转义）：
```
<div id="foo\bar"></div>
<div id="foo:bar"></div>

<script>
  console.log('#foo\bar')               // "#fooar"
  document.querySelector('#foo\bar')    // 不匹配任何元素

  console.log('#foo\\bar')              // "#foo\bar"
  console.log('#foo\\\\bar')            // "#foo\\bar"
  document.querySelector('#foo\\\\bar') // 匹配第一个div

  document.querySelector('#foo:bar')    // 不匹配任何元素
  document.querySelector('#foo\\:bar')  // 匹配第二个div
</script>
```
示例：删除
```
    <div id="myDiv">
        <p class="myP">hello world</p>
        <p class="myP">hello dolby</p>
        <p class="myP">hello dot</p>
        <p class="myP">hello bean</p>
    </div>
    <script>
        var div = document.getElementById("myDiv");
        console.log(div); //(11)
        var p = document.querySelector("p");
        div.removeChild(p);
        console.log(p); //(12)
    </script>
```
```
//(11)处打印值
    <div id="myDiv">
        <p class="myP">hello dolby</p>
        <p class="myP">hello dot</p>
        <p class="myP">hello bean</p>
    </div>

//(12)处打印值
        <p class="myP">hello world</p> //如你所见，querySelector也是静态的快照
```

### 6、querySelectorAll()：
接收一个参数：一个包含一个或多个CSS 选择器的字符串（多个选择器以逗号分隔），返回静态NodeList对象集合，该集合中包含匹配指定CSS选择器的所有节点，元素节点的变化无法实时反映在结果中；如果参数中包含CSS伪元素则返回一个空的对象集合。
语法：
```
elementList = document.querySelectorAll(selectors);
```
示例：
```
var matches = document.querySelectorAll("div.note, div.alert");
```
示例：删除
```
    <div id="myDiv">
        <p class="myP">hello world</p>
        <p class="myP">hello dolby</p>
        <p class="myP">hello dot</p>
        <p class="myP">hello bean</p>
    </div>
    <script>
        var div = document.getElementById("myDiv");
        console.log(div); //(13)
        var p = document.querySelectorAll("p");
        for (var i = 0; i < p.length; i++) {
            div.removeChild(p[i]);
        }
        console.log(p); //(14)
    </script>
```
```
//(13)处打印值
    <div id="myDiv"></div>
//(13)处打印值
    [p.myP,p.myP,p.myP,p.myP] //返回的是静态NodeList集合，元素节点的变化无法实时反映在结果中
```

### 7、elementFromPoint()：
接收两个参数：分别是相对于当前窗口左上角的横纵坐标，单位为CSS像素，不需要加单位；返回位于页面指定位置的元素，如果该元素不可返回（如滚动条）则返回它的父元素，如果坐标值无意义（如负值）则返回null。
语法
```
var element = document.elementFromPoint(x, y);
```
示例：
```
<!DOCTYPE html>
<html lang="en">
<head>
<title>elementFromPoint example</title>

<script>
function changeColor(newColor) {
  elem = document.elementFromPoint(2, 2);
  elem.style.color = newColor;
}
</script>
</head>

<body>
<p id="para1">Some text here</p>
<button onclick="changeColor('blue');">blue</button>
<button onclick="changeColor('red');">red</button>
</body>
</html>
```

这一个获取元素的方法用得不多所以不多做介绍。

-----
是不是觉得看了上面这些头好大啊，什么是动态什么是静态，有没有好记一点的方法呢？
有哒！

你可以简单地理解为，getElementBy系列返回的都是动态的HTMLCollection集合，动态集合中的DOM结构变化能实时地反映到所保存的对象中，而querySelector系列返回的都是静态的NodeList对象，是一个快照，对DOM的任何操作都不会对其产生影响。

### 那么Nodelist和HTMLCollection有什么异同呢？
#### 相同点：
- 二者都是类数组对象
- 二者都具有length属性
- 二者都具有item()方法
- 二者都是动态的元素集合，每次访问都需要重新对文档进行查询。

你一定会好奇，诶？前面不是说querySelector系列返回的都是静态的NodeList对象咩？怎么又变成动态的呢？原因在此：
规范中对 querySelectorAll 有明确要求，规定其必须返回一个静态的 NodeList 对象。
在Chrome中情况如下：
```
document.querySelectorAll('a').toString();    // return "[object NodeList]"
document.getElementsByTagName('a').toString();    // return "[object HTMLCollection]"
```

#### 不同点：
- NodeList 对象会包含文档中的所有节点，如 Element、Text 和 Comment 等；HTMLCollection  对象只会包含文档中的 Element 节点。


**参考资料**：
- [*document.getElementById*](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById)
- [*document.getElementByIClassName*](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByClassName)
- [*document.getElementByITagName*](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getElementsByTagName)
- [*document.getElementByIName*](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByName)
- [*document.querySelector*](https://developer.mozilla.org/zh-CN/Add-ons/Code_snippets/QuerySelector)
- [*document.querySelectorAll*](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll)
- [*document.elementFromPoint*](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementFromPoint)
- [*[深入理解javascript中的动态集合——NodeList、HTMLCollection和NamedNodeMap](http://www.cnblogs.com/xiaohuochai/p/5827389.html)*](http://www.cnblogs.com/xiaohuochai/p/5827389.html)
- [*静态NodeList 和 动态NodeList的区别*](https://segmentfault.com/a/1190000008829267)
- [*querySelectorAll 方法相比 getElementsBy 系列方法有什么区别？*](https://www.zhihu.com/question/24702250)
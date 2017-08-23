### dom对象的innerText和innerHTML有什么区别？
innerHTML:在读模式下，innerHTML属性返回与调用元素的所有子节点（包括元素、注释与文本节点）对应的HTML标记；在写模式下，innerHTML会根据指定的值创建新的DOM树，然后用这个DOM树完全替换调用元素原先的所有子节点。浏览器不同返回的innerHTML值也不一定相同。
innerText:读模式下，innerText会按照由浅入深的顺序将子文档树中的所有文本拼接起来；写模式下，会删除元素的所有子节点，插入包含相应文本值的文本节点。浏览器不同返回的innerText值也不一定相同。

区别：
- innerHTML已被HTML5纳入规范，innerText没有。
- innerHTML返回元素的HTML结构，innerText返回元素内包含的文本内容。

### elem.children和elem.childNodes的区别？
- elem.children返回元素中的元素子节点，是HTMLCollection的实例；
- elem.childNodes返回元素中的所有子节点（包括空白文本节点），childNodes中保存着一个NodeList类数组对象（有length属性但并不是Array的实例），可通过方括号语法来访问NodeList的值。

大多数情况下使用children属性，在元素只包含元素子节点时，这两个属性的值相同。

### 查询元素有几种常见的方法？ES5的元素选择方法是什么?
7种查询元素的方法，其中querySelector()和querySelectorAll()为ES5的元素选择方法

- getElementById()：接收一个参数：要取得的元素的ID（区分大小写，必须严格匹配），找到则返回该元素，没找到返回null。
- getElementsByClassName()：接收一个参数，这个参数可以是多个空格分隔的class名字，返回同时具有这些节点的元素。
- getElementsByTagName()：接收一个参数：要取得的元素的标签名（不区分大小写），返回的是包含若干个元素的NodeList，在HTML中会返回一个HTMLCollection对象。
- getElementsByName()：接收一个参数：带有给定name属性值的元素，也会返回一个HTMLCollection对象。最常用的场景是取得单选按钮。
- querySelector()：接收一个参数：CSS选择器的名称，返回匹配指定CSS选择器的第一个元素节点（无法选中CSS伪元素），没有发现匹配的节点则返回null。
- querySelectorAll()：接收一个参数：CSS选择器的名称，返回匹配指定CSS选择器的所有节点，返回的是NodeList对象，该对象不是动态集合，元素节点的变化无法实时反映在结果中。
- elementFromPoint()：接收两个参数：分别是相对于当前窗口左上角的横纵坐标，单位为CSS像素，返回位于页面指定位置的元素，如果该元素不可返回（如滚动条）则返回它的父元素，如果坐标值无意义（如负值）则返回null。
```
<body>
  <h2 id="aa">hello</h2>
  <p class="bb">world</p>
  <div>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
  </div>
  <input type="radio" name='fav-color'>red
  <input type="radio" name='fav-color'>orange
  <input type="radio" name='fav-color'>pink
  <input type="radio" name='fav-color'>blue
  <script>
    var h2 = document.getElementById("aa");
    console.log(h2);

    var p = document.getElementsByClassName("bb");
    console.log(p); //

    var div = document.getElementsByTagName("div");
    console.log(div);

    var input = document.getElementsByName("fav-color");
    console.log(input);

    var li = document.querySelector("li");
    console.log(li);

    var allLi = document.querySelectorAll("li");
    console.log(allLi);

    var frompoint = document.elementFromPoint(100, 100);
    console.log(frompoint);
  </script>
</body>
```

### 如何创建一个元素？如何给元素设置属性？如何删除属性
- 创建
    - 创建元素：creatElement(tagName)：用来生成HTML元素节点，参数为引号包裹的元素的标签名。
    - 创建文本节点：creatTextNode(content)：用来生成文本节点，参数为所要生成的文本节点的内容。
    - 创建DOM片段：creatDocumentFragment()：生成一个DocumentFragment对象。该对象是一个存在于内存的DOM片段，不属于当前文档，常用来生成较复杂的DOM结构，然后插入当前文档。这样做的好处在于，因为DocumentFragment不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的DOM有更好的性能表现。
```
<script>  
  var div = document.createElement("div");
    div.id = "myNEWDIV";
    div.className = "box";
    document.body.appendChild(div);
    var content = document.createTextNode("hello dolby");
    div.appendChild(content);
    console.log(div);
    var docFrag = document.createDocumentFragment("nav");
    docFrag.id = "navbar";

    var a = document.createElement("a");
    var a_content = document.createTextNode("导航");
    a.appendChild(a_content);
    docFrag.appendChild(a);
    document.body.appendChild(docFrag);
  </script>
```

- 设置属性：setAttribute(attr,value)：接收两个参数，引号包裹的属性名与引号包裹的属性值
```
var node = document.getElementById("div1");
node.setAttribute("my_attrib", "newVal");
```
等同于
```
var node = document.getElementById("div1");
var a = document.createAttribute("my_attrib");
a.value = "newVal";
node.setAttributeNode(a);
```

- 删除属性：removeAttribute(attr)：接收一个参数，即要删除的属性名
```
node.removeAttribute('id');
```

### 如何给页面元素添加子元素？如何删除页面元素下的子元素?
- 添加元素：
appendChild():在元素末尾添加元素
```
var newDiv = document.createElement("div");
var newContent = document.createTextNode("Hello");
newDiv.appendChild(newContent);
```
- 插入元素：
insertBefore(newchild,refchild):在某个元素之前插入元素
```
var newDiv = document.createElement("div");
var newContent = document.createTextNode("Hello");
newDiv.insertBefore(newContent, newDiv.firstChild);
```
- 替换元素：
replaceChild(newEle,oldEle)接受两个参数：要插入的元素和要替换的元素
```
newDiv.replaceChild(newElement, oldElement);
```
- 删除元素：
removeChild()
```
parentNode.removeChild(childNode);
```

### element.classList有哪些方法？如何判断一个元素的 class 列表中是否包含某个 class？如何添加一个class？如何删除一个class?
- 方法：
    - item():取得classList中的每个元素
    - add(value):将给定字符串值添加到classList类名列表中，值已经存在就不添加
    - remove(value):从列表中删除给定字符串
    - contains(value):表示列表中是否存在给定的值，存在返回true，否则返回false
    - toggle(value):如果列表中存在给定值，删除它，如果不存在，添加它。
- 判断是否包含某个class：
用contains()方法：
```
if(element.classList.contains("className")){
  //  执行操作
}
```
- 添加一个class
```
element.classList.add("className");
```
- 删除一个class
```
element.classList.remove("className");
```
### 如何选中如下代码所有的li元素？ 如何选中btn元素？
```
<body>
<div class="mod-tabs">
   <ul>
       <li>list1</li>
       <li>list2</li>
       <li>list3</li>
   </ul>
   <button class="btn">点我</button>
</div>
</body>
<script>
    var allLi_1 = document.getElementsByTagName("li");
    var allLi_2 = document.querySelectorAll(".mod-tabs ul>li");
    var button = document.getElementsByClassName("btn");
    console.log(allLi_1);
    console.log(allLi_2);
    console.log(button);
</script>
```
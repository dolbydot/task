### DOM0 事件和DOM2级在事件监听使用方式上有什么区别？
- DOM0级事件处理程序：
通过JavaScript指定事件处理程序，将一个函数赋值给一个元素的事件处理程序属性。

每个元素都有自己的事件处理程序属性，这些属性名称通常为小写，如onclick等，将这些属性的值设置为一个函数，就可以指定事件处理程序，如下：
```
<input id="btnClick" type="button" value="Click Here" />

<script type="text/javascript">
    var btnClick = document.getElementById('btnClick');
    btnClick.onclick = function showMessage() {
        alert(this.id); 
    };
</script>
```
DOM0级方法指定的事件处理程序被认为是元素的方法，事件处理程序在元素的作用域下运行，this指向当前元素，在事件处理程序中可通过this访问元素的任何属性和方法，以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理。
可将事件处理程序属性赋值为null来删除通过DOM0级方法指定的事件处理程序。
```
btn.onclick = null; //删除事件处理程序
```
- DOM2级事件处理程序：
DOM2级事件定义了两个方法用于处理指定和删除事件处理程序的操作：
    - addEventListener()
    - removeEventListener()

所有的DOM节点都包含这两个方法，并且它们都接受3个参数：事件名
、事件处理函数、布尔值，布尔值如果是true表示在捕获阶段调用事件处理程序，false，则是在事件冒泡阶段处理。
刚刚的例子可以这样写：
```
<input id="btnClick" type="button" value="Click Here" />

<script type="text/javascript">
    var btnClick = document.getElementById('btnClick');
    btnClick.addEventListener('click', function() {
        alert(this.id);
    }, false);
</script>
```
上面的事件会在冒泡阶段被触发，这里添加的事件处理程序也是在其依附的元素的作用域中运行，使用DOM2级方法添加事件处理程序的好处是可以添加多个事件处理程序：
```
<input id="btnClick" type="button" value="Click Here" />

<script type="text/javascript">
    var btnClick = document.getElementById('btnClick');

    btnClick.addEventListener('click', function() {
        alert(this.id);
    }, false);

    btnClick.addEventListener('click', function() {
        alert('Hello!');
    }, false);
</script>
```
这两个事件处理程序会按照添加它们的顺序触发。

通过addEventListener()添加的事件处理程序只能通过removeEventListener()移除，移除时参数与添加的时候相同，这就意味着刚才我们添加的匿名函数无法移除，因为匿名函数虽然方法体一样，但是句柄却不相同，所以正确的做法是将作为参数的的函数赋值给一个变量，这样添加和删除事件处理程序时大家引用的就是同一个函数了。
```
<input id="btnClick" type="button" value="Click Here" />

<script type="text/javascript">
    var btnClick = document.getElementById('btnClick');

    var handler=function() {
        alert(this.id);
    }

    btnClick.addEventListener('click', handler, false);
    btnClick.removeEventListener('click', handler, false);
</script>
```
将事件处理程序添加到事件流的冒泡阶段可以最大限度地兼容各种浏览器。IE9、Firefox、Chrome、Safari、Opera都支持DOM2级事件处理程序。

- 区别：
    - DOM0级同一个事件处理程序只能对应一个处理函数，定义多次则新方法会覆盖老方法。DOM2级可同时添加多个事件处理程序且会按添加他们的顺序先后执行。
    - DOM0级简单且具有跨浏览器优势，DOM2级不具备跨浏览器优势。

### attachEvent与addEventListener的区别？
- 首先了解一下attachEvent()方法
IE8及之前版本不支持addEventListener()和removeEventListener()方法，所以IE实现了两个类似的方法：attachEvent()和detachEvent()，这两个方法都接收两个相同的参数：事件处理程序名称、事件处理程序函数。

由于IE8及之前版本只支持事件冒泡，所以通过attachEvent()添加的事件处理程序都会被添加到冒泡阶段。
```
<input id="btnClick" type="button" value="Click Here" />

<script type="text/javascript">
    var btnClick = document.getElementById('btnClick');
    var handler=function() {
        alert(this.id); //undefined
    }
    btnClick.attachEvent('onclick', handler);
</script>
```
使用attachEvent添加的事件处理程序可以通过detachEvent移除，条件也是相同的参数，匿名函数不能被移除。
```
<input id="btnClick" type="button" value="Click Here" />

<script type="text/javascript">
    var btnClick = document.getElementById('btnClick');

    var handler=function() {
        alert(this.id);
    }

    btnClick.attachEvent('onclick', handler);
    btnClick.detachEvent('onclick', handler);
</script>
```
- attachEvent与addEventListener的区别
    - 参数个数不相同：
addEventListener有三个参数，attachEvent只有两个，attachEvent添加的事件处理程序只能发生在冒泡阶段，addEventListener第三个参数可以决定添加的事件处理程序是在捕获阶段还是冒泡阶段处理（我们一般为了浏览器兼容性都设置为冒泡阶段）

    - 第一个参数意义不同：
addEventListener第一个参数是事件类型（比如click，load），而attachEvent第一个参数指明的是事件处理函数名称（onclick，onload）

    - 事件处理程序的作用域不相同：
addEventListener的作用域是元素本身，this是指的触发元素；而attachEvent事件处理程序会在全局变量内运行，this是window，所以刚才例子才会返回undefined，而不是元素id

    - 为一个事件添加多个事件处理程序时执行顺序不同：addEventListener添加会按照添加顺序执行，而attachEvent添加多个事件处理程序时顺序无规律(添加的方法少的时候大多是按添加顺序的反顺序执行的，但是添加的多了就无规律了)，所以添加多个的时候，不依赖执行顺序的还好，若是依赖于函数执行顺序，最好自己处理，不要指望浏览器。

### 解释IE事件冒泡和DOM2事件传播机制？
首先看一个例子：
```
<!DOCTYPE html >
<html>
<head>
    <title>Event Bubbling Example</title>
</head>
<body>
    <div id="muDiv">Click Me</div>
</body>
</html>
```
- IE事件冒泡：
    - 从深到浅，从内向外。即事件开始时由最具体的元素（文档中嵌套层析最深的那个节点）接收，然后逐级向上传播到较不具体的节点（文档）。

以上面代码为例，click事件首先在`<div>`元素上发生，然后click事件沿DOM树向上传播，在每一级节点上都会发生直至传播到document对象。

![事件冒泡](http://upload-images.jianshu.io/upload_images/6851923-fcf6c3ca150f8b1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


所有现代浏览器都支持事件冒泡，但IE5.5及更早版本中的事件冒泡会跳过`<html>`元素，从`<body>`直接到`document`，IE9、Firefox、Chrome、Safari则将事件一直冒泡到window对象。

- DOM2级事件传播：
    - DOM2级事件规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会，然后是实际的目标接收到事件，接着事件冒泡阶段对事件作出响应。

以上面代码为例，捕获阶段事件从ducument到`<html>`再到`<body>`后就停止了，下一阶段是“处于目标”阶段，事件在`<div>`上发生并在事件处理中被视为冒泡阶段的一部分，接着冒泡阶段发生，事件又传播回文档。

![DOM事件流](http://upload-images.jianshu.io/upload_images/6851923-4d85a670924117bf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

IE9、Opera、Firefox、Chrome、Safari都支持DOM事件流，IE8及更早版本不支持事件流，只支持事件冒泡。
即使DOM2级事件规范明确要求捕获阶段不会涉及事件目标，但IE9,Firefox,Chrome,Safari和Opera9.5及更高版本都会在事件捕获阶段触发事件对象上的事件，结果就是有两个机会在目标对象上操作事件。

### 如何阻止事件冒泡？ 如何阻止默认事件？
- 阻止事件冒泡：
    - IE：event.cancelBubble = true
    - 非IE：event.stopPropagation()，前提是event.bubbles = true

- 阻止默认事件：
    - IE：event.returnValue = false
    - 非IE：event.preventDefault()方法，前提是event.cancelable = true。

### 有如下代码，要求当点击每一个元素li时控制台展示该元素的文本内容。不考虑兼容
```
<ul class="ct">
    <li>这里是</li>
    <li>饥人谷</li>
    <li>前端14班</li>
</ul>
<script>
    var li = document.querySelector('.ct');
    li.addEventListener('click', function (e) {
      console.log(e.target.innerText);
    }, false);
</script>
```

### 补全代码，要求：
- 当点击按钮“开头添加”时在“<li>这里是</li>”元素前添加一个新元素，内容为用户输入的非空字符串；当点击“结尾添加”时在最后一个 li 元素后添加用户输入的非空字符串.
- 当点击每一个元素li时控制台展示该元素的文本内容。
```
<ul class="ct">
    <li>这里是</li>
    <li>饥人谷</li>
    <li>任务班</li>
</ul>
<input class="ipt-add-content" placeholder="添加内容"/>
<button id="btn-add-start">开头添加</button>
<button id="btn-add-end">结尾添加</button>
<script>
    var firstBtn = document.getElementById('btn-add-start'),
      lastBtn = document.getElementById('btn-add-end'),
      content = document.querySelector('.ipt-add-content'),
      ul = document.querySelector('.ct');

    firstBtn.addEventListener('click', function () {
      var addLi = document.createElement('li');
      if (content.value.length == 0) {
        alert('请输入内容');
      } else {
        addLi.innerText = content.value;
        ul.insertBefore(addLi, ul.firstChild);
      }
    }, false);

    lastBtn.addEventListener('click', function () {
      var addLi = document.createElement('li');
      if (content.value.length == 0) {
        alert('请输入内容');
      } else {
        addLi.innerText = content.value;
        ul.appendChild(addLi);
      }
    }, false);

    ul.addEventListener('click', function (e) {
      if (e.target.tagName.toLowerCase() === 'li') {
        console.log(e.target.innerText);
      }
    }, false);
</script>
```

### 补全代码，要求：当鼠标放置在li元素上，会在img-preview里展示当前li元素的data-img对应的图片。
```
  <ul class="ct">
    <li data-img="http://img1.cache.netease.com/catchpic/A/AA/AA35F32381A18EDB25397DFAE1878F4C.jpg">鼠标放置查看图片1</li>
    <li data-img="http://www.dogstar.net/img/2016/1469937790.jpeg">鼠标放置查看图片2</li>
    <li data-img="http://www.tianqi.com/upload/article/16-06-08/RpBV_160608071343_6.jpg">鼠标放置查看图片3</li>
  </ul>
  <div class="img-preview"></div>
<script>
    var ul = document.querySelector('.ct'),
       childs = ul.querySelectorAll('li');
       preview = document.querySelector('.img-preview');
    for (var i = 0; i < childs.length; i++) {
      childs[i].addEventListener('mouseenter', function () {
        var dataImg = this.getAttribute('data-img');
        preview.innerHTML = "![](" + dataImg + ")";
      });
    }
</script>
```

### 写一篇博客，讲解事件相关知识点，如事件冒泡、捕获、代理、兼容写法等(选做题目)
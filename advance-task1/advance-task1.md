### CSS和JS在网页中的放置顺序是怎样的？
1. css放入head中，link引入样式表和写在head內的style标签里都可以，也可以直接在元素中写入样式，但注意要放在js脚本之前。

2. js放置位置：
- 放入body底部，`</body>`之前。
- 放入head中同时使用defer或async来延迟或异步加载js。
- 使用creatElement动态生成但要注意加载顺序。
- 用ajax加载。

原因：当文档加载过程中遇到JS文件，HTML文档会挂起渲染过程，不仅要等到文档中JS文件加载完毕还要等待解析执行完毕，才会继续HTML的渲染。原因是因为JS有可能修改DOM结构，这就意味着JS执行完成前，后续所有资源的下载是没有必要的，这就是JS阻塞后续资源下载的根本原因，即无论当前JS代码是内嵌还是在外部文件中，页面的下载和渲染都必须停下来等待脚本执行完成，JS执行过程越久，浏览器等待响应用户输入的时间就越长，所以尽量把JS放在底部、设置script标签的defer或async属性、合并脚本等方法可起到性能优化效果。

### 解释白屏和FOUC
1. 白屏：
- 对IE来说，把样式放在底部时，在某些场景下（如打开新窗口／刷新页面等）页面会出现白屏，而不是内容逐步展现。
- 如果使用@import标签，即使将CSS写入外部样式表由link引入并放在头部，也可能出现白屏。
- 把js文件放入页面顶部而未使用defer或async延迟或异步加载js文件，从而阻塞jtml与css的加载也会导致白屏。
2. FOUC：
Flash of unsettled content：无样式内容闪烁。对IE来说，把样式放在底部时，在某些场景下（如点击链接、输入URL、使用书签进入等）页面会出现FOUC现象，具体表现为逐步加载无样式的内容，等CSS加载完成后页面突然展现样式；对Firefox来说会一直表现出FOUC。

### async和defer的作用是什么？有什么区别
没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是读到就加载并执行。
1. 作用：
- async（异步）：定义了async属性的脚本相对于页面的其他部分异步执行（同时执行），作用是不让页面等待两个或以上的脚本下载和执行，从而异步加载页面的其他内容。
```
<!DOCTYPE html>
<head>
    <title>Example HTML Page</title>
    <script type="text/javascript" async src="example1.js"></script> 
    <script type="text/javascript" async src="example2.js"></script>
</head>
<body>
    <!-- 这里放内容 --> 
</body>
</html>
```
以上代码中evample2.js可能会在example1.js之前执行，所以确保二者之间互不依赖很重要。
- defer（延迟）：定义了defer属性的脚本会被延迟到整个页面都解析完毕后再执行。
```
<!DOCTYPE html>
<head>
    <title>Example HTML Page</title>
    <script type="text/javascript" defer="defer" src="example1.js"></script>
    <script type="text/javascript" defer="defer" src="example2.js"></script>
</head>
<body>
    <!-- 这里放内容 -->
</body>
</html>
```
以上代码中虽然我们把`<script>`放在了`<head>`中，但其中包含的脚本文件将延迟到浏览器遇到`</html>`后再执行。HTML5规范要求脚本按照它们出现的先后顺序执行，即第一个延迟脚本先于第二个延迟脚本执行，而这两个脚本会先于DOMContentLoaded事件执行，但**现实中**延迟脚本并不一定会按照顺序执行，也不一定会在DOMContentLoaded事件触发前执行，所以一个文档里最好只包含一个延迟脚本。

2. 共同点：
- 设置了async或defer属性的脚本不会阻塞页面渲染
- async和defer属性决定了js脚本的执行方式，内联脚本会忽略这两个属性
- 使用这两个属性的脚本中不能调用document.write
- 所有defer和async脚本执行完毕后，DOMContentLoaded和load事件都将触发

3. 区别：
- 异步脚本一定会在页面的load事件前执行，但可能在DOMContentLoaded事件触发之前或之后执行，所以可能出现无顺序加载js的情况；延迟脚本在文档完成解析后，执行理论上是有序的但现实中并不能保证顺序，也不一定会在DOMContentLoaded事件触发前执行。

4. 关联：
- async为true，脚本将在加载完成后立即执行
- async为false，defer为true，脚本将在页面全部解析完成后执行
- async和defer都为false，脚本将阻塞页面解析，即页面解析被挂起转而下载并立即执行脚本文件

5. 注意事项：
如果一个外部脚本依赖于另一外部脚本，请将它们标记为defer，并按它们被声明的顺序执行。


### 简述网页的渲染机制
1. 解析HTML标签，构建DOM树
2. 解析CSS标签，构建CSSOM树
3. 把DOM和CSSOM组合成渲染树
4. 在渲染树的基础上布局，计算每个节点的几何结构
5. 把每个节点绘制到屏幕上

### 从上面4个题目中随机选择一题写成博客，投递到饥人谷技术博客 (可选)
[博客第六节：浏览器缓存、解析并渲染页面](http://www.jianshu.com/p/1aa5d2d3a44a)
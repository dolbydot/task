### 为什么要使用模块化？
- 解决命名冲突
- 文件依赖管理
- 提高代码可读性
- 代码解耦，提高复用性

### CommonJS、AMD、CMD规范分别指什么，有哪些应用？
##### CommonJS：
在网页端没有模块化编程，只是页面的JavaScript逻辑复杂，但也可以工作下去，但在服务器端却一定要有模块，所以虽然JavaScript在web端发展这么多年，第一个流行的模块化规范却由服务器端的JavaScript应用带来，[CommonJS规范](http://wiki.commonjs.org/wiki/Modules/1.1)由NodeJS发扬光大，这标志着JavaScript模块化编程正式登上舞台。
规范：
- 定义模块：根据CommonJS规范，一个单独的文件就是一个模块，每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为global对象的属性
- 模块输出： 模块只有一个出口，我们把模块希望输出的内容放入module.exports对象
- 加载模块： 加载模块使用require方法，该方法读取一个文件并执行，返回文件内部的module.exports对象

例子：
```
var clock = require('clock'); 
clock.start(); 
```
这种写法适合服务端，因为在服务器读取模块都是在本地磁盘，加载速度很快，但是如果在客户端，加载模块的时候有可能出现“假死”状况。比如上面的例子中clock的调用必须等待clock.js请求成功，加载完毕。那么，能不能异步加载模块呢？这时就出现了AMD和CMD规范

**应用**：NodeJs

##### AMD：
Asynchronous Module Definition，异步模块定义，是一个在浏览器端模块化开发的规范。由于不是JavaScript原生支持，使用AMD规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎RequireJS，实际上AMD 是 RequireJS 在推广过程中对模块定义的规范化的产出。

RequireJS主要解决两个问题：
- 多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器
- js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长

在AMD上写一个模块，先定义所有依赖，然后在加载完成后的回调函数中执行。
```
require(['clock'],function(clock){
    clock.start(); 
}); 
```

**应用**：RequireJS、curl、Dojo

##### CMD：
Common Module Definition通用模块定义，CMD规范是国内发展出来的，就像AMD有个RequireJS，CMD有个浏览器的实现SeaJS，SeaJS要解决的问题和RequireJS一样，只不过在模块定义方式和模块解析时机上有所不同。

Sea.js推崇一个文件一个文件，遵循统一的写法，使用Sea.js进行模块化开发可以带来很多好处：
- 模块的版本管理。通过别名等配置，配合构建工具，可以比较轻松地实现模块的版本管理。
- 提高可维护性。模块化可以让每个文件的职责单一，非常有利于代码的维护。Sea.js 还提供了 nocache、debug 等插件，拥有在线调试等功能，能比较明显地提升效率。
- 前端性能优化。Sea.js 通过异步加载模块，这对页面性能非常有益。Sea.js 还提供了 combo、flush 等插件，配合服务端，可以很好地对页面性能进行调优。
- 跨环境共享模块。CMD 模块定义规范与 Node.js 的模块规范非常相近。通过 Sea.js 的 Node.js 版本，可以很方便实现模块的跨服务器和浏览器共享。

在CMD上写一个模块：
```
define(function(require, exports, module) { 
    var clock = require('clock'); 
    clock.start(); 
});
```

**应用**：SeaJS

##### AMD VS CMD
区别：
- 对依赖的处理不同：
    - AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块
    - CMD推崇就近依赖，只有在用到某个模块的时候再去require
- 对依赖模块的**执行时机**处理不同：
    - AMD中模块加载完就执行该模块，所有模块都执行完后会进入require的回调函数，执行主逻辑，结果就是依赖模块的执行顺序和书写顺序不一定一致，看网络速度，谁先下载完谁先执行，但主逻辑一定在所有依赖加载完成后才执行。
    - CMD是先把所有的依赖模块全部加载完后进入主逻辑，遇到require语句的时候才执行对应的模块，结果是模块的执行顺序和书写顺序是完全一致的。

总结：
AMD用户体验好，依赖模块提前执行了所以没有延迟，CMD性能好，只有用户需要的时候才执行。

-----
**参考资料**：
- [*模块化*](http://book.jirengu.com/fe/%E5%89%8D%E7%AB%AF%E8%BF%9B%E9%98%B6/%E6%A8%A1%E5%9D%97%E5%8C%96/%E6%A8%A1%E5%9D%97%E5%8C%96.html)
- [*前端模块化开发的价值*](https://github.com/seajs/seajs/issues/547)
### ajax 是什么？有什么作用？
1. AJAX全称为“Asynchronous JavaScript and XML”（异步JavaScript和XML），
是一种技术的泛称，可以在不重新加载整个网页的情况下向服务器请求额外的数据，实现对网页的某部分进行更新，带来良好的用户体验。

AJAX和XMLHttpRequest的关系：
我们使用XMLHttpRequest对象来发送一个Ajax请求。

传统HTTP请求流程大概如下：
- 浏览器向服务器发起请求
- 服务器根据浏览器传递的数据生成responsive
- 服务器将responsive返回给浏览器
- 浏览器刷新整个页面显示最新数据

这些过程是同步的，会顺序执行。
AJAX在浏览器与web服务器之间使用异步数据传输（HTTP请求）从服务器获取数据，这里的异步指脱离当前浏览器页面的请求、加载等单独执行，这意味着可以在不重新加载整个网页的情况下通过JavaScript发送请求、接收服务器传来的数据，操作DOM将更新某部分网页的数据，使用AJAX对用户来说最直观的感受是获取新数据无需刷新页面。

2. AJAX优缺点
- 优点：
    - 更新数据页面无需刷新，用户体验更佳
    - 使用异步方式与服务器通信，响应速度更快
    - 可将服务器以前负担的一些工作转嫁到客户端，利用客户端的闲置能力来处理，减轻服务器和带宽的负担，节约空间和宽带租用成本。AJAX的原则是“按需取数据”，可最大程度减少冗余请求
    - 作为基于标准化的并被广泛支持的技术，无需下载插件或小程序
    - 使因特网应用程序更小、更快、更友好
- 缺点：
    - 不支持浏览器back按钮
    - AJAX暴露了与服务器交互的细节带来安全问题
    - 对搜索引擎的支持较弱
    - 破坏了程序的异常机制
    - 不容易调试

### 前后端开发联调需要注意哪些事情？后端接口完成前如何 mock 数据？
在开发之前，前后端需要写作商定数据和接口的各项细节，后端负责提供数据，前端负责展示数据（根据数据负责页面的开发）
- 前后端开发联调注意事项：
    - URL：借口名称
    - 发送请求的参数和格式(get/post)
    - 数据响应的数据格式(数组/对象)
    - 根据前后端约定，整理接口文档

- 如何mock数据
    - 搭建web服务器
    - 根据接口文档仿造假数据 
    - 关联前后端文件，开启web服务器
    - 验证前端页面功能及显示是否正确

### 点击按钮，使用 ajax 获取数据，如何在数据到来之前防止重复点击?
初始时上锁，请求开始时解锁，请求结束时继续上锁
```
//添加一个状态锁，初始为true，上锁为true，解锁为false
var lock = true;
btn.addEventListener('click', function () {
    //状态为false时直接return
    if (!lock) {
        return
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //readystate为4时，此次请求结束，上锁
            lock = true
        }
    }
    xhr.open('GET', url);
    xhr.send();
    //解锁，这时候请求开始
    lock = false
})   
```

### 实现加载更多的功能，后端在本地使用server-mock来模拟数据
- [代码地址](https://github.com/dolbydot/task/blob/master/advance-task12/ajax/ajax.html)
- [router.js](https://github.com/dolbydot/task/blob/master/advance-task12/ajax/router.js)
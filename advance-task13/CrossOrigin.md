关于跨域大概可以分为 iframe 的跨域和纯粹的跨全域请求。
## 3种跨全域方法：
### 1、JSONP
全称：JSON with Padding，可用于解决主流浏览器的跨域数据访问的问题。
Web 页面上调用 js 文件不受浏览器同源策略的影响，所以通过 Script 便可以进行跨域的请求：

- 前端先设置好回调函数，并将其作为url的参数(如`<script src="http://weather.com.cn?city=beijing&callback=showWeather"></script>`)
- 服务端接收到请求后，通过该参数获得回调函数名(`showWeather`)，并将数据放在参数中将其返回
- 收到结果后因为是 script 标签，所以浏览器会当做是脚本进行运行，从而达到跨域获取数据的目的。

实例：
后端逻辑
```
const url = require('url');
	
require('http').createServer((req, res) => {
	const data = {
		x: 10
	};
	const callback = url.parse(req.url, true).query.callback;
	console.log(callback);
	res.writeHead(200);
	res.end(`${callback}(${JSON.stringify(data)})`);

}).listen(3000, '127.0.0.1');

console.log('启动服务，监听 127.0.0.1:3000');
```
通过`node server.js` 启动服务，监听端口 3000，这样服务端就建立起来了

![](http://upload-images.jianshu.io/upload_images/6851923-5a62598074268254.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/6851923-0d414682200bb4ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

前端页面
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>json with padding</title>
</head>
<body>
	<script>
		function jsonpCallback(data) {
			alert('获得 X 数据:' + data.x);
		}
	</script>
	<script src="http://127.0.0.1:3000?callback=jsonpCallback"></script>
</body>
</html>
```
我们通过端口号的不同来模拟跨域的场景.

在页面同目录下输入`http-server`

![](http://upload-images.jianshu.io/upload_images/6851923-e57c639d90bf9814.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

复制 `http://127.0.0.1:8080`在浏览器中打开，就可以通过端口8080来访问刚才的页面，相当于开启两个监听不同端口的 http 服务器，通过页面中的请求来模拟跨域的场景。打开浏览器，访问`http://127.0.0.1:8080`就可以看到从`http://127.0.0.1:3000`获取到的数据了。

![](http://upload-images.jianshu.io/upload_images/6851923-e4039540cde3dc36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

至此，通过 JSONP 跨域获取数据已经成功了，但这种跨域方式存在一定的优缺点：
- 优点：
    - 它不像XMLHttpRequest 对象实现 Ajax 请求那样受到同源策略的限制
    - 兼容性好，在古老的浏览器也能很好的运行
    - 不需要 XMLHttpRequest 或 ActiveX 的支持；并且在请求完毕后可以通过调用 callback 的方式回传结果。
- 缺点：
    - 支持 GET 请求而不支持 POST 等其它类行的 HTTP 请求。
    - 只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面或 iframe 之间进行数据通信的问题
    - 容易遭受XSS攻击，因为我们拿到的是对方接口的数据作为js执行，如果得到的是一个很危险js，获取了用户信息和cookies，这时执行了js就会出现安全问题。

### 2、CORS
CORS是一个W3C标准，全称：Cross-origin resource sharing，跨域资源共享。允许浏览器向跨源服务器发出 XMLHttpRequest 请求，克服了 ajax 只能同源使用的限制。

CORS 需要浏览器和服务器同时支持才可以生效，对于开发者来说，CORS 通信与同源的 ajax 通信没有差别，代码完全一样。浏览器一旦发现 ajax 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。
前端页面：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>CORS</title>
</head>
<body>
	<script>
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://127.0.0.1:3000', true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
				alert(xhr.responseText);
			}
		}
		xhr.send(null);
	</script>
</body>
</html>
```
这似乎跟一次正常的异步 ajax 请求没有什么区别，关键是在服务端收到请求后的处理：
后端页面
```
require('http').createServer((req, res) => {
	res.writeHead(200, {
		'Access-Control-Allow-Origin': 'http://localhost:8080'
	});
	res.end('这是你要的数据：1111');

}).listen(3000, '127.0.0.1');

console.log('启动服务，监听 127.0.0.1:3000');
```
关键是在于设置响应头中的 `Access-Control-Allow-Origin`，该值要与请求头中 Origin 一致才能生效，否则将跨域失败。
与JSONP一样，再次开启两个 http 服务器进程：

![](http://upload-images.jianshu.io/upload_images/6851923-c66b96a20702de70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开浏览器访问localhost:8080可看到：

![](http://upload-images.jianshu.io/upload_images/6851923-198354214eb9641f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

成功的关键在于 `Access-Control-Allow-Origin` 是否包含请求页面的域名，如果不包含的话，浏览器将认为这是一次失败的异步请求，将会调用 `xhr.onerror` 中的函数。

- CORS 的优点：
    - 使用简单方便，更为安全
    - 支持 POST 请求方式
- 缺点：
    - CORS仅兼容 IE 10 以上

### 3、Server Proxy服务器代理
需要跨域的请求操作时发送请求给后端，让后端帮你代为请求，然后将获取的结果发送给你。
假设你的页面需要获取 [CNode：Node.js专业中文社区](http://link.zhihu.com/?target=https%3A//cnodejs.org/api) 论坛上一些数据，如通过 [https://cnodejs.org/api/v1/topics](http://link.zhihu.com/?target=https%3A//cnodejs.org/api/v1)，因为不同域，所以你可以请求后端让其代为转发请求
```
const url = require('url');
const http = require('http');
const https = require('https');
const server = http.createServer((req, res) => {
    const path = url.parse(req.url).path.slice(1);
    if(path === 'topics') {
	https.get('https://cnodejs.org/api/v1/topics', (resp) => {
	    let data = "";
	    resp.on('data', chunk => {
		data += chunk;
	    });
	    resp.on('end', () => {
		res.writeHead(200, {
		    'Content-Type': 'application/json; charset=utf-8'
		});
		res.end(data);
	    });
	})		
    }
}).listen(3000, '127.0.0.1');

console.log('启动服务，监听 127.0.0.1:3000');
```
通过代码你可以看出，当你访问`http://127.0.0.1:3000`时，服务器收到请求，会代你发送请求`https://cnodejs.org/api/v1/topics`，最后将获取到的数据发送给浏览器。
同样地开启服务:

![](http://upload-images.jianshu.io/upload_images/6851923-750a2619bfba8fd0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开浏览器访问`http://localhost:3000/topics`就可以看到:

![](http://upload-images.jianshu.io/upload_images/6851923-b8336061336fffd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

跨域请求成功。

## 4种通过iframe跨域与其他页面通信的方式
### 1、location.hash:
在 url 中，`http://www.baidu.com#helloworld`的 `#helloworld` 就是 location.hash，改变 hash 值不会导致页面刷新，所以可以利用 hash 值来进行数据的传递，当然数据量是有限的。
假设 localhost:8080 下有文件 cs1.html 要和 localhost:8081 下的 cs2.html 传递消息，cs1.html 首先创建一个隐藏的 iframe，iframe 的 src 指向 localhost:8081/cs2.html，这时的 hash 值就可以做参数传递。
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CS1</title>
</head>
<body>
    <script>
	// http://localhost:8080/cs1.html
	let ifr = document.createElement('iframe');
	ifr.style.display = 'none';
	ifr.src = "http://localhost:8081/cs2.html#data";
	document.body.appendChild(ifr);
		
	function checkHash() {
	    try {
		let data = location.hash ? location.hash.substring(1) : '';
		console.log('获得到的数据是：', data);
	    }catch(e) {

	    }
	}
	window.addEventListener('hashchange', function(e) {
	    console.log('获得的数据是：', location.hash.substring(1));
        });
    </script>
</body>
</html>
```
cs2.html 收到消息后通过 parent.location.hash 值来修改 cs1.html 的 hash 值，从而达到数据传递。
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CS2</title>
</head>
<body>
    <script>
    // http://locahost:8081/cs2.html
    switch(location.hash) {
        case "#data":
	    callback();
	    break;
    }
    function callback() {
	const data = "some number: 1111"
	try {
	    parent.location.hash = data;
	}catch(e) {
	    // ie, chrome 下的安全机制无法修改 parent.location.hash
	    // 所以要利用一个中间的代理 iframe 
	    var ifrproxy = document.createElement('iframe');
		ifrproxy.style.display = 'none';
		ifrproxy.src = 'http://localhost:8080/cs3.html#' + data;     // 该文件在请求域名的域下
		document.body.appendChild(ifrproxy);
	    }
       }
    </script>
</body>
</html>
```
由于两个页面不在同一个域下IE、Chrome不允许修改parent.location.hash的值，所以要借助于 localhost:8080 域名下的一个代理 iframe 的 cs3.html 页面
```
<script>
    parent.parent.location.hash = self.location.hash.substring(1);
</script>
```
之后老规矩，开启两个 http 服务器：

![](http://upload-images.jianshu.io/upload_images/6851923-11fbc986d9579e9f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里为了图方便，将 cs1,2,3 都放在同个文件夹下，实际情况的话 cs1.html 和 cs3.html 要与 cs2.html 分别放在不同的服务器才对。

之后打开浏览器访问 localhost:8080/cs1.html，注意不是 8081，就可以看到获取到的数据了，此时页面的 hash 值也已经改变。

![](http://upload-images.jianshu.io/upload_images/6851923-a4017bd38124a49b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

缺点：
- 数据直接暴露在了 url 中
- 数据容量和类型都有限

### 2、window.name:
window.name（一般在 js 代码里出现）的值不是一个普通的全局变量，而是当前窗口的名字，要注意的是每个 iframe 都有包裹它的 window，而这个 window 是top window 的子窗口，而它自然也有 window.name 的属性，window.name 属性的神奇之处在于 name 值在不同的页面（甚至不同域名）加载后依旧存在（如果没修改则值不会变化），并且可以支持非常长的 name 值（2MB）。

举个简单的例子：你在某个页面的控制台输入：
```
window.name = "Hello World";
window.location = "http://www.baidu.com";
```
页面跳转到了百度首页，但是 window.name 却被保存了下来，还是 Hello World，跨域解决方案似乎可以呼之欲出了：

首先创建 a.html 文件：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>a.html</title>
</head>
<body>
    <script>
	let data = '';
	const ifr = document.createElement('iframe');
	ifr.src = "http://localhost:8081/b.html";
	ifr.style.display = 'none';
	document.body.appendChild(ifr);
	ifr.onload = function() {
	    ifr.onload = function() {
	        data = ifr.contentWindow.name;
		console.log('收到数据:', data);
	    }
	    ifr.src = "http://localhost:8080/c.html";
	}
    </script>
</body>
</html>
```
再创建 b.html 文件：
```
<script>
   window.name = "你想要的数据!";
</script>
```
`http://localhost:8080/a.html`在请求远端服务器`http://localhost:8081/b.html`的数据，我们可以在该页面下新建一个 iframe，该 iframe 的 src 属性指向服务器地址(利用 iframe 标签的跨域能力)，服务器文件 b.html 设置好 window.name 的值。
但是由于 a.html 页面和该页面 iframe 的 src 如果不同源的话，则无法操作 iframe 里的任何东西，所以就取不到 iframe 的 name 值，所以我们需要在 b.html 加载完后重新换个 src 去指向一个同源的 html 文件，或者设置成` 'about:blank;'` 都行，这时候我只要在 a.html 相同目录下新建一个 c.html 的空页面即可。如果不重新指向 src 的话直接获取的 window.name 的话会报错：

![](http://upload-images.jianshu.io/upload_images/6851923-64197c24207f0316.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

老规矩，打开两个 http 服务器：

![](http://upload-images.jianshu.io/upload_images/6851923-5bbac92bf7e0b900.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开浏览器就可以看到结果：

![](http://upload-images.jianshu.io/upload_images/6851923-53a93aeae9090de9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 3、postMessage:
postMessage 是 HTML5 新增加的一项功能，跨文档消息传输(Cross Document Messaging)，目前：Chrome 2.0+、Internet Explorer 8.0+, Firefox 3.0+, Opera 9.6+, 和 Safari 4.0+ 都支持这项功能。

首先创建 a.html 文件
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>a.html</title>
</head>
<body>
    <iframe src="http://localhost:8081/b.html" style='display: none;'></iframe>
    <script>
	window.onload = function() {
	    let targetOrigin = 'http://localhost:8081';
	    window.frames[0].postMessage('我要给你发消息了!', targetOrigin);
	}
	window.addEventListener('message', function(e) {
	    console.log('a.html 接收到的消息:', e.data);
	});
    </script>
</body>
</html>
```
创建一个 iframe，使用 iframe 的一个方法 postMessage 可以向`http://localhost:8081/b.html`发送消息，然后监听 message，可以获得其他文档发来的消息。
同样的 b.html 文件：
```
<script> 
window.addEventListener('message', function(e) { 
    if(e.source != window.parent) { 
        return; 
    } 
    let data = e.data;
    console.log('b.html 接收到的消息:', data); 
    parent.postMessage('我已经接收到消息了!', e.origin); });
</script>
```
同样的开启 http 服务器，在浏览器中打开：

![](http://upload-images.jianshu.io/upload_images/6851923-445054651d2f2581.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4、document.domain降域:
对于主域相同而子域不同的情况下，可以通过设置 document.domain 的办法来解决，具体做法是可以在 `http://www.example.com/a.html`和`http://sub.example.com/b.html`两个文件分别加上 `document.domain = "a.com"`；然后通过 a.html 文件创建一个 iframe，去控制 iframe 的 window，从而进行交互，当然这种方法只能解决主域相同而二级域名不同的情况，如果你异想天开的把 script.example.com 的 domain 设为 qq.com 显然是没用的，那么如何测试呢？
测试的方式稍微复杂点，需要安装 nginx 做域名映射，如果你电脑没有安装 nginx，请先去安装一下: [nginx news](http://link.zhihu.com/?target=http%3A//nginx.org/)
先创建一个 a.html 文件：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>a.html</title>
</head>
<body>
    <script>
	document.domain = 'example.com';
	let ifr = document.createElement('iframe');
	ifr.src = 'http://sub.example.com/b.html';
	ifr.style.display = 'none';
	document.body.append(ifr);
	ifr.onload = function() {
	    let win = ifr.contentWindow;
	    alert(win.data);
	}
    </script>
</body>
</html>
```
再创建一个 b.html 文件：
```
<script>
    document.domain = 'example.com';
    window.data = '传送的数据：1111';
</script>
```
同样的开启 http 服务器，在浏览器中打开：
这时只是开启了两个 http 服务器，还需要通过 nginx 做域名映射，将`Example Domain`映射到 `localhost:8080`，`sub.example.com` 映射到 `localhost:8081` 上
打开操作系统下的 hosts 文件：mac 是位于 `/etc/hosts` 文件，并添加：
```
127.0.0.1 www.example.com
127.0.0.1 sub.example.com
```
这样在浏览器打开这两个网址后就会访问本地的服务器。
之后打开 nginx 的配置文件：`/usr/local/etc/nginx/nginx.conf`，并在 http 模块里添加：
```
server {
	listen 80;
	server_name www.example.com;
	location / {
		proxy_pass http://127.0.0.1:8080/;
	}
}
server {
	listen 80;
	server_name sub.example.com;
	location / {
		proxy_pass http://127.0.0.1:8081/;
	}
}
```
上面代码的意思是：如果访问本地的域名是`Example Domain`就由 localhost:8080 代理该请求。
所以我们这时候在打开浏览器访问`Example Domain`的时候其实访问的就是本地服务器 localhost:8080。

-----
**参考资料**:
- [关于跨域，你想知道的全在这里](https://zhuanlan.zhihu.com/p/25778815)
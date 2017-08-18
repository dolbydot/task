### 对于 HTTP 协议而言，HTML、CSS、JS、JSON 的本质都是什么？
对于HTTP协议而言，HTML、CSS、JS、JSON都是符合相应语法的字符串，浏览器会通过HTTP响应头的'Content-Type'属性的值来解析响应体中的内容。

Content-Type是返回消息中非常重要的内容，表示后面的文档属于什么MIME类型。如：
重要的MIME类型有text/html，text/css，text/javascript，application/json。

### 使用数组拼接出如下字符串 ，其中styles数组里的个数不定
```
<dl class="product"><dt>女装</dt><dd>短款</dd<dd>冬季</dd><dd>春装</dd></dl>
```
方法一：forEach()方法
```
var prod = {
    name: '女装',
    styles: ['短款', '冬季', '春装']
};
function getTpl(data) {
    var a = '<dl class="product"><dt>'
        + prod.name
        + '</dt>';
    var b = '';
    prod.styles.forEach(function (value) {
        b += '<dd>' + value + '</dd>';
    });
    return a + b + '</dl>';
};
var result = getTpl(prod);  
console.log(result);
```
方法二：map()方法
```
var prod = {
    name: '女装',
    styles: ['短款', '冬季', '春装']
};
function getTpl2(data) {
    return '<dl class="product"><dt>'
        + prod.name
        + '</dt>'
        + prod.styles.map(value => '<dd>' + value + '</dd>').join('')
        + '</dl>';
}
console.log(getTpl2(prod));
```

### 写出两种以上声明多行字符串的方法
例如：这段字符串很长，如何多行优雅的显示
```
var str = 'abcdeabcdeabcdeancdeabcdeabcdeabcdeancdeabcdeabcdeabcdeancdeabcdeabcdeabcdeancde'
```
方法一：es6语法
```
var str = `abcdeabcde
abcdeancde
abcdeabcde
abcdeancde
abcdeabcde
abcdeancde
abcdeabcde
abcdeancde`;
console.log(str);
```
方法二：反斜杠加换行符
```
var str = 'abcdeabcde\nabcdeancde\nabcdeabcde\nabcdeancde\nabcdeabcde\nabcdeancde'
console.log(str);
```

### 补全如下代码,让输出结果为字符串: `hello\\饥人谷`
```
var str = 'hello\\\\饥人谷';
console.log(str);
```

### 以下代码输出什么?为什么
```
var str = 'jirengu\nruoyu';
console.log(str.length); //13,因为字面量(转义序列)\n作为一个字符来解析。
```

### 写一个函数，判断一个字符串是回文字符串，如 abcdcba是回文字符串, abcdcbb不是
```
function palindrome(str) {
    return str == str.split('').reverse().join('');
}
console.log(palindrome('abjldjk'));
console.log(palindrome('abcdedcba'));
```

### 写一个函数，统计字符串里出现出现频率最多的字符
```
var str = 'fasjlfjlaskjopiausvjkalvjkajfdasjfoiasjfdlaksjfklasj';
var res10 = str.split('')
    .reduce(function (acc, curr) {
        if (acc[curr]) {
            acc[curr]++;
            return acc;
        }
        else {
            acc[curr] = 1;
            return acc;
        }
    }, {});
var max = ['', 0];
for (var key in res10) {
    if (res10[key] > max[1]) {
        max = [key, res10[key]]
    }
}
console.log(max[0]); //j
```
### 写一个camelize函数，把my-short-string形式的字符串转化成myShortString形式的字符串，如
```
function camelize(a){
    return a.split('-')
    .map(function(value,index){
        if(index==0){
            return value;
        }else{
            return value[0].toUpperCase()+value.substring(1);
        }
    })
    .join('');
}
console.log(camelize("background-color"));
console.log(camelize("list-style-image"));
```

### 写一个 ucFirst函数，返回第一个字母为大写的字符
```
function ucFirst(str){
 var a=str[0].toUpperCase();
 var b=str.substring(1);
 return a+b;
}
console.log(ucFirst("hunger")); //Hunger
```

### 写一个函数truncate(str, maxlength), 如果str的长度大于maxlength，会把str截断到maxlength长，并加上...，如
```
function truncate(str, maxlength){
if(str.length>maxlength){
    var arr=str.split('').slice(0,maxlength);
    arr[maxlength]='...';
    console.log(arr.join('')); 
}else{
    console.log(str);
}
}
truncate("hello, this is hunger valley,", 10); //hello, thi...
truncate("hello world", 20); //hello world
```

### 什么是 JSON格式数据？JSON格式数据如何表示对象？window.JSON 是什么？
- JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。是JavaScript的一个严格的子集但不从属于javascript。  易于人阅读和编写，同时也易于机器解析和生成(网络传输速度)。
- JSON可表示简单值(字符串、数值、布尔值和null)、对象(对象的值可以是简单值或复杂数据类型的值)、数组(数组的值可以是简单值、对象或数组)，可以嵌套，不支持undefined、变量、函数和对象实例(如正则表达式和日期)。
- 表示对象：
    - 数据在名称/值对中:名称/值对组合中的名称写在前面（在双引号中），值对写在后面(同样在双引号中)，中间用冒号:隔开
    - 数据由逗号分隔
    - 花括号保存对象
    - 方括号保存数组名称/值对
```
["one", "two", "three"]

{
    "one": 1,
    "two": 2,
    "three": 3
}

{"names": ["张三","李四"]}

[{ "name": "张三" },{ "name": "李四" }]
```
- window.JSON:
    - window.JSON是ECMAScript 5定义的一个原生的浏览器内置对象，用来检测对JSON的支持情况；
    - JSON对象内置了JSON.parse()和JSON.stringify()方法；
    - 当HTML页面指定了DOCTYPE且浏览器模式为IE8时，才支持内置的window.JSON对象,IE8版本以上才内置支持JSON.parse()函数方法。
```
if(window.JOSN){
   jsonObj2 = JSON.parse(json);
}else{
}
```

### 如何把JSON 格式的字符串转换为 JS 对象？如何把 JS对象转换为 JSON 格式的字符串?
stringify()方法将JS对象序列化成JSON字符串，parse()方法将JSON字符串反序列化成JS对象，借助这两个方法可以实现对象的深复制，详见[我的博客](http://www.jianshu.com/p/34af7f2f0d1f)。
```
var book = {
    name: 'dot',
    age: 2,
    food: ['apple', 'milk'],
    friend: {
        name: 'dolby',
        age: '3'
    }
}
var jsonText = JSON.stringify(book); //将JS对象序列化成JSON字符串
var bookCopy = JSON.parse(jsonText); //将JSON字符串反序列化成JS对象

console.log(jsonText); 
//{"name":"dot","age":2,"food":["apple","milk"],"friend":{"name":"dolby","age":"3"}}

console.log(bookCopy);
//{ name: 'dot',
//   age: 2,
//   food: [ 'apple', 'milk' ],
//   friend: { name: 'dolby', age: '3' } }
```


**参考资料**：
- [*JavaScript对象和JSON*](https://segmentfault.com/a/1190000008825739)
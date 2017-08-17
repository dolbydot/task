### 引用类型有哪些？非引用类型有哪些
- 引用类型：
Object、Array、Date、RegExp、Function、Math、Global、Error，指的是保存在堆内存中的对象。当复制保存对象的某个变量时操作的是对象的引用，也就是指向该对象在内存中所在位置的指针，为对象添加属性时操作的是实际的对象，引用类型的值按引用访问。

- 三个特殊的引用类型：
Boolean、Number、String：也叫基本包装类型，每当读取一个基本类型值时，后台会创建一个对应的基本包装类型的对象，从而让我们能调用一些方法来操作这些数据。
不建议显式地创造基本包装类型对象。

- 基本类型（非引用类型）：
string、boolean、null、undefined、number、symbol，这六种基本类型指的是保存在栈内存中的简单数据段，基本类型的值按值访问。

### 如下代码输出什么？为什么
```
var obj1 = {a:1, b:2};
var obj2 = {a:1, b:2};
console.log(obj1 == obj2);  //false 原因：变量obj1和obj2中保存的是指向对象在内存中位置的指针，也就是说obj1和obj2引用的是堆内不同的两个对象，所以不相等，返回false
console.log(obj1 = obj2);  //{a:1,b:2} 原因：赋值操作，也就是obj2将储存在变量对象中的值（即指向对象位置的指针）复制了一份放到obj1的内存空间中，这时obj1和obj2都指向堆内的同一个对象
console.log(obj1 == obj2);  //true 指向同一个对象了所以再判断相当与否就返回true
```

### 如下代码输出什么? 为什么
```
var a = 1
var b = 2
var c = { name: '饥人谷', age: 2 }
var d = [a, b, c]

var aa = a
var bb = b
var cc = c //复制指针
var dd = d //复制指针

a = 11
b = 22
c.name = 'hello' //改变堆内存中c.name值为hello
d[2]['age'] = 3 //改变堆内存中c.age值为3
console.log(aa)     //1 原因：a是基本类型值，按值传递给aa，所以aa为1，之后除非显式地指明aa=11，打印的aa就是11，不然aa得到的就是a的值1，不会再改变。如果把a=11放到var aa=a前面去，打印aa也是11，以下打印bb原理相同所以不作解释。
console.log(bb)     //2 原因：b是基本类型值，按值传递给bb，所以bb为2
console.log(cc)    //{name:"hello",age:3} 原因：c是引用类型的值，值按引用访问，首先将变量c指向堆内对象位置的指针复制给了cc，所以cc与c引用的是同一个对象，接着变量c的name属性值被修改为"hello"，d[2]['age']=3意为将数组d中索引为2的项，也就是变量c的age属性的值修改为3，由于指针相同，cc也可以访问到c的属性和修改后的值，所以打印cc得到{name:"hello",age:3} 
console.log(dd)    //[1,2,{name:"hello",age:3}] 原因：d也是引用类型的值，赋值操作后dd和d引用的是内存中的同一对象，a和b是基本类型按值传递，dd指针指向的内存中保存的c的值已经改变，使用修改之后的值。
```
### 如下代码输出什么? 为什么
```
var a = 1
var c = { name: 'jirengu', age: 2 }

function f1(n){
  ++n
}
function f2(obj){
  ++obj.age
}

f1(a) 
f2(c) 
f1(c.age) 
console.log(a)  //1 原因：调用f1(a)，实际上是向f1(n)函数内传递了一个参数a，而a是基本类型，值为1，所以实际上f1内发生的是n = a = 1，所以++n和a没关系，打印出来的a的值没变化
console.log(c) //{name:"jirengu",age:3} 原因：c是引用类型的值，调用f2(c)，即将变量c指向堆内对象位置的指针当作参数传递给函数f2(obj)，实际上在f2内发生的是obj=c={name:"jirengu",age:2}，这两个变量就指向同一内存，接着执行++c.age，即++2，执行完毕后age值变为3，所以obj{name:"jirengu",age:3}，obj和c引用的是同一对象所以c可以访问到修改后的值，所以打印c得到和obj相同的结果{name:"jirengu",age:3}
```
### 过滤如下数组，只保留正数，直接在原数组上操作
```
var arr = [3, 1, 0, -1, -3, 2, -5]
function filter(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= 0) {
            arr.splice(i, 1); //删除数组第I项位置的值
            i--; //每删除一项，数组长度就减1，所以为了得到正确的结果必须加上i--
        }
    }
}
filter(arr);
console.log(arr); // [3,1,2]
```
### 过滤如下数组，只保留正数，原数组不变，生成新数组
```
var arr = [3, 1, 0, -1, -3, 2, -5]
function filter(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
var arr2 = filter(arr)
console.log(arr2)  // [3,1,2]
console.log(arr)  // [3,1,0,-1,-3,2,-5]
```
### 写一个深拷贝函数，用两种方式实现
[浅拷贝与深拷贝](http://www.jianshu.com/p/34af7f2f0d1f)
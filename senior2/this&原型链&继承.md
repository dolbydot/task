### this相关问题
##### apply、call 、bind的作用以及区别
[call、apply和bind方法的用法以及区别](https://www.jianshu.com/p/bc541afad6ee)

##### 以下代码输出什么?
```
var john = { 
  firstName: "John" 
}
function func() { 
  alert(this.firstName + ": hi!")
}
john.sayHi = func
john.sayHi()
```
输出：John: hi!
解析：`john.sayHi()`可理解为`john.sayHi.call(john)`，即this指向john，输出即为`John.firstName + ":hi!"`

##### 下面代码输出什么，为什么
```
func() 
function func() { 
  alert(this)
}
```
输出：window对象
解析：`func()`可理解为`func.call(null)`，浏览器里有一条规则：
如果你传的 context 就 null 或者 undefined，那么 window 对象就是默认的 context（严格模式下默认 context 是 undefined）
因此上面的打印结果是 window。如果你希望这里的 this 不是 window，很简单：
```
func.call(obj) // 那么里面的 this 就是 obj 对象了
```

##### 下面代码输出什么
```
document.addEventListener('click', function(e){
    console.log(this);
    setTimeout(function(){
        console.log(this);
    }, 200);
}, false);
```
点击页面，依次输出：document和window对象
解析：点击页面监听click事件属于方法调用，this指向事件源DOM对象，即`obj.fn.apply(obj)`，setTimeout内的函数属于回调函数，可以这么理解，`f1.call(null,f2)`，所以this指向window

##### 下面代码输出什么，why
```
var john = { 
  firstName: "John" 
}

function func() { 
  alert( this.firstName )
}
func.call(john)
```
解析：call中已传入第一个参数john，即this指向John
输出：John

##### 以下代码有什么问题，如何修改
```
var module= {
  bind: function(){
    $btn.on('click', function(){
      console.log(this) //this指什么
      this.showMsg();
    })
  },
  
  showMsg: function(){
    console.log('hello');
  }
}
```
问题：`this.showMsg()`的this指向$btn，而$btn上没有showMsg这个方法

解决办法有多种：
1. 将`this.showMsg()`改为`module.showMsg()`或`module.showMsg.call(module)`
2. 在事件监听的回调函数后绑定this，即`this.showMsg();}.bind(this))`，bind中的this指向的是module，所以直接写`bind(module)`也可。
3. 在异步操作之后this可能会发生改变，所以在这段代码中，在事件执行前将this的值保存为_this，最后通过`_this.showMsg()`调用方法，也可以得到正确结果
4. 用ES6语法中的箭头函数，就不用写方法2中糟心的代码了，既然要改就全改了吧：
```
var module = {
    bind() {
        $btn.on('click', () => {
            console.log(this)
            this.showMsg();
        })
    },
    showMsg() {
        console.log('hello');
    }
}
```

-----

### 原型链相关问题
##### 有如下代码，解释Person、 prototype、__proto__、p、constructor之间的关联。
```
function Person(name){
    this.name = name;
}
Person.prototype.sayName = function(){
    console.log('My name is :' + this.name);
}
var p = new Person("Dot")
p.sayName();
```
关系：
- `p.__proto__===Person.prototype`
- `Person.prototype.constructor===Person`
- `p.constructor===Person`

##### 上例中，对对象 p可以这样调用 p.toString()。toString是哪里来的? 画出原型图?并解释什么是原型链。
前面讲面向对象的博客里，我画了这么张图，放在这里也勉强合适：

![继承#禁止转载](http://upload-images.jianshu.io/upload_images/6851923-b67158c7b1c51369.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

p是Person构造函数的实例，p首先会查找自身有没有toString()这个方法，显然是没有的，所以会顺着__proto__原型链逐级向上查找，直到Object.prototype为止，如果还没有找到就返回null，期间找到了就调用该方法。

记住：
- 当 new 一个构造函数的时候会创建一个实例，`构造函数.prototype === 实例.__proto__`
- 一切函数都是由 Function 这个函数创建的，所以`Function.prototype === 被创建的函数.__proto__`
- 一切函数的原型对象都是由 Object 这个函数创建的，所以`Object.prototype === 一切函数.prototype.__proto__`

表述关系为：
- `p.__proto__===Person.prototype`，找到构造函数的原型，没有toString()方法于是继续查找
- `p.__proto__.__proto__===Object.prototype`，找到Object的原型对象
- `p.__proto__.__proto__.toString()===Object.prototype.toString()`
最后在Object.prototype中找到了toString()方法，所以此时就可以调用toString()方法了，这也叫做继承方法。

原型链：
每个构造函数都有一个原型对象，原型对象都包含指向其构造函数的指针，而实例都包含一个指向原型对象的__proto__指针，我们让原型对象等于另一个类型的实例，此时的原型对象将包含一个指向另一个原型的指针，以此为依据，层层推进，就构成了实例与原型的链条，称为原型链。
在访问对象的属性时，如果在对象本身中没有找到，则会去原型链中逐级向上查找，找到则返回该属性，如果遍历整个链都没有找到则返回undefined。
原型链一般实现为一个链表，这样就可以按照一定的顺序来查找，原型链是实现继承的主要方法。

##### 对String做扩展，实现如下方式获取字符串中频率最高的字符
```
var str = 'ahbbccdeddddfg';
var ch = str.getMostOften();
console.log(ch); //d , 因为d 出现了5次
```
增加如下代码：
```
String.prototype.getMostOften = function () {
    var res = this.split('')
        .reduce((acc, cur) => {
            if (acc[cur]) {
                acc[cur]++
                return acc
            } else {
                acc[cur] = 1
                return acc
            }
        }, {})

    var max = ['', 0]
    for (var key in res) {
        if (res[key] > max[1]) {
            max = [key, res[key]]
        }
    }
    console.log(max)
    return max[0]
}
```

##### instanceOf有什么作用？内部逻辑是如何实现的？
- 作用：判断一个对象是不是某个类型的实例
- 实现：A instanceof B的判断规则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线逐级向上查找能找到同一个引用，返回true，证明A是B类型的实例，否则返回false。
代码如下：
```
function instance(obj, type) {
    while (obj.__proto__) {
        // 以下判断条件换为 obj.__proto__.constructor === type 也可
        if (obj.__proto__ === type.prototype) {
            return true
        } else {
            // 以下return语句换乘 obj = obj.__proto__ 也可
            return instance(obj.__proto__, type)
        }
    }
    return false
}

console.log(instance([], Array))
console.log(instance(/.\d/, RegExp))
console.log(instance({}, Object))
```

-----

### 继承相关问题
##### 继承有什么作用?
继承机制使得不同的实例可以共享构造函数的原型对象上的属性和方法，提高了代码的复用性。

##### 下面两种写法有什么区别?
```
//方法1
function People(name, sex){
    this.name = name;
    this.sex = sex;
    this.printName = function(){
        console.log(this.name);
    }
}
var p1 = new People('Dot', 2)

//方法2
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}

Person.prototype.printName = function(){
    console.log(this.name);
}
var p1 = new Person('Dot', 2);
```
首先要知道构造函数里定义的都是实例的属性和方法。
方法1和方法2的区别在于printName方法所在的位置，方法1中的printName方法是实例的方法，也就是说每生成一个实例之后，实例的printName就会占用内存；方法2中的printName方法定义在构造函数的原型对象上（前面说过的`实例.__proto__ === 构造函数.prototype`），生成的所有实例都会共享原型对象上的所有方法，节省内存，这也印证了一个结论：公共方法写在原型对象上比较好。

##### Object.create 有什么作用？兼容性如何？
- 作用：`Object.create()`接收两个参数，作用是创建接收到的第一个参数的副本，第二个参数是可选的、额外传入副本里的属性，以第二个参数指定的任何属性都会传入副本中并覆盖已有的同名属性，但原型对象上的同名属性不会被改变。
也就是说使用此方法时是先clone再在子类上添加自己的属性和方法，以此实现原型式继承。
有代码如下：
```
var person = {
    name: 'dot',
    friends: ['a', 'b', 'c']
}

var anotherPerson = Object.create(person, {
    name: {
        value: 'dolby'
    }
})

console.log(anotherPerson.name)//dolby
console.log(person.name)//dot
```
- 兼容性：各大浏览器的最新版本（包括IE9）都部署了这个方法，可以写一个polyfill解决低版本浏览器问题：
```
if(!Object.create){
  Object.create = function(obj){
    function F(){}
    F.prototype = obj
    return new F()
  }
}
```

##### hasOwnProperty有什么作用？ 如何使用？
- 作用：检测一个属性到底存在于原型中还是实例中，这个方法从Object继承得来，只有在属性存在于实例中才返回true
- 使用：`实例.hasOwnProperty('属性名')`，返回true则属性存在于实例中，false则属性存在于原型中。
```
function Person() { }

Person.prototype = {
    name: 'dot',
    sex: 'female',
    age: 2,
    sayName() {
        console.log(this.name)
    }
}

var person1 = new Person()
var person2 = new Person()

console.log(person1.hasOwnProperty('name'))//false

person1.name = 'dolby'
console.log(person1.name)//dolby，来自实例
console.log(person1.hasOwnProperty('name'))//true

console.log(person2.name)//dot，来自原型
console.log(person2.hasOwnProperty('name'))//false

delete person1.name//删除实例属性，恢复实例与原型的连接
console.log(person1.name)//dot，来自原型
console.log(person1.hasOwnProperty('name'))//false
```

##### 如下代码中call的作用是什么?
```
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}
function Male(name, sex, age){
    Person.call(this, name, sex);    //这里的 call 有什么作用
    this.age = age;
}
```
作用：借用构造函数实现对实例属性的继承，这样既实现了函数复用，又保证每个实例具有自己的属性。本例中将this指向Person，实现在Male中继承Person的属性

##### 补全代码，实现继承 
```
function Person(name, sex){
    // todo ...
}

Person.prototype.getName = function(){
    // todo ...
};    

function Male(name, sex, age){
   //todo ...
}

//todo ...
Male.prototype.getAge = function(){
    //todo ...
};

var ruoyu = new Male('若愚', '男', 27);
ruoyu.printName();
```
```
function inherit(superType, subType) {
    var _prototype = superType.prototype
    _prototype.constructor = subType// 修改constructor指向
    subType.prototype = _prototype
}

function Person(name, sex) {
    this.name = name
    this.sex = sex
}

Person.prototype.getName = function () {
    console.log(this.name)
}

function Female(name, sex, age) {
    Person.call(this,name, sex)
    this.age = age
}

inherit(Person, Female)// Female继承Person

// 在继承函数之后写自己的方法，否则会被覆盖
Female.prototype.getAge = function () {
    console.log(this.age)
}

var dot = new Female('Dot', '女', 2)
dot.getName()
```
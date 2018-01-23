### OOP 指什么？有哪些特性
- OOP:Object-oriented programming 的缩写，即面向对象程序设计，其中两个最重要的概念就是类和对象。
类是具备了某些功能和属性的抽象模型，实际应用中需要的是一个个实体，也就是需要对类进行实例化，类在实例化之后就是对象。

- 特性：
    - 继承性：子类自动继承其父级类中的属性和方法，并可以添加新的属性和方法或者对部分属性和方法进行重写，继承增加了代码的复用性，让类与类之间产生了联系，提供了多态的前提
    - 多态性：子类继承了来自父级类中的属性和方法，并对其中部分方法进行重写。（比如函数的length和数组的length都继承自对象但作用不同），提高了代码的扩展性和可维护性
    - 封装性：将一个类的使用和实现分开，隐藏对象的属性和实现细节，仅对外提供公共访问方式，提高代码复用性和安全性。

- 原则：
    - 开闭原则：
对扩展开放：应用的需求改变时我们可以对模块进行扩展，使其具有满足改变的新行为
对修改封闭：对模块行为进行扩展是，不必改变模块的源码或二进制代码
    - 接口隔离：
不要依赖用不到的接口

### 如何通过构造函数的方式创建一个拥有属性和方法的对象? 
```
function People(name, age) {
    this.name = name
    this.age = age
    this.sayName = function () {
        console.log(this.name)
    }
    this.sayAge = function () {
        console.log(this.age)
    }
}

var female = new People('dot', 2)
console.log(female)//People { name: 'dot', age: 2, sayName: f, sayAge: f }
console.log(female.sayName())//dot
console.log(female.sayAge())//2
```

### prototype 是什么？有什么特性 
- 每个函数都有`prototype`这个属性，对应值是原型对象
- 每个对象都有个内部属性`__proto__`，每个实例的`__proto__`指向创建它的构造函数的`prototype`
- 一切函数都是由 Function 这个函数创建的，所以`Function.prototype === 被创建的函数.__proto__`
- 一切函数的原型对象都是由 Object 这个函数创建的，所以`Object.prototype === 一切函数.prototype.__proto__`


### 画出如下代码的原型图
```
function People (name){
  this.name = name;
  this.sayName = function(){
    console.log('my name is:' + this.name);
  }
}

People.prototype.walk = function(){
  console.log(this.name + ' is walking');  
}

var p1 = new People('饥人谷');
var p2 = new People('前端');
```

![面向对象原型图](http://upload-images.jianshu.io/upload_images/6851923-0ee36ac8998c1287.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 创建一个 Car 对象，拥有属性name、color、status；拥有方法run，stop，getStatus 
```
function Car(name, color, status) {
    this.name = name
    this.color = color
    this.status = status

    this.run = function () {
        if (this.status === 1) {
            console.log('I am running')
        }
    }

    this.stop = function () {
        if (this.status === 0) {
            console.log('I am stopped')
        }

    }

    this.getStatus = function () {
        console.log(this.status)
    }
}

var myCar = new Car('Audi', 'black', '1')
myCar.getStatus()
```

### 创建一个 GoTop 对象，当 new 一个 GotTop 对象则会在页面上创建一个回到顶部的元素，点击页面滚动到顶部。拥有以下属性和方法

1.  `ct`属性，GoTop 对应的 DOM 元素的容器
2.  `target`属性， GoTop 对应的 DOM 元素
3.  `bindEvent` 方法， 用于绑定事件
4.  `createNode` 方法， 用于在容器内创建节点

[代码](https://github.com/dolbydot/task/blob/master/senior1/goTop.html)
[预览](https://dolbydot.github.io/task/senior1/goTop.html)

### 使用木桶布局实现一个图片墙
[瀑布流布局与木桶布局](https://www.jianshu.com/p/37270bf761f0)

-----
 **参考资料**：
- [*this 的值到底是什么？一次说清楚*](https://zhuanlan.zhihu.com/p/23804247)
- [*谈谈你对原型、原型链、 Function、Object 的理解*](https://zhuanlan.zhihu.com/p/22473059)
- [*js中call、apply、bind那些事*](https://qianlongo.github.io/2016/04/26/js%E4%B8%ADcall%E3%80%81apply%E3%80%81bind%E9%82%A3%E4%BA%9B%E4%BA%8B/#more)
- [*mdn bind()*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [*深入理解javascript原型和闭包(6)—继承*](http://www.cnblogs.com/wangfupeng1988/p/3979985.html)
- [*Javascript中bind()方法的使用与实现*](https://segmentfault.com/a/1190000002662251)
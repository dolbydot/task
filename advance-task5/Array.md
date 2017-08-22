>以下蓝色字并无链接，只为醒目，只为醒目，只为醒目！更多[示例](http://www.jianshu.com/p/e24a765b02af)<----只有这个是真链接

ECMAScript中的数组的每一项可以保存任何类型的数据，数组大小可随着数据的添加自动增长以容纳新增数据。
### 创建数组
#### 创建数组之——Array构造函数
```
var colors = new Array(); //创建一个数组
var colors = new Array(20); //创建一个length值为20的数组
var colors = new Array("red","blue"); //创建一个包括两个字符串值的数组
var colors = Array(3); //使用Array构造函数时可省略new操作符，创建一个包含3项的数组
var colors = Array("green"); //创建一个包含一项，即字符串"green"的数组
```
#### 创建数组之——数组字面量
```
var colors = ["red","blue","green"]; //创建一个包含三个字符串的数组
var names = []; //创建一个空数组
```
### 编辑数组
读取和设置数组的值时，要使用方括号并提供项目索引。
```
var colors = ['red', 'blue', 'green']; //定义一个字符串数组
console.log(colors[0]); //打印第一项 red

colors[2] = 'black'; //修改第三项
colors[3] = 'brown'; //新增第四项
console.log(colors.length); //打印数组的长度 4

colors.length = 2 //将数组长度改为2
console.log(colors[2]); //打印数组索引为2的项 undefined

colors.length = 4; //将数组长度改为4
console.log(colors[2]); //打印数组索引为2的项 undefined
console.log(colors[3]); //打印数组索引为3的项 undefined

colors[colors.length] = 'pink'; //在数组末尾添加新项
colors[colors.length] = 'yellow'; // 在数组末尾添加新项
console.log(colors); //打印数组 ['red','blue',undefined,undefined,'pink','yellow']

colors[99] = 'white'; //在位置99添加一项
console.log(colors.length); //打印数组长度 100
```
### 检测数组
只有一个全局执行环境
```
if (value instanceof Array) {
    //对数组执行某些操作
}
```
不区分在哪个全局执行环境，只判断是不是数组
```
if (Array.isArray(value)) {
    //对数组执行某些操作
}
```
示例：
```
var colors = ['red', 'blue', 'green'];
Array.isArray(colors); //true
```
### 方法
方法就是函数，函数主要看三个点：函数名、参数、返回值，统称为函数签名。
#### 转换方法
所有对象都具有[toLocalString()](),[toString()](),[valueOf()]()方法。
- 调用数组的toString()方法返回数组中每个值的字符串形式拼接而成的以逗号分隔的字符串，实际上为创建这个字符串会调用数组的每一项的toString()方法；
- 调用valueOf()方法返回的还是数组；
- 调用toLocaleString()方法返回数组中每个值的字符串形式拼接而成的以逗号分隔的字符串，实际上为创建这个字符串会调用数组的每一项的toLocaleString()方法，很多情况下toString()和toLocaleString()得到的结果相同；
```
var colors = ['red','blue','green'];
console.log(colors.toString()); //red,blue,green
console.log(colors.toLocaleString()); //red,blue,green
console.log(colors.valueOf()); //["red", "blue", "green"]
console.log(colors); //["red", "blue", "green"]
如果把console.log替换为alert，以上4个得到的结果相同。
```
再看一个证明toString()方法与toLocaleString()方法不同的例子：
```
var str1 = {
    toString: function () {
        return "dot";
    },
    toLocaleString: function () {
        return "dolby";
    }
};
var str2 = {
    toString: function () {
        return 2;
    },
    toLocaleString: function () {
        return 3;
    }
};
var str = [str1, str2];
console.log(str); //[{...},{...}]
console.log(str.toString()); //dot,2
console.log(str.toLocaleString()); //dolby,3
```
数组继承的toLocalString(),toString(),valueOf()方法默认情况下都以逗号分隔字符串的形式返回数组项，join()方法可改变这一点。

[join()]()方法接受一个参数，即用作分隔符的字符串，返回包含所有数组项的字符串，不过不给join()方法传入参数或者传入undefined，则使用默认的逗号作为分隔符。
如果数组中的某一项值为null或undefined，该值在join(),toLocalString(),toString(),valueOf()方法返回的结果中以空字符串表示。
```
var colors = ['red', 'blue', null, 'green', undefined];
console.log(colors.join('||')); //red||blue||||green||
console.log(colors.join('-')); //red-blue--green-
```
另：join()经常与[字符串的split()]()方法一起使用。split()根据传入的字符将字符串分割为数组，返回生成的数组，join将数组拼接成字符串。
```
var str = '1-2-3-4-5';
console.log(str.split('-').join('')); //12345
```

#### 栈方法
栈是一种后进先出的数据结构（可想象为死胡同）。适当的方法让数组可以表现得像栈一样，栈中项的推入[push()]()和弹出[pop()]()只发生在栈的顶部。
push()方法接收任意数量的参数并把它们按顺序逐个添加到数组末尾，返回的是修改后数组的长度；pop()方法从数组末尾移除最后一项，减少数组length值，返回移除的项。
```
var colors = ['red', 'blue', null, 'green', undefined];
console.log(colors.push('white', 'black')); //7
colors[7] = 'pink';
console.log(colors.length); //8

var item = colors.pop();
console.log(item); //pink
console.log(colors); //["red", "blue", null, "green", undefined, "white", "black"]
```

#### 队列方法
队列是一种先进先出的数据结构。有两种操作方法。
- 在数组前端移除项[shift()](),末端添加项[push()]()
- 在数组前端添加项[unshift()]()，末端移除项[pop()]()
```
var colors = Array();
var count = colors.push('red', 'pink');
console.log(count); //2
count = colors.push('white');
var item = colors.shift();
console.log(item); //red
console.log(colors); //["pink","white"]
var count1 = colors.unshift('blue', 'yellow');
console.log(count1); //4
var item1 = colors.pop();
console.log(item1); //white 
console.log(colors); //["blue", "yellow", "pink"]
```

#### 重排序方法
- [reverse()]()反转数组项顺序——简单粗暴，适用于仅需要反转的场景
- [sort()]()比较后重排序——调用每个数组项的toString()方法后比较得到的字符串，默认将比较后的值从小到大排列，这种默认方法不是最佳方案，所以sort()方法需要接收一个比较函数作为参数以便我们指定排序规则。

reverse()和sort()方法的返回值是经过重排序之后的数组，即原数组发生了改变。
```
// 定义一个数组并反转数组项，原数组发生了改变
var values = [3, 8, -6, 1, 9];
values.reverse(); //反转数组项
console.log(values); //[9, 1, -6, 8, 3]

// 对于数值类型或者valueOf()返回数值类型的对象类型，做比较可以更简单
// 定义一个compare函数，
function compare1(value1, value2) {
    return value2 - value1; //做减法，比较的第二项大于第一项则排在前面，即降序排列，value1-value2即升序排列
}
values.sort(compare1); //将compare函数当作参数传递给sort()方法
console.log(values); //[9, 8, 3, 1, -6]


// 以下两个排序方法适用于大多数数据类型
// 升序排列
function compare2(value1, value2) {
    if(value1<value2) {
        return -1;
    }else if(value1>value2){
        return 1;
    }else{
        return 0;
    }
}
values.sort(compare2); 
console.log(values); //[-6, 1, 3, 8, 9]

// 降序排列
function compare3(value1, value2) {
    if(value1<value2) {
        return 1;
    }else if(value1>value2){
        return -1;
    }else{
        return 0;
    }
}
values.sort(compare3); 
console.log(values); // [9, 8, 3, 1, -6]
```

#### 操作方法
- [concat()]()会创建当前数组的一个副本，然后将接收到的参数的每一项作为新增项添加到这个副本末尾，返回新构建的数组，没有给concat()方法穿入参数的情况下它只会复制当前数组并返回副本。
- [slice()]()基于当前数组中的若干个项创建一个新数组，接受一到两个参数，即返回项的起始位置和结束为止但不包括结束位置的项，只有一个参数的情况下返回该参数指定位置开始到当前数组末尾的所有项。

concat()和slice()方法的返回新数组，即原数组不会被改变。
```
var colors = ['red', 'green', 'blue', 'pink'];
var colors1 = colors.concat();
var colors2 = colors.concat('yellow', ['black', 'brown']);
var color3 = colors.slice(1);
var color4 = colors.slice(2, 3);

console.log(colors1); //["red", "green", "blue", "pink"]
console.log(colors2); //["red", "green", "blue", "pink", "yellow", "black", "brown"]
console.log(color3); //["green", "blue", "pink"]
console.log(color4); //["green", "blue", "pink"]
console.log(colors); //["red", "green", "blue", "pink"]
```
- [splice()]()方法
splice()方法主要用途为向数组中插入项，该方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项则返回一个空数组），此方法会改变原始数组。
以下是用法：
    - 删除：可删除任意数量的项，2个参数，要删除的第一项的位置（包括第一项）和要删除的项数。
    - 插入：可向指定位置插入任意数量的项，最少3个参数，起始位置（在起始位置之前插入）、0（要删除的项数）、要插入的那一项，如要插入多个项，可再传入第4、第5以至任意多个项。
    - 替换：可向指定位置插入任意数量的项同时删除任意数量的项，最少3个参数，起始位置（从起始位置开始计算）、要删除的项数、要插入的那一项，如要插入多个项，可再传入第4、第5以至任意多个项，插入项数与删除项数不必一致。
```
var colors = ['red', 'green', 'blue', 'pink'];
var removed = colors.splice(0, 1);
console.log(removed); //["red"]
console.log(colors); //["green", "blue", "pink"]
removed = colors.splice(1, 0, 'yellow', 'white', 'white')
console.log(removed); //[]
console.log(colors); //["green", "yellow", "white", "white", "blue", "pink"]
removed = colors.splice(2, 1, 'yellowgreen');
console.log(removed); //["white"]
console.log(colors); //["green", "yellow", "yellowgreen", "white", "blue", "pink"]
```

#### 位置方法
- [indexOf()]()：从数组的位置0开始向后查找
- [lastIndexOf()]()：从数组的末尾开始向前查找

这两个方法都接收两个参数，要查找的项和（可选的）表示查找起点位置（包括起点位置）的索引。都返回要查找的项在数组中的位置，在没找到的情况下返回-1。比较第一个参数与数组中的每一项时要求全等，必须严格相等！
```
var values = [1, 2, 3, 4, 5, 4, 3, 2, 1];
console.log(values.indexOf(4)); //3
console.log(values.indexOf(4, 5)); //5
console.log(values.lastIndexOf(3)); //6
console.log(values.lastIndexOf(5, 1)); //-1
```

#### 迭代方法
ECMAScript5位数组定义了5个迭代方法，每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响this的值。
而第一个参数，也就是回调函数，接收三个参数：数组项的值，该项在数组中的位置和数组对象本身，一般可忽略第三个参数。
根据使用方法的不同，这个函数执行后的返回值可能会影响方法的返回值。

以下方法都不会影响原数组。
- [every()]()：对数组的每一项运行给定函数，如果该函数对每一项都返回true则返回true
- [some()]()：对数组中的每一项运行给定函数，如果该函数对任意一项返回true则返回true
- [filter()]()：对数组的每一项运行给定函数，返回该函会返回true的项组成的新数组
- [map()]()：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组
- [forEach()]()：对数组中的每一项运行给定函数，这个方法没有返回值

every()和some()就像逻辑与和逻辑非，用于查询数组中的项是否满足某个条件。
```
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var everyResult = numbers.every(function (item, index, arr) {
    return item > 2;
}, numbers);
console.log(everyResult); //false
var someResult = numbers.some(function (item, index, arr) {
    return item > 2;
}, numbers);
console.log(someResult);  //true
```
filter()过滤器，利用指定函数过滤出需要的项，适合查询符合某些条件的所有数组项。
```
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var filterResult = numbers.filter(function (item, index, arr) {
    return item > 2;
}, numbers)
console.log(filterResult); //[3, 4, 5, 4, 3]
```
map()中的每一项都是在原始数组中对应项上运行传入函数的结果，此方法适合创建包含的项与另一数组一一对应的数组。
```
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var mapResult = numbers.map(function (item, index, arr) {
    return item * 2;
}, numbers)
console.log(mapResult); //[2, 4, 6, 8, 10, 8, 6, 4, 2]
```
forEach()：对数组中的每一项运行给定函数，这个方法没有返回值，本质上与使用for循环迭代数组一样。
```
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var forEachResult = numbers.forEach(function (item, index, arr) {
    return item * item;
});
console.log(forEachResult); //undefined
```
因为没有返回值，所以打印undefined。

#### 归并方法
以下两个方法都会迭代数组的所有项然后构建一个最终返回的值，都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。
- [reduce()]()：从数组第一项开始逐个遍历到最后。
- [reduceRight()]()：从数组最后一项开始向前遍历到第一项。

作为第一个参数的函数接收四个参数：前一个值、当前值、项的索引、数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。
第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数是数组的第二项。
使用reduce()可以求数组中所有值之和。
```
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var sum = numbers.reduce(function (prev, cur, index, array) {
    return prev + cur;
});
console.log(sum); //25
```
reduceRight()与reduce()只是方向相反。
```
var numbers = [1, 2, 3, 4, 5, 6, 7];
var sum = numbers.reduceRight(function (prev, cur, index, array) {
    return prev - cur;
});
console.log(sum); //-14
```
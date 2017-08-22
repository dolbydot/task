# Math
### 写一个函数，返回从min到max之间的 随机整数，包括min不包括max 
```
function number(min, max) {
    var num = Math.floor(Math.random() * (max - min) + min);
    console.log(num);
}
number(1, 10);
```
### 写一个函数，返回从min都max之间的 随机整数，包括min包括max 
```
function number(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(num);
}
number(1, 10);
```
### 写一个函数，生成一个长度为 n 的随机字符串，字符串字符的取值范围包括0到9，a到 z，A到Z。
```
function getRandStr(len) {
    var strs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var possibleStr = '';
    for (var i = 0; i < len; i++) {
        //charAt()方法从一个字符串中返回指定的字符,接收一个参数index，一个介于0和字符串长度减1之间的整数
        possibleStr += strs.charAt(Math.floor(Math.random() * strs.length));
    } 
        return possibleStr;
}
var str = getRandStr(10);
console.log(str); //如：Irtg95rXBQ
```

### 写一个函数，生成一个随机 IP 地址，一个合法的 IP 地址为 0.0.0.0~255.255.255.255
```
function getRandIP() {
    var ipArr = [];
    for (var i = 0; i < 4; i++) {
        ipArr[i] = Math.floor(Math.random() * 256);
    }
    return ipArr.join('.');
}
var ip = getRandIP()
console.log(ip) // 10.234.121.45
```

### 写一个函数，生成一个随机颜色字符串，合法的颜色为#000000~ #ffffff
```
//方法一
function getRandColor() {
    var str = '0123456789abcdef';
    var possibleColor = '';
    for (var i = 0; i < 6; i++) {
        possibleColor += str.charAt(Math.floor(Math.random() * str.length));
    } 
        return '#' + possibleColor;
}
var color = getRandColor();
console.log(color);   // #3e2f1b

//方法二
function number(min, max) {
    var num = Math.floor(Math.random() * (max - min) + min);
    return num;
}
function getRandColor() {
    var possibleColor = '';
    for (var i = 0; i < 6; i++) {
        possibleColor += number(0, 16).toString(16);
    }
    return '#' + possibleColor;
}
var color = getRandColor();
console.log(color);   // #3e2f1b
```

# Array
### 数组方法里push、pop、shift、unshift、join、splice分别是什么作用？用 splice函数分别实现push、pop、shift、unshift方法。
- push()用于在数组末尾添加若干项并返回修改后数组的长度，pop()用于删除数组最后一项并返回该项，shift()用于删除数组第一项并返回该项，unshift()用于在数组前端添加若干项并返回新数组长度，这几种方法都会改变原始数组。
- join()根据传入的字符串参数将数组项拼接成字符串并返回包含所有数组项的字符串。
- splice()用于向数组中插入项，该方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项则返回一个空数组），此方法会改变原始数组。

```
//用splice实现push
var colors = ['red', 'green', 'blue'];
var pushArr = colors.splice(colors.length, 0, 'yellow', 'pink');
console.log(pushArr); //[]
console.log(colors); //[ 'red', 'green', 'blue', 'yellow', 'pink' ]

//用splice实现pop
var popArr = colors.splice(colors.length - 1, 1);
console.log(popArr); //[ 'pink' ]
console.log(colors); //[ 'red', 'green', 'blue', 'yellow' ]

//用splice实现shift
var shiftArr = colors.splice(0, 1);
console.log(shiftArr); //[ 'red' ]
console.log(colors); //[ 'green', 'blue', 'yellow' ]

//用splice实现unshift
var unshiftArr = colors.splice(0, 0, 'orange', 'white', 'black');
console.log(unshiftArr); //[]
console.log(colors); //[ 'orange', 'white', 'black', 'green', 'blue', 'yellow' ]
```

### 写一个函数，操作数组，数组中的每一项变为原来的平方，在原数组上操作
```
//方法一
function squareArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] *= arr[i];
    }
};
var arr = [2, 4, 6];
squareArr(arr);
console.log(arr); // [4, 16, 36]

//方法二
function squareArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i]=Math.pow(arr[i], 2);
    }
};
var arr = [2, 4, 6];
squareArr(arr);
console.log(arr); // [4, 16, 36]
```

### 写一个函数，操作数组，返回一个新数组，新数组中只包含正数，原数组不变
```
function filterPositive(arr) {
    var result = arr.filter(function (item, index) {
        return parseInt(item) > 0;
    })
    return result;
}
var arr = [3, -1, 2, '饥人谷', true]
var newArr = filterPositive(arr)
console.log(newArr) //[3, 2]
console.log(arr) //[3, -1,  2,  '饥人谷', true]
```

# Date 
### 写一个函数getChIntv，获取从当前时间到指定日期的间隔时间
```
function getChIntv(dateStr) {
    var targetDate = new Date(dateStr);
    var curDate = new Date();
    var offset = Math.abs(targetDate - curDate);
    var totalSeconds = Math.floor(offset / 1000);
    var seconds = totalSeconds % 60;
    var totalMinutes = Math.floor((offset / 1000) / 60);
    var minutes = totalMinutes % 60;
    var totalHours = Math.floor(totalMinutes / 60);
    var hours = totalHours % 24;
    var totalDays = Math.floor(totalHours / 24);
    var days = totalDays % 365;
    return '距dot生日还有 ' + days + '天 ' + hours + '时 ' + minutes + '分 ' + seconds + '秒'
}
var str = getChIntv("2017-09-02");
console.log(str);  // 距dot生日还有 11天 11时 11分 49秒
```

### 把hh-mm-dd格式数字日期改成中文日期
```
function getChsDate(date) {
    var result = [];
    var strs = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一'];
    var arr = date.split('-');
    var year = arr[0],
        month = arr[1],
        day = arr[2];
    year = year.split('').map(function (value) {
        return strs[+value];
    }).join('');
    month = strs[+month];
    day = strs[+day];
    return year + '年' + month + '月' + day + '日';
}
var str = getChsDate('1993-09-12');
console.log(str);  // 一九九三年九月十二日
```

### 写一个函数，参数为时间对象毫秒数的字符串格式，返回值为字符串。假设参数为时间对象毫秒数t，根据t的时间分别返回如下字符串:

- 刚刚（距当前时间不到1分钟时间间隔）
- N分钟前 (距当前时间大于等于1分钟，小于1小时)
- N小时前 (距离当前时间大于等于1小时，小于24小时)
- N天前 (距离当前时间大于等于24小时，小于30天)
- N个月前 (距离当前时间大于等于30天小于12个月)
- N年前 (t 距离当前时间大于等于12个月)
```
function friendlyDate(time) {
    var offset = +new Date - time;
    var seconds = 1000,
        minutes = seconds * 60,
        hours = minutes * 60,
        days = hours * 24,
        months = days * 30,
        years = months * 12;
    var t;

    if (offset >= years) {
        t = parseInt(offset / years);
        return t + '年前';
    }
    else if (offset >= months) {
        t = parseInt(offset / months)
        return t + '个月前';
    }
    else if (offset >= days) {
        t = parseInt(offset / days);
        return t + '天前';
    }
    else if (offset >= hours) {
        t = parseInt(offset / hours);
        return t + '小时前';
    }
    else if (offset >= minutes) {
        t = parseInt(offset / minutes);
        return t + '分钟前';
    }
    else if (offset >= seconds) {
        return '刚刚';
    }
}
var str = friendlyDate('1311111119999'); //  6年前（括号里的字符串值为1970年距字符串值表示的时间的毫秒数）
var str2 = friendlyDate('1503190042273'); //1天前
console.log(str, str2);
```
### \d, \w, \s, [a-zA-Z0-9], \b, ., *, +, ?, x{3}, ^,$分别是什么?
`\d`:匹配一个数字。等价于[0-9]。
例如， /\d/ 或者 /[0-9]/ 匹配"B2 is the suite number."中的'2'。
`\w`:匹配任意字母、数字或者下划线。等价于[A-Za-z0-9_]。
例如, /\w/ 匹配 "apple," 中的 'a'，"$5.28,"中的 '5' 和 "3D." 中的 '3'。
`\s`:匹配一个空白字符，包括空格、制表符、换页符和换行符。
等价于[ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]。
例如, /\s\w*/ 匹配"foo bar."中的' bar'。
`[a-zA-Z0-9]`:匹配任意字母、数字。
`\b`:匹配一个词的边界。
一个词的边界就是一个词不被另外一个词跟随的位置或者不是另一个词汇字符前边的位置。注意，一个匹配的词的边界并不包含在匹配的内容中。换句话说，一个匹配的词的边界的内容的长度是0。
例子：
/\bm/匹配“moon”中得‘m’；
/oo\b/并不匹配"moon"中得'oo'，因为'oo'被一个词汇字符'n'紧跟着。
/oon\b/匹配"moon"中得'oon'，因为'oon'是这个字符串的结束部分。这样他没有被一个词汇字符紧跟着。
/\w\b\w/将不能匹配任何字符串，因为一个单词中的字符永远也不可能被一个非词汇字符和一个词汇字符同时紧跟着。
`.`:匹配除回车(\r)、换行(/n)符之外的任何单个字符。等价于[^\n\r]
如/.n/将会匹配 "nay, an apple is on the tree" 中的 'an' 和 'on'，但是不会匹配 'nay'。
`*`:匹配前一个表达式0次或多次，等价于{0,}。
如/bo\*/会匹配 "A ghost boooooed" 中的 'booooo' 和 "A bird warbled" 中的 'b'，但是在 "A goat grunted" 中将不会匹配任何东西。
`+`:匹配前面一个表达式1次或者多次。等价于 {1,}。
如/a+/匹配了在 "candy" 中的 'a'，和在 "caaaaaaandy" 中所有的 'a'。
`?`:匹配前面一个表达式0次或者1次。等价于 {0,1}。
例如，/e?le?/ 匹配 "angel" 中的 'el'，和 "angle" 中的 'le' 以及"oslo' 中的'l'。
如果紧跟在任何量词 *、 +、? 或 {} 的后面，将会使量词变为非贪婪的（匹配尽量少的字符），和缺省使用的贪婪模式（匹配尽可能多的字符）正好相反。
例如，对 "123abc" 应用 /\d+/ 将会返回 "123"，如果使用 /\d+?/,那么就只会匹配到 "1"。
还可以运用于先行断言。
`x{3}`:量词限定符，一个给定组件x必须要出现3次才能满足匹配，即匹配'xxx'。
`^`:匹配输入的开始。
如果多行标志被设置为true，那么也匹配换行符后紧跟的位置，如/^A/并不会匹配"an A"中的'A'，但会匹配"An E"中的'A'。当'^'作为第一个字符出现在一个字符集合模式时会有不同的含义。
`$`:匹配输入的结束。
如果多行标志被设置为true，那么也匹配换行符前紧跟的位置，如/t$/并不会匹配"eater"中的't'，但会匹配"eat"中的't'。

### 写一个函数trim(str)，去除字符串两边的空白字符
```
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
console.log(trim(' hello world ')); //hello world
console.log(trim('   hello world   ')); //hello world
console.log(trim('hello world')); //hello world
```

### 写一个函数isEmail(str)，判断用户输入的是不是邮箱
```
function isEmail(str) {
    return /^\w+\.?\w+@\w+\.\w+$/.test(str);
}
console.log(isEmail('dolby.dot@gmail.com')); //true
console.log(isEmail('938661877@qq.com')); //true
```

### 写一个函数isPhoneNum(str)，判断用户输入的是不是手机号
```
function isPhoneNumber(str) {
    return /^1\d{10}$/.test(str);
}
console.log(isPhoneNumber(13871299999)); //true
console.log(isPhoneNumber(1387129999922)); //false
console.log(isPhoneNumber('13871299999zs')); //false
```

### 写一个函数isValidUsername(str)，判断用户输入的是不是合法的用户名（长度6-20个字符，只能包括字母、数字、下划线）
```
function isValidUsername(str) {
    return /^\w{6,20}$/.test(str);
}
console.log(isValidUsername('sajhdaskdjsdscsfdgdfgfhghfghfghfai-')); //false
console.log(isValidUsername('sajhdaskdjsdsc')); //true
```

### 写一个函数isValidPassword(str), 判断用户输入的是不是合法密码（长度6-20个字符，只包括大写字母、小写字母、数字、下划线，且至少包括两种）
```
function isValidPassword(str) {
    var count = 0;
    if (/^\w{6,20}$/.test(str)) {
        if (/[A-Z]/.test(str)) {
            count++;
        }
        if (/[a-z]/.test(str)) {
            count++;
        }
        if (/[0-9]/.test(str)) {
            count++;
        }
        if (/-/.test(str)) {
            count++;
        }
        if (count >= 2) {
            return true;
        }
    } return false;
}
console.log(isValidPassword('sa1h-'));
console.log(isValidPassword('jhdaskdjsdsc'));
console.log(isValidPassword('J21_3djsdsc'));
```

### 写一个正则表达式，得到如下字符串里所有的颜色
```
var re = /#[a-fA-F0-9]{6}/g;
var subj = "color: #121212; background-color: #AA00ef; width: 12px; bad-colors: f#fddee "
console.log(subj.match(re))  // ['#121212', '#AA00ef']
```

### 下面代码输出什么? 为什么? 改写代码，让其输出[""hunger"", ""world""].
```
var str = 'hello  "hunger" , hello "world"';
var pat =  /".*"/g;
str.match(pat); 
```
输出`[""hunger" , hello "world""]`，因为`/".*"/g`的意思是匹配str字符串中所有双引号""之间的的除回车和换行符之外的任意多个字符，而正则表达式默认下是贪婪模式, 也就是会匹配尽量长的 (第1个到最后1个) 双引号之间的内容，所以结果如上。
改写代码：
```
var str = 'hello  "hunger" , hello "world"';
var pat = /".*?"/g; //在量词后加上?可关闭贪婪模式
str.match(pat); //[""hunger"", ""world""]
```
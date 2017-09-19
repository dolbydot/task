### 轮播的实现原理是怎样的？如果让你来实现，你会抽象出哪些函数(or接口)供使用？（比如 play()） 
- 实现原理，以水平轮播图为例：
    - 布局：父容器相对定位，设定宽高为一个图片的宽高，设置overflow:hidden;溢出隐藏，父容器中设置一个图片容器，高度为图片高，宽度为图片宽*图片个数，所有图片水平排成一列，父容器底部设置绝对定位小圆点
    - 逻辑：通过移动内容块的位置，使内容块内部的元素达到切换效果，具体实现为：在尾部clone第一个元素，在头部clone最后一个元素并相应增加图片容器的宽度；当运动到clone首图片时，立即移动到真实首图片，当运动到clone尾图片时，就立即将其移动到真实尾图片，这样我们的肉眼看上去就是连贯循环的。当快速切换到不同页面时就需要知道当前正在展现的是哪一页，可以设置一个标记位，初始值为0，每次切换时这个标记位的值都要跟着改变。
    - 函数接口：
```
autoPlay()//自动循环播放
playNext()//切换到下一帧
playPre()//切换到上一帧
setBullet()//设置导航按钮切换效果
```

### 实现视频中的左右滚动无限循环轮播效果
[我的实现](https://dolbydot.github.io/task/advance-task17/carousel/)

### 实现一个渐变轮播效果, [效果范例416](http://book.jirengu.com/jirengu-inc/js-works/carousel/carousel-fade-jquery.html#)
[我的实现](https://dolbydot.github.io/task/advance-task17/gradient-carousel/)
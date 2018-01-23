### 瀑布流布局
在瀑布流布局中，每一个元素的宽度相同，高度不同，下图中的数字表示图片被添加的顺序，每次添加新的图片时，都将其放在高度最小的一栏，以保证每一栏的高度尽可能相近。

思路
假设我们将一组元素依次添加到某个容器中，每次添加的规则是这样：找到高度最低的列然后将当前元素插入到该列，若有几列的高度一样则从左往右排布；插入完成后更新该列的高度，按如此规则循环，直到所有元素添加到容器中。
通俗来说，我按顺序依次将元素渲染到页面，但它不一定按从左到右依次排列。

![瀑布流布局](http://upload-images.jianshu.io/upload_images/6851923-137705365e8ad683.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 实现一个瀑布流布局效果
[我的实现](https://dolbydot.github.io/task/advance-task18/waterFall/)
[我的代码地址](https://github.com/dolbydot/task/blob/master/advance-task18/waterFall/index.html)

##### 实现一个新闻瀑布流新闻网站
[我的代码地址](https://github.com/dolbydot/task/tree/master/advance-task18/waterFall-lazyLoad-Ajax)

### 木桶布局
选定一个基准高度，依次将图片等比压缩至基准高度，然后水平排列，当空间不够放不下了，就将前面水平排列的一行图片等比拉伸至整体宽度刚好充满容器。
最终的结果是，每一行的高度不固定、图片数不同，但图片的总宽度是相同的。

![木桶布局](http://upload-images.jianshu.io/upload_images/6851923-0020676587f808f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[我的实现](https://dolbydot.github.io/task/advance-task18/casksLayout.html)
[我的代码地址](https://github.com/dolbydot/task/blob/master/advance-task18/casksLayout.html)
## CSS

### 盒子模型宽度如何计算

```
width: 100px
padding: 10px
border: 1px soild #ccc
margin: 10px
```

>offsetWidth = 内容宽度 + 内边距 + 边框, （无外边距，不算margin）= 122 px
>
>box-sizing: border-box, offsetWidth = 100px

### margin纵向重叠

```html
<style>
p {
	font-size: 16px
    line-height: 1
    margin-top: 10px
    margin-bottom: 15px
}
</style>
<p>AAA</p>
<p></p>
<p></p>
<p></p>
<p>BBB</p>
```

>相邻元素 margin-top 和 margin-bottom 会发生重叠
>
>空内容也会重叠
>
>答：15px

### margin负值

>margin-top, margin-left 元素向上、向左移动
>
>margin-right 负值，右侧左移，自身元素不受影响
>
>margin-bottom 负值，下方元素上移，自身元素不受影响

### BFC理解和应用

>一块独立的渲染区域，内部元素不影响边界以外的元素
>
>- float 不是 none
>- positon absolute 或 fixed
>- overflow 不是 visible
>- display 是 flex inline-block 等
>
>常见应用
>
>- 清除浮动

### 手写clearfix

>.cleatfix:after{
>
>​	content: '';
>
>​	display: table;
>
>​	clear: both;
>
>}

>双飞翼、圣杯 技术总结
>
>- 使用float
>- 两侧使用 margin 负值，以便和中间内容横向重叠
>- 防止中间内容被两侧覆盖，一个用 padding 一个用 margin

### flex布局问题

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>flex 画骰子</title>
    <style type="text/css">
        .box {
            width: 200px;
            height: 200px;
            border: 2px solid #ccc;
            border-radius: 10px;
            padding: 20px;

            display: flex;
            justify-content: space-between;
        }
        .item {
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #666;
        }
        .item:nth-child(2) {
            align-self: center;
        }
        .item:nth-child(3) {
            align-self: flex-end;
        }

    </style>
</head>
<body>
    <div class="box">
        <span class="item"></span>
        <span class="item"></span>
        <span class="item"></span>
    </div>
</body>
</html>
```

### css 定位 absolute 和 relative 分别依据什么定位

> relative 依据自身定位
>
> absolute 依据最近一层的定位元素定位

### 居中对齐有哪些实现方式

> 水平居中
>
> ​	inline: text-align: center
>
> ​	block: margin: auto
>
> ​	absolute 元素: left: 50% + margin-left 负值
>
> 垂直居中
>
> ​	inline: line-height 的值等于 height
>
> ​	absolute: top: 50% + margin-top 负值(必须知道子元素的尺寸)
>
> ​	absolute: transform(-50%, -50%) 或 top left bottom right = 0; margin:auto

### css图文样式：line-height 如何继承

```html
<style>
    body {
        font-size: 20px;
        line-height: 200%
    }
    p {
        font-size: 16px
    }
</style>
<body>
    <p>AAA</p>
</body>
```

>写具体数值, 如 30px 则继承该值
>
>写比例，如 2/ 1.5 继承比例
>
>写百分比，继承计算出来的值
>
>答：40px

### css - 响应式

rem

> px 绝对长度
>
> em 相对于父元素
>
> rem 相对于根

常见方案

>media-query, 根据不同的屏幕设置根元素 font-size
>
>rem, 基于根元素的相对单位
>
>vw/vh
>
>window.innerHeight window.innerWidth

### CSS 优先级和权重值如何计算

内嵌样式>内部样式>外部样式>导入式
！important > 内嵌 1000 >Id 100 > class=[]=伪类 10 > tag=伪元素 1 > ( * + > ~) 0

### 如何触发BFC，以及BFC的作用

BFC：块级格式化上下文block formatting context，是一个独立渲染区域。规定了内部box如何布局，
并且与这个区域外部毫不相干。

触发：float的值不是none；position的值不是static或者relative；display的值是inline-block、block、
table-cell、flex、table-caption或者inline-flex；overflow的值不是visible。
作用：避免margin重叠；自适应两栏布局；清除浮动。

### CSS盒模型

盒模型由：外边距margin、边框border、内边距padding、内容content四个部分组成
标准盒模型大小=border+padding+content
怪异盒模型大小=content
转怪异盒模型：box-sizing:border-box;
转标准盒模型：box-sizing:content-box;

### css实现一个三角形

```css
.triangle{ 
  width: 0; 
  height: 0; 
  border: 100px solid transparent; 
  border-left-color: red; }
```

### 如何实现左边固定宽，右边自适应布局


#### 第一种方式
左边的div向左浮动，右边的div的width为100%，margin-left值设置为左边div的宽度。

```css
.wrap {
  width: 100%;
  height: 100%;
  background: #fefefe;
}
.left {
  float: left;
  width: 300px;
  height: 100%;
  background: #eafeea;
}
.right {
  width: 100%;
  height: 100%;
  margin-left: 300px;
  background: pink;
}
```


#### 第二种方式
和第一种方式的思路一样，只是这次我们可以通过将父元素设置为 position: relative； 将左边的元素设置为 position: absolute； 并且left为0。右边div不变。

```css
.wrap {
  width: 100%;
  height: 100%;
  background: #fefefe;
  position: relative;
}
.left {
  width: 300px;
  position: absolute;
  left: 0;
  height: 100%;
  background: #eafeea;
}
.right {
  width: 100%;
  height: 100%;
  margin-left: 300px;
  background: pink;
}
```

#### 第三种方式
使用BFC方式，即将右边的div设置overflow: hidden；这样就可以触发
BFC了，而BFC的规则就是不会和浮动元素重叠，如下
```css
.wrap {
  width: 100%;
  height: 100%;
  background: #fefefe;
}
.left {
  float: left;
  width: 300px;
  height: 100%;
  background: #eafeea;
}
.right {
  height: 100%;
  overflow: hidden;
  background: pink;
}
```

#### 第四种方式
左边固定宽度 float，右边width设置为100%， float: right，然后margin-right: -300px即可，通过margin负边距，我们就可以达到同样的效果：
```css
.wrap {
  width: 100%;
  height: 100%;
  background: #fefefe;
}
.left {
  float: left;
  width: 300px;
  height: 100%;
  background: #eafeea;
}
.right {
  width: 100%;
  float: right;
  margin-right: -300px;
  height: 100%;
  background: pink;
}
```

####  第五种方式 
使用flex布局。 包裹层使用flex，内部就是弹性布局了，不用设置。

```css
.wrap {
  display: flex;
  width: 100%;
  height: 100%;
  background: #fefefe;
}
.left {
  width: 300px;
  height: 100%;
  background: #eafeea;
}
.right {
  width: 100%;
  height: 100%;
  background: pink;
}
```

#### 第六种方式 左右两边全部使用绝对定位，左边设定宽度300px，右边100%。
```css
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fefefe;
}
.left {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background: #eafeea;
}
.right {
  position: absolute;
  top: 0;
  left: 300px;
  width: 100%;
  height: 100%;
  background: pink;
}
```


#### 第七种方式
使用table布局。 包裹元素设置为 display: table； 子元素设置为 display: table-cell; 然后再设置好左边元素的宽度，右边元素不需要设置宽度。 并且是等高布局。
```css
.wrap {
  display: table;
  width: 100%;
  height: 100%;
  background: #fefefe;
}
.left {
  display: table-cell;
  width: 300px;
  height: 100%;
  background: #eafeea;
}
.right {
  display: table-cell;
  height: 100%;
  background: pink;
}
```


#### 第八种方式
grid布局
```css
..wrap {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows:100px;
  /* grid-template-columns: 200px 1fr; 这个也可以*/}
.left {}
.right {
  word-break: break-all;
  overflow: hidden;
}
```

### css可继承的属性有哪些

可继承的属性：文本类：text-indent、text-align、line-height、word-spacing、letter-spacing、text-transform、direction、color；

字体类：font、font-family、font-weight、font-size、font-style、font-variant、font-stretch、font-size-adjust；

其它类：visibility、caption-side、border-collapse、border-spacing、empty-cells、table-layout、list-style-type、list-style-image、list-style-position、list-style、quotes、cursor、page、page-break-inside、windows、orphans等

### px、em、rem、vh、vw分别是什么

px物理像素，绝对单位；em相对于自身字体大小，如果自身没有大小则相对于父级字体大小，如果父
级也没有则一层一层向上查找，直到找到html为止，相对单位；rem相对于html的字体大小，相对单
位；vh相对于屏幕高度的大小，相对单位；vw相对于屏幕宽度的大小，相对单位



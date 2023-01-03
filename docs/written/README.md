## 写结果
```javascript
function foo() {
  console.log(a)
  let a = 10
  a = 120
}  // 报错

console.log(foo())

{
  let s = 'student'
}

console.log(s) // 报错

const foo = []
const index = '0'
foo[index] = 100
console.log(foo)
// [100]

const foo = function (m) {
  let sum = m
  return function (n) {
    if ( n > 0) {
      sum += n
    }
    console.log(sum)
  }
}
const f = foo(1)
f(2)
foo(0)(2)
const obj = {
  sum: 1
}
f.call(obj, 2)// 3,2,5

const foo = '3' + true // 3true

const foo = parseInt('year2019', 10)
console.log(foo)// NaN

const re = /he(l+(?:o))/
const result = re.exec('hello world')
console.log(result)
// [hello, llo]


const arr = [1, 2 ,3, 4]
const ret = arr.splice(2,2,3)
console.log(ret) // [3,4]
console.log(arr.length) // 3
```

### location.search
https://www.baidu.compath?year=2019#hash

?year=2019#hash

### 添加哪个属性可以使超出文字变成"..."

text-overflow: ellipsis;

### overflow:hidden
一、溢出隐藏
二、清除浮动
三、解决外边距塌陷
[详情](https://blog.csdn.net/qq_41638795/article/details/83304388)

### 宏任务

macro-task(宏任务，是由宿主发起的)：主代码，script，setTimeout，setInterval，setImmediate，I/O，UI rendering

micro-task(微任务，由JavaScript自身发起)：Promise.then/catch，process.nextTick，fetch，v8垃圾回收

### 箭头函数

√ 在使用=>定义函数的时候，继承当前上下文关键字

√ 不能使用构造方法

x 可以使用arguments对象获取参数
```
箭头函数不绑定Arguments 对象
```
√ 可以使用yield指令

### new具体做了什么

√  创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型

√ 属性和方法被加入到 this 引用的对象中

x 重写覆盖了原型对象的属性和方法

√ 新创建的对象由this所引用，并且最后隐式返回this

### line-height:1.5 和 line-height: 90%是相对什么来设置行高的

number：设置数字，此数字会与当前的字体尺寸相乘来设置行间距；

%：基于当前字体尺寸的百分比行间距

inherit：规定应该从父元素继承line-height属性的值

### button 字体设置灰色

button.disable 

### 有效变量名
- [x] $

- [ ] (不行) a-bc with case

### 哪些结果返回true
```javascript
console.log('' == 0) // ture
console.log(new String('hello') == new String('hello')) //false
console.log('0' == 0) // ture
console.log(true == 1) // true
```


### 合法的盒模型

box-sizing: content-box | border-box | inherit

box-sizing: content-box;

标准盒模型的width组成：content（不包含 padding 和 border）
![img](http://qn.aixshi.top/blog%2Fnormalbox.png)


box-sizing: border-box;

IE盒模型的width组成：content + 2 * padding + 2 * border
![img](http://qn.aixshi.top/blog%2FIEbox.png)

他们的主要区别其实就是 width 包不包含 border 和 padding
box-sizing 默认值是 content-box，即默认是标准盒子模型

### css 选择器

```html
<ul class="list">
  <li class="item">1</li>
  <li class="item">2</li>
</ul>
```
选中第二个
```css
.item:nth-child(2)
.item:last-child
```

### css 优先级
> 通配选择符的权值 0,0,0,0
> 
> 标签的权值为 0,0,0,1
> 
> 类的权值为 0,0,1,0
> 
> 属性选择的权值为 0,0,1,0
> 
> 伪类选择的权值为 0,0,1,0
> 
> 伪对象选择的权值为 0,0,0,1 E::selection
> 
> ID的权值为 0,1,0,0
> 
> important的权值为最高 1,0,0,0
```
id选择器(#myid)
类选择器(.myclass)
标签选择器(div h1 p)
相邻选择器(h1 + p)
子选择器(ul < li)
后代选择器(li a)
通配符选择器(*)
属性选择器(a[rel="external"])
伪类选择器(a:hover, li:nth-child)
```
### http2新特性
压缩http头
pipelining 多路复用

## 编程
```javascript
let arr = readline().replace(/\[|\]| /g, "").split(",")
```

### 实现下拉菜单的点击显示和点击外部区域收起的效果
```html
<!-- 实现下拉菜单的点击显示和点击外部区域收起的效果 -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="dropmenu">
    <div class="label">点击显示</div>
    <div class="menu-list">
      <ul>
        <li>菜单一</li>
        <li>菜单二</li>
        <li>菜单三</li>
        <li>菜单四</li>
      </ul>
    </div>
  </div>
</body>
<script>
  const body = document.body
  const label = document.getElementsByClassName("label")[0]
  const menulist = document.getElementsByClassName("menu-list")[0]
  function bindEvent(elem, type, fn) {
    elem.addEventListener(type, fn)
  }
  bindEvent(label, 'click', function(event) {
    event.stopPropagation()
    menulist.style.display = 'block'
  })
  bindEvent(body, 'click', function() {
    menulist.style.display = 'none'
  })

  let li = document.querySelector('li');
  li.onclick = (e) => {
      e.cancelBubble = true;
  }
</script>
<style>
  body{
    height: 500px;
  }
</style>
</html>
```

```html
<html>
    <head>
        <meta charset=utf-8>
    </head>
    <body>
        <ul>
            <li>nowcoder</li>
        </ul>
    </body>
    <script type="text/javascript">
        // 补全代码
       var li = document.getElementsByTagName("li")[0];
        li.onclick=function(event){
            event.cancelBubble=true;
        }
    </script>
</html>
```

### 给定一个整数数组，找到具有最大乘积的相邻元素对并返回该乘积
```javascript
function solution(inputArray) {
  var max = inputArray[0] * inputArray[1];
  for (var i = 1; i < inputArray.length; i++) {
    max = Math.max(max, inputArray[i - 1] * inputArray[i]);
  }
  return max
}
```

### 有这样一个字符串"http://www.showmebug.com/item.html?a=1&b=2&c=&d=xxx",要求转化成 {"a":1,"b":2,"c":,"d":xxx}
```javascript
let str = 'http://www.showmebug.com/item.html?a=1&b=2&c=&d=xxx'
console.log(solution(str))
function solution(str) {
  var json = {};
  if (str.indexOf('?') != -1) {
    var str1 = str.substring(str.indexOf('?') + 1);
    console.log(str1)
    var arr = str1.split('&')
    for (var i = 0; i < arr.length; i++) {
      var arr1 = arr[i].split('=');
      json[arr1[0]] = arr1[1]
    }
  }
  return json;
}
```

### 出现次数最多的元素为
```javascript
function findMost(arr) {
  if (!arr.length) return
  if (arr.length === 1) return 1
  let res = {}
  let maxName, maxNum = 0
  // 遍历数组
  arr.forEach((item) => {
    res[item] ? res[item] += 1 : res[item] = 1
  })
  console.log(res)
  // 遍历 res
  for (let r in res) {
    if (res[r] > maxNum) {
      maxNum = res[r]
      maxName = r
    }
  }
  return '出现次数最多的元素为:' + maxName + ', 出现次数为:' + maxNum;
}

console.log(findMost([1, 2, 3, 3, 5, 2, 9, 8, 6, 5, 3]))
```

### 组件通信
```
父子组件通信: props;parent / children; provide / inject ; ref ;attrs / listeners
兄弟组件通信: eventBus ; vuex
跨级通信: eventBus；Vuex；provide / inject 、attrs / listeners

父 -> 子 props

子 -> 父 this.$emit() 

child1 改 child2

状态提升 提升到公共的父亲里面

eventBus  export const hub = new Vue()
        或Vue.prototype.$hub = new Vue()
  child1  hub.$emit
  child2 mounted -> hub.$on

  移除 EventBus.$off

Vuex
  child1 this.$store.commit()
  child2 ...mapState(['username])

ref 和 refs
  父 -> this.$refs

$children / $parent
this.$refs === $children

provide / inject
provide: {}
inject[]
不是可响应的，但如果传入可监听对象，是可响应的

$attrs / $listeners
  child1 {{$attrs.attribute}}
    inheritAttrs: false
  child2 this.$listeners

localStorage
```


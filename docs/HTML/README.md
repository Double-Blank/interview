## HTML

### 如何理解html语义化

> 易读、搜索引擎优化

### 块级元素、内联元素

> display: block/table（独占一行）
>
> ​	div h1 h2 table ul ol p 等
>
> display: inline/inline-block（不换行）
>
> ​	span img input button

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




## 变量类型和计算

### typeof 判断哪些类型

>- 识别所有值类型
>
> ```js
>let a //undefined
>const str = '123' //string
>const n = 100 //number
>const b = true //boolean
>const s = Symbol('s') //symbol
>const a = BigInt(1000000) //bigint 2的52次方-1 10位数
> ```
>
>- 识别函数
>
> ```js
>typeof console.log //function
>typeof null //object 特殊引用类型，指针指向为null
>typeof [] //object
>typeof {} //object
> ```


### === ==

null == undefined (true)

truely falsely -》 !!null

### 值类型和引用类型的区别

值类型 在 栈中存储

引用类型 在 堆中存储

### 手写深拷贝

```js
function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    // obj 是 null ，或者不是对象和数组，直接返回
    return obj
  }
  // 初始化返回结果
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) { // 是用来检测属性是否为对象的自有属性
      result[key] = deepClone(obj[key])
    }
  }
  // 返回结果
  return result
}
```

## 原型和原型链

原型：每一个实例对象类型都有一个隐式原型__ proto __ ，每一个构造函数都有一个显示原型prototype，该属 性指向它的原型对象。

原型链：某个对象的原型又有自己的原型，直到某个对象的原型为null为止，组成这条的最后一环，这 种一级一级的链就是原型链

### class

不能说就是一个“语法糖”

1.类里面方法不能迭代 不能用for in 循环出来

2.类除了new不能有其他调用方法

3.类里面都是严格模式

### 构造函数做了什么

①JS内部首先会先生成一个对象

②再把函数中的this指向该对象

③然后执行构造函数中的语句

④最终返回该对象实例

### new操作符都做了哪些事情

√ 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型

√ 属性和方法被加入到 this 引用的对象中

√ 新创建的对象由this所引用，并且最后隐式返回this

### class constructor的作用

constructor 方法是类的构造函数

一个类必须有 constructor 方法，如果没有显式定义，一个默认的 consructor 方法会被默认添加。所以即使你没有添加构造函数，也是会有一个默认的构造函数的

一般 constructor 方法返回实例对象 this ，但是也可以指定 constructor 方法返回一个全新的对象，让返回的实例对象不是该类的实例。

```javascript
class Test {
  constructor(){
    // 默认返回实例对象 this
  }
}
console.log(new Test() instanceof Test); // true
 
class Example {
  constructor(){
    // 指定返回对象
    return new Test();
  }
}
console.log(new Example() instanceof Example); // false
```

### class调用super有什么用

调用父类实例,也可以用来调用父对象上的函数。

- 调用父类实例

  ```js
  // 父类
  class People {
    constructor(name) {
      this.name = name
    }
    eat() {
      console.log(`${this.name} eat something`)
    }
  }
  
  // 子类
  class Student extends People {
    constructor(name, number) {
      super(name)
      this.number = number
    }
    sayHi() {
      console.log(`姓名 ${this.name} 学号 ${this.number}`)
    }
  }
  ```

  比如`class B extends A`B没有自己的 this 对象，必须调用 `super` 方法， `super` 就代表了父类的构造函数，在这里相当于 `A.prototype.constructor.call(this, props)`。

- 调用父对象上的函数，就是当做对象使用，指向父类的原型对象，相当于 `A.prototype.c()。`

  ```js
  class A {
    c() {
      return 2;
    }
  }
  
  class B extends A {
    constructor() {
      super();
      console.log(super.c()); // 2
    }
  }
  
  let b = new B();
  ```

### class constructor中声明方法，此方法挂载到class实例还是原型上，在class内声明呢?

constructor里面的方法是实例方法，外面是原型方法，等同于以下代码

```javascript
// 写里面
function A(){
    this.show = function(){}
}
// 写外面
function A(){...}
A.prototype.show = function(){}
```



### 作用域和闭包

### this 表示当前对象的一个引用

this取值是函数执行是确定的，不是在函数定义时确定的

```js
function fn1() {
  console.log(this)
}
fn1() // windwo  作为普通函数执行
fn1.call({x: 100})
const fn2 = fn1.bind({x: 200})
fn2() // {x: 200}  类似 call() 和bind() apply() 方法可以将 this 引用到任何对象。

const zhangsan = {
  name: '张三',
  satHi() {
    console.log(this) // 张三  作为对象方法被执行返回当前对象
  },
  wait() {
    setTimeout(fuction() {
      console.log(this) // window
    })
  },
  waitAgin() {
    setTimeout(() => {console.log(this)}) // 张三 箭头函数取上级作用域的this
  }
}// 对象
在函数中，在严格模式下，this 是未定义的(undefined)。
在事件中，this 表示接收事件的元素。
vue 表示 vm 的实例化
```

## 异步进阶

### 描述 event loop (事件循环/事件轮询)的机制，可画图

event loop 就是异步回调的实现原理
先执行同步，后异步
同步代码一行一行放在call stack执行
遇到异步先‘记录’等待时机（定时、网络请求等），时机一到放到call back queue里
如果call stack为空, event loop 开始工作，轮询查找call back queue然后放到call stack

### Promise 有哪三种状态，如何变化

pending resolved rejected
不可逆

### then 和 catch 改变状态

then正常返回 resolved, 里面有报错则返回 rejected

catch正常返回 resolved，里面有报错则返回 rejected

```js
// 第一题
Promise.resolve().then(() => {
    console.log(1)
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})
// 1 3

// 第二题
Promise.resolve().then(() => {
    console.log(1)
    throw new Error('erro1')
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})
// 1 2 3

// 第三题
Promise.resolve().then(() => {
    console.log(1)
    throw new Error('erro1')
}).catch(() => {
    console.log(2)
}).catch(() => { // 注意这里是 catch
    console.log(3)
})
// 1 2
```

### async/await

执行 async 函数，返回 promise

await 相当于 Promise 的 then

try...catch 可捕获异常，代替 Promise 的 catch

```js
async function async1 () {
  console.log('async1 start') // 2
  await async2() // undefined
  console.log('async1 end') // 5 微任务
}
async function async2 () {
  console.log('async2') // 3
}
console.log('script start') // 1
async1()
console.log('script end') // 4
```

```js
(async function () {
    console.log('start')
    const a = await 100
    console.log('a', a)
    const b = await Promise.resolve(200)
    console.log('b', b)
    const c = await Promise.reject(300)
    console.log('c', c)
    console.log('end')
})()
// start a100 b300
```

### 什么是宏任务和微任务，两者有什么变化

宏任务: setTimeout, setInterval, Ajax, DOM事件 DOM渲染后触发

微任务: Promise async/await DOM渲染前触发

微任务执行时机比宏任务要早

>js单线程，而且和dom渲染共用一个线程
>
>js执行时，留时机给dom渲染


### 终极考题

```js
async function async1 () {
  console.log('async1 start') // 2
  await async2() // undefined 
  console.log('async1 end') // 6 上面有 await ，下面就变成了“异步”, 微任务
}

async function async2 () {
  console.log('async2') // 3
}

console.log('script start') // 1

setTimeout(function () { // 异步，宏任务
  console.log('setTimeout') // 8
}, 0)

async1()

new Promise (function (resolve) { // 返回 Promise 之后，即同步执行完成，then 是异步代码
  console.log('promise1') // 4 Promise 的函数体会立刻执行
  resolve()
}).then (function () { // 异步，微任务
  console.log('promise2') // 7
})

console.log('script end') // 5
```

### 手写Promise

```js
 class Mypromise {
  state = 'pending'
  value = undefined
  reason = undefined

  resolveCallBacks = [] // pending状态下成功的回调
  rejectCallBacks = [] // pending状态下失败的回调
  constructor(fn) {
    const resolveHandler = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.resolveCallBacks.forEach(fn => {
          fn(this.value)
        });
      }
    }
    const rejectHandler = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.rejectCallBacks.forEach(fn => {
          fn(this.reason)
        });
      }
    }
    try {
      fn(resolveHandler, rejectHandler)
    } catch (err) {
      rejectHandler(err)
    }
  }
  then(fn1, fn2) {
    // pending 状态下 fn1 fn2 会被存储到 callbacks 中
    fn1 = typeof fn1 === 'function' ? fn1 : (v) => v
    fn2 = typeof fn2 === 'function' ? fn2 : (e) => e
    if (this.state === 'pending') {
      const p1 = new Mypromise((resolve, reject) => {
        this.resolveCallBacks.push(() => {
          try {
            const newValue = fn1(this.value)
            resolve(newValue)
          } catch (err) {
            reject(err)
          }
        })
        this.rejectCallBacks.push(() => {
          try {
            const newValue = fn2(this.reason)
            reject(newValue)
          } catch (err) {
            reject(err)
          }
        })
      })
      return p1
    }
    if (this.state === 'fulfilled') {
      const p1 = new Mypromise((resolve, reject) => {
        try {
          const res = fn1(this.value)
          resolve(res)
        } catch (err) {
          reject (err)
        }
      })
      return p1
    }
    if (this.state === 'rejected') {
      const p1 = new Mypromise((resolve, reject) => {
        try {
          const res = fn2(this.reason)
          reject(res)
        } catch (err) {
          reject (err)
        }
      })
      return p1
    }
  }
  catch(fn) {
    return this.then(null, fn)
  }
}

Mypromise.resolve = function (value) {
  return new Mypromise((resolve, reject) => {
    return resolve(value)
  })
}

Mypromise.reject = function (reason) {
  return new Mypromise((resolve, reject) => {
    return reject(reason)
  })
}

Mypromise.all = function (promiseList = []) {
  const p1 = new Mypromise((resolve, reject) => {
    const result = [] // 存储所有结果
    const length = promiseList.length
    let resolvedCount = 0
    promiseList.forEach(x => {
      x.then(data => {
        result.push(data)
        resolvedCount++
        if (resolvedCount === length) {
          resolve(result)
        }
      }).catch(err => reject(err))
    })
  })
  return p1
}

Mypromise.race = function (promiseList = []) {
  let resolved = false;
  const p1 = new Promise((resolve, reject) => {
    promiseList.forEach(p => {
      p.then(data => {
        if (!resolved) {
          resolve(data)
          resolved = true
        }
      }).catch(err => {reject(err)})
    })
  })
  return p1
}

// 初始化 & 异步调用
const p = new Mypromise((resolve, reject) => {
  // resolve(100)
  // reject('asdf')
  setTimeout(() => {
    resolve(100)
  }, 1000)
})

// then catch 链式调用
p.then(data => {
  return data + 1
}).catch(err => {
  console.log(err)
})

// p.then((value) => {}, (reason) => {})
const p1 = new Mypromise.resolve(10)
// API reject resolve all  race
const p2 = new Mypromise.resolve(100)
const p3 = new Mypromise.reject('100')
// console.log(p3)
const p4 = new Mypromise.all([p, p1, p2])
// console.log(p4.then(res => console.log(res)))
const p5 = new Mypromise.race([p1, p2])
console.log(p5)
```


## DOM

html解析出来的树

### 常用API

- 获取节点getElementById getElementsByTagName getElementsByClassName querySelectorAll，以及获取节点的 Attribute 和 property
- 获取父节点 获取子节点
  - parentNodes childNodes
- 新增节点，删除节点

### attr 和 property 的区别

- property 只是一个 JS 属性的修改
- attr 是对 html 标签属性的修改
- 都有可能引起DOM重新渲染

### 一次性插入多个DOM，考虑性能

- 频繁操作改为一次性操作, 使用 fragment(createDocumentFragment)
- 对dom查询做缓存

### BOM（浏览器对象模型）

### 检测浏览器类型

```
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

### 拆解url等

```
// navigator
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)

// screen
console.log(screen.width)
console.log(screen.height)

// location
console.log(location.href)
console.log(location.protocol) // 'http:' 'https:'
console.log(location.pathname) // '/learn/199'
console.log(location.search)
console.log(location.hash)

// history
history.back()
history.forward()
```

### 事件绑定

```javascript
const btn = document.getElementById('btn1')
btn.addEventListener('click', event => {
    console.log('clicked')
})
```

通用的事件绑定函数

```js
function bindEvent(elem, type, fn) {
    elem.addEventListener(type, fn)
}
const a = document.getElementById('link1')
bindEvent(a, 'click', e => {
    e.preventDefault() // 阻止默认行为
    alert('clicked')
})
```

### 事件冒泡

```html
<body>
    <div id="div1">
        <p id="p1">激活</p>
        <p id="p2">取消</p>
        <p id="p3">取消</p>
        <p id="p4">取消</p>
    </div>
    <div id="div2">
        <p id="p5">取消</p>
        <p id="p6">取消</p>
    </div>
</body>
```

对于以上 html 代码结构，点击`p1`时候进入激活状态，点击其他任何`p`都取消激活状态，如何实现？

```javascript
const p1 = document.getElementById('p1')
const body = document.body
bindEvent(p1, 'click', e => {
    e.stopPropagation() // 注释掉这一行，来体会事件冒泡
    alert('激活')
})
bindEvent(body, 'click', e => {
    alert('取消')
})
```

如果我们在`p1` `div1` `body`中都绑定了事件，它是会根据 DOM 的结构，来冒泡从下到上挨个执行的。但是我们使用`e.stopPropagation()`就可以阻止冒泡。

### 代理

我们设定一种场景，如下代码，一个`<div>`中包含了若干个`<a>`，而且还能继续增加。那如何快捷方便的为所有的`<a>`绑定事件呢？

```html
<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
</div>
<button>点击增加一个 a 标签</button>
```

这里就会用到事件代理，我们要监听`<a>`的事件，但要把具体的事件绑定到`<div>`上，然后看事件的触发点，是不是`<a>`

```javascript
const div1 = document.getElementById('div1')
div1.addEventListener('click', e => {
    const target = e.target
    if (e.nodeName === 'A') {
        alert(target.innerHTML)
    }
})
```

那我们现在完善一下之前写过的通用事件绑定函数，加上事件代理

```javascript
function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }
    elem.addEventListener(type, e => {
        let target
        if (selector) {
            target = e.target
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            fn(e)
        }
    })
}
```

然后这样使用

```js
// 使用代理
const div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', e => {
    console.log(this.innerHTML)
})

// 不使用代理
const a = document.getElementById('a1')
bindEvent(div1, 'click', e => {
    console.log(a.innerHTML)
})
```

最后，使用代理的优点

- 使代码简洁
- 减少浏览器的内存占用

### 手写简单的Ajax

```js
function ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(
            JSON.parse(xhr.responseText)
          )
        } else if (xhr.status === 404 || xhr.status === 500) {
          reject(new Error('404 not found'))
        }
      }
    }
    xhr.send(null)
  })
  return p
}

const url = '/data/test.json'
ajax(url)
  .then(res => console.log(res))
  .catch(err => console.error(err))
```

### 跨域

浏览器要求当前网页和server必须同源

协议、域名、端口

### 加载图片 css js 可无视同源策略

```
img 统计打点
link cdn
script jsonp
```

```html
<script>
  window.abc = function (data) {
    console.log(data)
  }
</script>
<script src="http://localhost:8002/jsonp.js?username=xxx&callback=abc"></script>
```

```
cors - 服务器设置 http header
```
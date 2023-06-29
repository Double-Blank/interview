## JS基础

### 变量类型和计算

#### typeof 判断哪些类型

>- 识别所有值类型
>
>  ```js
>  let a //undefined
>  const str = '123' //string
>  const n = 100 //number
>  const b = true //boolean
>  const s = Symbol('s') //symbol
>  const a = BigInt(1000000) //bigint 2的52次方-1 10位数
>  ```
>
>- 识别函数
>
>  ```js
>  typeof console.log //function
>  typeof null //object 特殊引用类型，指针指向为null
>  typeof [] //object
>  typeof {} //object
>  ```


#### === ==

null == undefined (true)

truely falsely -》 !!null

#### 值类型和引用类型的区别

值类型 在 栈中存储

引用类型 在 堆中存储

#### 手写深拷贝

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

### 原型和原型链

#### 原型和原型链

原型：每一个实例对象类型都有一个隐式原型__ proto __ ，每一个构造函数都有一个显示原型prototype，该属 性指向它的原型对象。

原型链：某个对象的原型又有自己的原型，直到某个对象的原型为null为止，组成这条的最后一环，这 种一级一级的链就是原型链

#### class

不能说就是一个“语法糖”

1.类里面方法不能迭代 不能用for in 循环出来

2.类除了new不能有其他调用方法

3.类里面都是严格模式

#### 构造函数做了什么

①JS内部首先会先生成一个对象

②再把函数中的this指向该对象

③然后执行构造函数中的语句

④最终返回该对象实例

#### new操作符都做了哪些事情

√ 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型

√ 属性和方法被加入到 this 引用的对象中

√ 新创建的对象由this所引用，并且最后隐式返回this

#### class constructor的作用

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

#### class调用super有什么用

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

#### class constructor中声明方法，此方法挂载到class实例还是原型上，在class内声明呢?

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

#### this 表示当前对象的一个引用

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
 const p1 = new MyPromise((resolve, reject) => {
            // resolve(100)
            // reject('错误信息...')
            setTimeout(() => {
                resolve(100)
            }, 1000)
        })


class MyPromise {
    state = 'pending' // 状态，'pending' 'fulfilled' 'rejected'
    value = undefined // 成功后的值
    reason = undefined // 失败后的原因

    resolveCallbacks = [] // pending 状态下，存储成功的回调
    rejectCallbacks = [] // pending 状态下，存储失败的回调

    constructor(fn) {
        const resolveHandler = (value) => {
            // 加 setTimeout ，参考 https://coding.imooc.com/learn/questiondetail/257287.html (2022.01.21)
            setTimeout(() => {
                if (this.state === 'pending') {
                    this.state = 'fulfilled'
                    this.value = value
                    this.resolveCallbacks.forEach(fn => fn(value))
                }
            })
        }

        const rejectHandler = (reason) => {
            // 加 setTimeout ，参考 https://coding.imooc.com/learn/questiondetail/257287.html (2022.01.21)
            setTimeout(() => {
                if (this.state === 'pending') {
                    this.state = 'rejected'
                    this.reason = reason
                    this.rejectCallbacks.forEach(fn => fn(reason))
                }
            })
        }

        try {
            fn(resolveHandler, rejectHandler)
        } catch (err) {
            rejectHandler(err)
        }
    }

    then(fn1, fn2) {
        fn1 = typeof fn1 === 'function' ? fn1 : (v) => v
        fn2 = typeof fn2 === 'function' ? fn2 : (e) => e

        if (this.state === 'pending') {
            const p1 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    try {
                        const newValue = fn1(this.value)
                        resolve(newValue)
                    } catch (err) {
                        reject(err)
                    }
                })

                this.rejectCallbacks.push(() => {
                    try {
                        const newReason = fn2(this.reason)
                        reject(newReason)
                    } catch (err) {
                        reject(err)
                    }
                })
            })
            return p1
        }

        if (this.state === 'fulfilled') {
            const p1 = new MyPromise((resolve, reject) => {
                try {
                    const newValue = fn1(this.value)
                    resolve(newValue)
                } catch (err) {
                    reject(err)
                }
            })
            return p1
        }

        if (this.state === 'rejected') {
            const p1 = new MyPromise((resolve, reject) => {
                try {
                    const newReason = fn2(this.reason)
                    reject(newReason)
                } catch (err) {
                    reject(err)
                }
            })
            return p1
        }
    }

    // 就是 then 的一个语法糖，简单模式
    catch(fn) {
        return this.then(null, fn)
    }
}

MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => resolve(value))
}
MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => reject(reason))
}

MyPromise.all = function (promiseList = []) {
    const p1 = new MyPromise((resolve, reject) => {
        const result = [] // 存储 promiseList 所有的结果
        const length = promiseList.length
        let resolvedCount = 0

        promiseList.forEach(p => {
            p.then(data => {
                result.push(data)

                // resolvedCount 必须在 then 里面做 ++
                // 不能用 index
                resolvedCount++
                if (resolvedCount === length) {
                    // 已经遍历到了最后一个 promise
                    resolve(result)
                }
            }).catch(err => {
                reject(err)
            })
        })
    })
    return p1
}

MyPromise.race = function (promiseList = []) {
    let resolved = false // 标记
    const p1 = new Promise((resolve, reject) => {
        promiseList.forEach(p => {
            p.then(data => {
                if (!resolved) {
                    resolve(data)
                    resolved = true
                }
            }).catch((err) => {
                reject(err)
            })
        })
    })
    return p1
}

```


### DOM

html解析出来的树

#### 常用API

- 获取节点getElementById getElementsByTagName getElementsByClassName querySelectorAll，以及获取节点的 Attribute 和 property
- 获取父节点 获取子节点
  - parentNodes childNodes
- 新增节点，删除节点

#### attr 和 property 的区别

- property 只是一个 JS 属性的修改
- attr 是对 html 标签属性的修改
- 都有可能引起DOM重新渲染

#### 一次性插入多个DOM，考虑性能

- 频繁操作改为一次性操作, 使用 fragment(createDocumentFragment)
- 对dom查询做缓存

### BOM（浏览器对象模型）

#### 检测浏览器类型

```
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

#### 拆解url等

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

### Ajax

#### 手写简单的Ajax

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

#### 跨域

浏览器要求当前网页和server必须同源

协议、域名、端口

#### 加载图片 css js 可无视同源策略

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
## JS

### 构造函数做了什么

①JS内部首先会先生成一个对象

②再把函数中的this指向该对象

③然后执行构造函数中的语句

④最终返回该对象实例

### this

this 表示当前对象的一个引用
```
在方法中，this 表示该方法所属的对象。
如果单独使用，this 表示全局对象。
在函数中，this 表示全局对象。
在函数中，在严格模式下，this 是未定义的(undefined)。
在事件中，this 表示接收事件的元素。
类似 call() 和 apply() 方法可以将 this 引用到任何对象。
vue 表示 vm 的实例化
```

### new操作符都做了哪些事情

√ 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型

√ 属性和方法被加入到 this 引用的对象中

√ 新创建的对象由this所引用，并且最后隐式返回this

### class

不能说就是一个“语法糖”

1.类里面方法不能迭代 不能用for in 循环出来

2.类除了new不能有其他调用方法

3.类里面都是严格模式

### class constructor的作用

constructor ⽅法是类的构造函数

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

ES6 的 class 属于⼀种“语法糖”，所以只是写法更加优雅，更加像⾯对对象的编程

```javascript

//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
var p = new Point(1, 2);
```

### class调用super有什么用

调用父类实例,也可以用来调用父对象上的函数。

- 调用父类实例，就是当作函数使用，比如`class B extends A `B没有自己的 this 对象，必须调用 `super` 方法， `super` 就代表了父类的构造函数，在这里相当于 ```A.prototype.constructor.call(this, props)```。

- 调用父对象上的函数，就是当做对象使用，指向父类的原型对象,相当于 `A.prototype.c()。`

1. 当做函数使用
```
class A {}
class B extends A {
  constructor() {
    super();  // ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
  }
}
```
`class B extends A `
在 constructor 中必须调用 `super` 方法，因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到this对象。

super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B，因此 super() 在这里相当于 ```A.prototype.constructor.call(this, props)```。

可以看到，在` super() `执行时，它指向的是 子类 B 的构造函数，而不是父类 A 的构造函数。也就是说，`super()` 内部的 this 指向的是 B。

2. 当做对象使用

在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```
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

上面代码中，子类 B 当中的 super.c()，就是将 super 当作一个对象使用。这时，super 在普通方法之中，指向 A.prototype，所以 super.c() 就相当于 A.prototype.c()。

[更多](https://juejin.cn/post/6844903638674980872)

### class constructor中声明方法，此方法挂载到class实例还是原型上，在class内声明呢?

constructor里面的方法是实例方法，外面是原型方法，等同于以下代码

```javascript
// 写里面
function A(){
    this.show = function(){}
}
```
```javascript
// 写外面
function A(){...}
A.prototype.show = function(){}
```


### call、apply、bind的区别
这三个都是用来定义上下文的，改变this指向，call、apply会指定上下文并执行函数；而bind终身定 死上下文但是不执
行函数，并返回新的函数。 其中call和apply传入参数的形式有别，call是单独罗列，逗号隔开参数；
apply是数 组。 函数.call(上下文对象，参数，参数，参数); 函数.apply(上下文对象，[参数，参数，参
数]);
```javascript
var obj = { a: 10 }
function fun(b, c){
  console.log(this.a + b + c);
}
fun.call(obj, 3, 4);
fun.apply(obj, [3, 4]);
fun = fun.bind(obj); // 返回新的函数 
fun(3,4);
```

### 数据类型有哪些

基本类型：数字number、字符串string、布尔boolean、undefined、null、symbol、BigInt

BigInt 是一种内置对象，它提供了一种方法来表示大于 2^53 - 1 的整数。这原本是 Javascript中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。

引用类型：数组array、函数function、对象object

### 闭包

可以把闭包简单理解成"定义在一个函数内部的函数"。
它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。
还有一个变量的作用域，在函数外部自然无法读取函数内的局部变量。

```javascript
function f1(){
  var n=999;
  function f2(){
    alert(n); // 999
  }
}
```

### JS 判断是否为对象或数组
#### 判断值是否是对象
```javascript
// toString 方式
Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
// 这里使用了 null 传导符(?.) 以防止出错
val?.constructor === Object // true 代表为对象
// typeof 与 instanceof 并不能完全判断一个值为对象,"object"——如果这个值是对象（包括数组）或null；
[] instanceof Object // true
new Object instanceof Object // true
// __proto__ 方式
val.__proto__ === Object.prototype // true 代表为对象
// Object.getPrototypeOf 方式
Object.getPrototypeOf(val) === Object.prototype // true 代表为对象
```

#### 判断值是否是数组
```javascript
// toString 方式
Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
// Array.isArray
Array.isArray(val) // true 代表为数组
// instanceof 方式
val instanceof Array // true 代表为数组
// constructor 方式
val?.constructor === Array // true 代表为数组
//  __proto__ 方式
val.__proto__ === Array.prototype // true 代表为数组
// Object.getPrototypeOf 方式
Object.getPrototypeOf(val) === Array.prototype // true 代表为数组
// isPrototypeOf 方式
Array.prototype.isPrototypeOf(val) // true 代表为数组
```

### for in 与 for of
for...in加强循环，不光可以遍历数组，还可以遍历对象和其原型上的方法
for...of遍历数组和可枚举的对象

### 原型和原型链

原型：每一个实例对象类型都有一个隐式原型__ proto __ ，每一个构造函数都有一个显示原型prototype，该属
性指向它的原型对象。

原型链：某个对象的原型又有自己的原型，直到某个对象的原型为null为止，组成这条的最后一环，这
种一级一级的链就是原型链。



### JS基本类型和引用类型是如何存储的
- 基本数据类型：基本类型值在内存中占据固定大小，直接存储在**栈内存**中的数据
- 引用数据类型：引用类型在栈中存储了指针，这个指针指向堆内存中的地址，真实的数据存放在**堆内存**里。

### 栈溢出

```javascript
1意外声明全局变量
function hello （）{
    name = 'tom'
}
hello();
2定时器
let name = 'Tom';
setInterval(() => {
  console.log(name);
}, 100);
3闭包
let out = function() {
  let name = 'Tom';
  return function () {
    console.log(name);
  }
}
4事件监听
mounted() {
window.addEventListener("resize",  () => {
    //do something
});
}
```
### 垃圾回收

JS的垃圾回收机制
JS会在创建变量时自动分配内存，在不使用的时候会自动周期性的释放内存，释放的过程就叫 "垃圾回收"。

标记清理，js最常用的回收策略

引用计数，不常用，因为弊端较多

V8的回收机制基于分代回收机制
分代回收机制：将内存分为新生代（young generation）和老生代（tenured generation），新生代为存活时间较短的对象，老生代为存活时间较长或者常驻内存的变量。

V8堆的构成
新生代：采用的回收算法为 Scavenge 算法

老生代：标记清除 & 整理（Mark-Sweep & Mark-Compact，Major GC） 算法
	指针空间（Old pointer space）: 存储的对象含有指向其他对象的指针
	数据空间（Old data space）：存储的对象仅包含数据，无指向其他对象的指针
大对象空间（Large Object Space）：存放超过其他空间（Space）限制的大对象，垃圾回收器从不移动此空间中的对象

代码空间（Code Space）: 代码对象，用于存放代码段，是唯一拥有执行权限的内存空间，需要注意的是如果代码对象太大而被移入大对象空间，这个代码对象在大对象空间内也是拥有执行权限的，但不能因此说大对象空间也有执行权限

Cell空间、属性空间、Map空间 （Cell ,Property,Map Space）： 这些区域存放Cell、属性Cell和Map，每个空间因为都是存放相同大小的元素，因此内存结构很简单。

### 为什么引用类型需要new，基本类型不需要

**基本类型按值引用，引用类型按地址引用**。

在引用字符串的属性或方法时，会通过调用 `new String()` 的方式转换成对象，该对象继承了字符串的方法来处理属性的引用，一旦引用结束，便会销毁这个临时对象，这就是**包装对象**的概念。

### new的实现原理,手写一个
```javascript
function newInstanceof(Fn, ...args) {
    // 创建一个空对象，继承构造函数的 prototype 属性
    const object = Object.create(Fn.prototype);
    // 执行构造函数
    const result = Fn.call(object, ...args);
    // 如果返回结果是对象，就直接返回，否则返回默认this对象
    return result instanceof Object ? result : object;
}

// 测试
function People(name) {
    this.name = name;
}
People.prototype.sayHello = function () {
    console.log("Hi");
};
const yun = newInstanceof(People, "yunmu");
console.log(yun); // People {name: 'yunmu'}
yun.sayHello(); // Hi
```
```javascript
function create() {
	// 创建一个空的对象
  var obj = new Object(),
	// 获得构造函数，arguments中去除第一个参数
  Con = [].shift.call(arguments);
	// 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Con.prototype;
	// 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  var ret = Con.apply(obj, arguments);
	// 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
};

//使用create代替new

function Person() {...}
// 使用内置函数new
var person = new Person(...)
// 使用手写的new，即create
var person = create(Person, ...)
```

### instanceof的原理,手写一个

```javascript
instanceof的判断逻辑是: 从当前引用的proto一层一层顺着原型链往上找,
能否找到对应的prototype。找到了就返回true。

function myInstanceof(Fn, obj) {
    // 获取该函数显示原型
    const prototype = Fn.prototype;
    // 获取obj的隐式原型
    let proto = obj.__proto__;
    // 遍历原型链
    while (proto) {
        // 检测原型是否相等
        if (proto === prototype) {
            return true;
        }
        // 如果不等于
        proto = proto.__proto__;
    }
    return false;
}

// 测试
function People(name) {
    this.name = name;
}
const yun = newInstanceof(People, "yunmu");
console.log(myInstanceof(People, yun)); // true
console.log(myInstanceof(Object, yun)); // true
console.log(myInstanceof(Object, People)); // true
console.log(myInstanceof(Function, People)); // true
console.log(myInstanceof(Function, yun)); // false
```

### prototype instanceof constructor之间的关系

1. `__proto__` （原型链）, 是任何对象都有的一个属性。
2. `prototype`（原型对象） 是方法才会有的属性。
3. `__proto__` 指向该对象的构造方法的原型对象，而`prototype`指向该方法的原型对象。

_ _ *proto* _ _属性是**对象独有**的

prototype是**从一个函数指向一个对象**

constructor也是**对象独有**的，他也是由**对象指向一个函数**，也就是**指向该对象的构造函数**。

![](http://qn.aixshi.top/blog/yuanxinglian.png)

### symbol的理解

ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名

```javascript
let sy = Symbol("KK") // Symbol(KK) typeof(sy); 
console.log(sy); // "symbol" 

// 相同参数 Symbol() 返回的值不相等 
let sy1 = Symbol("kk"); 
sy === sy1; // false 

// 写法1 
let syObject = {}; 
syObject[sy] = "kk";
console.log(syObject); // {Symbol(key1): "kk"}

// 写法2
let syObject = {
  [sy]: "kk"
}
console.log(syObject); // {Symbol(key1): "kk"}

// 写法3
let syObject = {};
Object.defineProperty(syObject, sy, {value: "kk"});
console.log(syObject); // {Symbol(key1): "kk"}
```

Symbol 值作为属性名时，该属性是公有属性不是私有属性，可以在类的外部访问。但是不会出现在
for...in 、 for...of 的循环中，也不会被 Object.keys() 、 Object.getOwnPropertyNames() 返回。如果
要读取到一个对象的 Symbol 属性，可以通过 Object.getOwnPropertySymbols() 和 Reflect.ownKeys()
取到。

```javascript
for (let i in syObject) { console.log(i); }
Object.keys(syObject); // [] 
Object.getOwnPropertySymbols(syObject); // [Symbol(key1)] 
Reflect.ownKeys(syObject); // [Symbol(key1)]
```


### AMD、CMD、ES6、CommonJS的区别
都是JS模块化开发的标准

CommonJs和AMD，前者是针对服务端的js，也就是nodejs，后者是针对浏览器的。

CommonJS：模块引用(require) 模块输出(exports) 模块标识(module) 

ES6：模块引用(import) 模块输出(export) 前者支持动态导入，也就是 require(${path}/xx.js)，后者目前不支持。 

CommonJS是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而ES6是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响。

CommonJS在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是ES6采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化

1、两者的模块导入导出语法不同：commonjs是module.exports，exports导出，require导入；ES6则是export导出，import导入。

2、commonjs是运行时加载模块，ES6是在静态编译期间就确定模块的依赖。

3、ES6在编译期间会将所有import提升到顶部，commonjs不会提升require。

4、commonjs导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。ES6是导出的一个引用，内部修改可以同步到外部。

5、两者的循环导入的实现原理不同，commonjs是当模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

6、commonjs中顶层的this指向这个模块本身，而ES6中顶层this指向undefined。

7、CommonJs 是单个值导出，ES6 Module可以导出多个

8、然后就是commonjs中的一些顶层变量在ES6中不再存在：

arguments
require
module
exports
__filename

AMD、CMD都使用define定义模块，require引入模块，区别在于AMD是前置依赖， CMD是就近依赖
```javascript
// AMD 依赖必须一开始就声明 
define(["./a", "./b"], function (require, factory) { // do something... }); 
// CMD 
define(function(require, factory) { var a = require('./a'); // 依赖就近书写 // do something... });
```

## 异步

### 事件循环

先同步再异步，异步中先微任务，在宏任务。

同步任务进入主线程，异步任务进入Event Table并注册函数 当指定的事情完成时，Event Table会将这
个函数移入Event Queue。主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。上述过程会不断重复，也就是常说的Event Loop(事件循环)。

同步任务进入主线程，主线程从"任务队列"中读取执行事件，这个过程是循环不断的，这个机制被称为事件循环。此机制具体如下:主线程会不断从任务队列中按顺序取任务执行，每执行完一个任务都会检查microtask队列是否为空（执行完一个任务的具体标志是函数执行栈为空），如果不为空则会一次性执行完所有microtask。然后再进入下一个循环去任务队列中取下一个任务执行。

macro-task(宏任务，是由宿主发起的)：主代码，script，setTimeout，setInterval，setImmediate，I/O，UI rendering
micro-task(微任务，由JavaScript自身发起)：Promise.then/catch，process.nextTick，fetch，v8垃圾回收

### 事件流和事件委托

事件流一般分三个阶段：1、捕获阶段（由外向内） 2、目标阶段 （执行阶段） 3、冒泡阶段（由内向
外）

阻止事件冒泡e.stopPropagation() 阻止默认动作e.preventDefault()

事件委托：就是把事件委托给父级，利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的
所有事件。
```javascript
target.nodeName.toLowerCase() == 'li'
```
```html
<body>
  <button id="btnAdd">添加</button>
  <ul id="ulList">
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
  <script>
    var btnAdd = document.getElementById('btnAdd');
    var ulList = document.getElementById('ulList');
    var num = 3;

    ulList.onclick = function (event) {
      var event = event || window.event;
      var target = event.target || event.srcElement;
      if (target.nodeName.toLowerCase() == 'li') {
        alert(target.innerHTML);
      }
    }

    btnAdd.onclick = function () {
      num++;
      var li = document.createElement('li');
      li.innerHTML = num;
      ulList.appendChild(li);
    }

    // 阻止默认事件 e.preventDefault()
  </script>
</body>
```

## ES6

### 箭头函数

```
箭头函数和普通函数的区别

  箭头函数没有自己的this指针
    通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定this
 
  箭头函数没有prototype属性。

  使用 new 操作符
    箭头函数不能用作构造器，和 new 一起用会抛出错误

  箭头函数没有argument

  不可以使用yield命令，因此箭头函数不能用作 Generator 函数

  箭头函数可以使用闭包
```

```javascript
注意点：没有 this、super、arguments 和 new.target 绑定。

var func = () => {
  // 箭头函数里面没有 this 对象，
  // 此时的 this 是外层的 this 对象，即 Window 
  console.log(this)
}
func(55)  // Window 
 
var func = () => {    
  console.log(arguments)
}
func(55);  // ReferenceError: arguments is not defined

箭头函数体中的 this 对象，是定义函数时的对象，而不是使用函数时的对象。

function fn(){
  setTimeout(()=>{
    // 定义时，this 绑定的是 fn 中的 this 对象
    console.log(this.a);
  },0)
}
var a = 20;
// fn 的 this 对象为 {a: 18}
fn.call({a: 18});  // 18
```

### let const如何实现块级作用域,从编译层面解释

```
编译过程中，通过let声明的变量，会被放到词法环境中，在词法环境内部，维护了一个小型栈结构，这个区域中的变量并不影响作用域块外面的变量，比如在作用域外面声明了变量 b，在该作用域块内部也声明了变量 b，当执行到作用域内部时，它们都是独立的存在。
```

### 如何使用ES5实现const声明的变量不能修改的操作
```javascript
var __const = function __const(data, value) {
  window.data = value // 把要定义的data挂载到window下，并赋值value
  Object.defineProperty(window, data, { // 利用Object.defineProperty的能力劫持当前对象，并修改其属性描述符
    enumerable: false,
    configurable: false,
    get: function () {
      return value
    },
    set: function (data) {
      if (data !== value) { // 当要对当前属性进行赋值时，则抛出错误！
        throw new TypeError('Assignment to constant variable.')
      } else {
        return value
      }
    }
  })
}
__const('a', 10)
console.log(a)
delete a
console.log(a)
for (let item in window) { // 因为const定义的属性在global下也是不存在的，所以用到了enumerable: false来模拟这一功能
  if (item === 'a') { // 因为不可枚举，所以不执行
    console.log(window[item])
  }
}
a = 20 // 报错
```

```javascript
// let
(function(){var a = 1;console.log(a)})();console.log(a)
```

### Map, Set, WeakMap, WeakSet
```
set 
set 类似于数组，但成员值是唯一的
  属性：
    constructor
    size
  方法：
    操作
    add
    delete
    has
    clear
    遍历
    keys
    values
    entries
    forEach
可以很简单的实现交集并集和差集

WeakSet 
  成员只能是对象，而不能是其他类型的值
  对象都是弱引用 -> 垃圾回收机制不考虑WeakSet对该对象的引用
    不适合引用，适合用来检测循环引用
  不可遍历

Map
map 类似于对象，是一种更完善的Hash结构
  方法：
  set
  get
  has
  delete
  clear

  遍历
  keys
  values
  entries
  forEach

WeakMap
  只接受对象作为键名
  弱引用

Objects 和 maps 的比较
  Map 默认情况不包含任何键，Object 有一个原型
  一个 Map的键可以是任意值，一个Object 的键必须是一个 String 或是Symbol
  Map 中的 key 是有序的，Object 的键是无序的
  Object 的键值对个数只能手动计算
  Map 是 iterable 的，所以可以直接被迭代

```


(自定义工具函数库)[http://yun.y2y7.com/]

### element-UI 实现原理

### 如何封装一个组件

### 项目优化
### JSONP
```javascript
function JSONP({
    url,
    params,
    callbackKey,
    callback
  }) {
    const callbackName = 'callbackFunction';
    // 在参数里制定 callback 的名字
    params = params || {}
    params[callbackKey] = callbackName
    // 预留 callback
    window[callbackName] = callback
    // 拼接参数字符串
    const paramKeys = Object.keys(params)
    const paramString = paramKeys
      .map(key => `${key}=${params[key]}`)
      .join('&')
    // 插入 DOM 元素
    const script = document.createElement('script')
    script.setAttribute('src', `${url}?${paramString}`)
    console.log(script.src)
    document.body.appendChild(script)
  }

  JSONP({
    url: 'https://www.runoob.com/try/ajax/jsonp.php',
    params: {
      id: '2'
    },
    callbackKey: 'jsoncallback',
    callback(result) {
      console.log(result)
    }
  })
```
### 发布订阅模式
```javascript
class EventEmitter {
  constructor() {
    this.cache = {}
  }
  
  // 注册事件
  $on(eventType, fn) {
    // 添加事件
    this.cache[eventType] = this.cache[eventType] || [];
    this.cache[eventType].push(fn);
  }
  
  // 注销事件
  $off(eventType) {
    if(this.cache[eventType]) {
      delete this.cache[name];
    }
  }
  
  // 触发事件
  $emit(eventType) {
    if(this.cache[eventType]) {
      this.cache[eventType].forEach(handle=>{
        handle();
      })
    }
  }
}
// 测试
let eventEmitter = new EventEmitter();
function f(){
   console.log("Jason");
}
eventEmitter.$on('click' f);
eventEmitter.$emit('click');        // Jason

eventEmitter.$off('click');         // click 事件注销
eventEmitter.$emit('click');        // click 事假已不存在
```
### 继承
```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log('People')
}

function Chinese(name, age, city) {
  Person.call(this, name, age) // ! 
  this.city = city
}
// 原型链继承
Chinese.prototype = new Person()
// call
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log('People')
}

function Chinese(name, age, city) {
  Person.call(this, name, age) // ! 
  this.city = city
}
let chinese1 = new Chinese('li', 22, 'beijing')
console.log(chinese1)

// 组合继承
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log('People')
}

function Chinese(name, age, city) {
  Person.call(this, name, age)
  this.city = city
}
/*
TODO 可以封装
function Fn() {}
Fn.prototype = Person.prototype
Chinese.prototype = new Fn()
*/

// function object(obj) {
//   function Fn() {}
//   Fn.prototype = obj
//   return new Fn()
// }
// Chinese.prototype = object(Person.prototype)
Chinese.prototype = Object.create(Person.prototype)

let chinese1 = new Chinese('li', 22, 'beijing')

console.log(chinese1)

// 寄生组合继承

function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log('People')
}

function Chinese(name, age, city) {
  Person.call(this, name, age)
  this.city = city
}

inheritPrototype(Chinese, Person)

function inheritPrototype(Sub, Super) {
  let prototype = Object.create(Super.prototype)
  prototype.constructor = Sub
  Sub.prototype = prototype
}

let chinese1 = new Chinese('li', 22, 'beijing')

console.log(chinese1)

// class 继承
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  say() {
    console.log('Hello Person !!!')
  }
}
class Chinese extends Person {
  constructor(name, age, city) {
    super(name, age)
    this.city = city
  }
}
// let person = new Person('class', 19)
// console.log(person)
let chinese = new Chinese('wang',22,'beijing')
console.log(chinese)
chinese.say()

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

### 链表

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
// 遍历
let current = head
while(current){
 console.log(current.val)
  current = current.next
}
// 插入

存储插入位置的前一个节点
存储插入位置的后一个节点
将插入位置的前一个节点的 next 指向插入节点
将插入节点的 next 指向前面存储的 next 节点

let current = head
while (current < position){
  pervious = current;
  current = current.next;
}
pervious.next = node;
node.next = current;
// 删除
while (current != node){
  pervious = current;
  current = current.next;
  nextNode = current.next;
}
pervious.next = nextNode

由于链表插入删除效率极高，达到O(1)。
对于不需要搜索但变动频繁且无法预知数量上限的数据的情况的时候，
都可以使用链表
```
## ES6

### 数组

扩展运算符

构造函数

    Array.from()
    将两类对象转为真正的数组：
    类似数组的对象和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

    Array.of()
    用于将一组值，转换为数组

实例对象新增的方法

    copyWithin()
    find()、findIndex()
    fill()
    entries()，keys()，values()
      keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
    includes()
    flat()，flatMap()

### 对象

ES6 一共有 5 种方法可以遍历对象的属性。

    for...in：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）

    Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名

    Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名

    Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名

    Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

super关键字

    this关键字总是指向函数所在的当前对象，
    ES6 又新增了另一个类似的关键字super，
    指向当前对象的原型对象

属性名表达式

    ES6 允许字面量定义对象时，将表达式放在括号内

### 函数

作用域

箭头函数

    函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象

    不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误

    不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替

    不可以使用yield命令，因此箭头函数不能用作 Generator 函数

### promise

是异步编程的一种解决方案，比传统的解决方案（回调函数）更加合理和更加强大

### Generator

yield表达式可以暂停函数执行，next方法用于恢复函数执行，这使得Generator函数非常适合将异步任务同步化

### proxy

Proxy为 构造函数，用来生成 Proxy实例

`var proxy = new Proxy(target, handler)`

### module
`import 
export`

## ES7 

一.Array.prototype.includes

二.Exponentiation Operator(**)

## ES8

一.padStart,padEnd

二.Object.values/Object.entries

`异步函数Async`

## ES9

异步迭代

## ES10 
```
Array.Flat() Array.flatMap()
Object.fromEntries()
String.trimStart() & String.trimEnd()
Optional Catch Binding
Function.toString()
Symbol.description
```

## ES11 
新增特性-可选链运算符、空值合并运算符、BigInt
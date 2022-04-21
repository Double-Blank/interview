## Object.defineProperty

> Object.defineProperty(obj, prop, descriptor)
  -   obj: 要在其上定义属性的对象
  -   prop:  要定义或修改的属性的名称
  -   descriptor: 将被定义或修改的属性的描述

      obj代表的是你要处理的对象，

      prop为你要定义或者修改的属性的key

      descriptor是一个对象，具体为：
      
          configurable    类型： boolean    释义：是否可以修改默认属性
          enumerable      类型： boolean    释义：是否可以被枚举
          writable        类型： boolean    释义：是否可以修改修改这个属性的值
          value           类型： any        释义：初始值
          get             类型： Function   释义：被修饰的属性，在被访问的时候执行
          set             类型： Function   释义：被修饰的属性，在被修改的时候执行


```javascript
// 例1 认识Object.defineProperty
const obj = {}
let name = 'Vue'
Object.defineProperty(obj, 'name', {
    get() {
      console.log('get name')
      return name
    },
    set(newVal) {
      console.log('set value', newVal)
      name = newVal
    }
})

console.log(obj.name)

obj.name = 'test'

console.log(obj.name)

```

```javascript
// 例2 基本响应式的实现
const obj = {
  name: 'lisi',
  age: 20
}
observe(obj)

function observe(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}
function defineReactive(target, key, value) {
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newVal) {
      if (newVal !== value) {
        value = newVal
        console.log('更新视图')
      }
    }
  })
}
obj.age = 21
```

```javascript
// 例3 处理值为复杂对象情况
const obj = {
  name: 'lisi',
  age: 20,
  friend: {
    friendName: 'xiaoshi'
  }
}
observe(obj)

function observe(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}
function defineReactive(target, key, value) {
  observe(value)
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newVal) {
      observe(newVal)
      if (newVal !== value) {
        value = newVal
        console.log('更新视图')
      }
    }
  })
}
obj.age = 21
```

> 问题1 深度监听：数据是对象，层级很深，会不断的监听下去，页面渲染就会卡死
> Vue3使用proxy解决

> 问题2 属性删除，属性新增
> 删除 Vue.delete 新增Vue.set

```javascript
// 例4 处理值为数组的情况
const obj = {
  name: 'lisi',
  age: 20,
  friend: {
    friendName: 'xiaoshi'
  },
  colors: ['red', 'orange', 'green']
}

const oldArrayProto = Array.prototype
const newArrProto = Object.create(oldArrayProto)
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
  newArrProto[methodName] = fuction() {
    oldArrayProto[methodName].call(this, ...arguments)
  }
})

console.log(new)

observe(obj)

function observe(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if (Array.isArray(targer)) {
    target.__proto__ = newArrProto
  }
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}
function defineReactive(target, key, value) {
  observe(value)
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newVal) {
      observe(newVal)
      if (newVal !== value) {
        value = newVal
        console.log('更新视图')
      }
    }
  })
}
obj.age = 21
```

> Object.defineProperty()只是检测数据，对ui的重新渲染需要发布-订阅


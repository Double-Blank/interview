## Vue 
### 生命周期
```
beforeCreate 组件实例被创建之初，data 和 methods 中的数据还没有初始化
created 整个Vue实例创建完毕，组件实例已经完全创建，data 和 methods 都已经初始化好了
bebeforeMount 模板渲染，相关的 render 函数首次被调用，模板已经在内存中编译好了，但是尚未挂载到页面中去
mounted 组件内容渲染到页面，el 被新创建的 vm.el 替换，真实dom已经生成，el可用，组件脱离创建阶段，进入运行阶段
beforeUpdate 在数据发生改变后，DOM 被更新之前被调用。
updated 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
  activated 被 keep-alive 缓存的组件激活时调用。
  deactivated 被 keep-alive 缓存的组件失活时调用。
beforeDestroy 实例销毁之前调用。在这一步，实例仍然完全可用。
destroyed 实例销毁后调用。

创建实例是从父到子，渲染从子到父

父beforeCreate —> 父created —> 父beforeMount —> 子beforeCreate —> 子created —> 子beforeMount —> 子mounted —> 父mounted

父beforeUpdate —> 子beforeUpdate —> 子updated —> 父updated

父beforeDestroy -> 子beforeDestroy -> 子destroyed-> 父destroyed
```

### beforeDestory 钩子能做什么
  我们常用来销毁一些监听事件及定时函数，使用场景一般用在vue实例的$off方法清除eventBus

### Vue组件通信

父子组件通信: `props/emit` `$refs/$children` `$parent` 

`$attrs/$listeners` `eventBus` `provide/inject` `Vuex` `localstorge`

兄弟组件通信: `eventBus` `vuex`

跨级通信: `eventBus` `Vuex` `provide / inject` `attrs / listeners`
```
父 -> 子 props

子 -> 父 this.$emit() 
```
```javascript
// 父组件 通过 $refs / $children 来获取子组件值
$refs => this.$refs.refName.子组件属性 / 子组件方法
$children => this.$children[index].子组件属性/方法

// 子组件 通过 $parent 来获取父组件实例的属性和方法
this.$parent.getQuery()

this.$refs === $children
```

```
状态提升 提升到公共的父亲里面
```
```javascript
eventBus  

// main.js 
export const eventBus = new Vue()
//或
Vue.prototype.$eventBus = new Vue()

// child1  
hub.$emit

// child2 
created -> hub.$on //监听事件，如果事件被触发，执行回调函数
//具体为：
created() {eventBus.on('method方法名', () => {})}

移除 EventBus.$off
```
```
Vuex
  child1 this.$store.commit()
  child2 ...mapState(['username])
```
```javascript
# provide
//对象
provide:{
    name:'测试'
}
//返回对象的函数
provide(){
    return {
        name: '测试'
    }
}

#inject
inject:['name']
不是可响应的，但如果传入可监听对象，是可响应的
```
```
$attrs / $listeners 

A -> C 之间的通信

  Vue.component('C',{})
  触发父组件A中的事件 this.$emit('getCData',val)

  Vue.component('B',{})
  <C v-bind="$attrs" v-on="$listeners"></C>
  C组件中能直接触发getCData的原因在于 B组件调用C组件时 使用 v-on 绑定了$listeners 属性
  通过v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的）

  Vue.component('A',{})
  getCData(val){
    console.log("这是来自C组件的数据："+val)
  }

  child1 {{$attrs.attribute}}
    inheritAttrs: false
  child2 this.$listeners
```

### vue 和 react 的区别 🎈🎈

监听数据变得实现原理不同
```
Vue 通过 getter / setter 以及一些函数的劫持，能精确直到数据变化

React 默认是通过比较引用的方式（ diff ）进行的，如果不优化可能导致大量必要的 VDOM 的重新渲染。
```
设计理念不同
```
vue使用的是可变数据，而 React 更强调数据不可变
```
数据流不同
```
Vue 是双向绑定数据流，而 React 是单向数据流
```
组合不同功能方式不同
```
Vue 使用 mixins（混合），而 React 使用 Hoc（高阶组件：高阶组件本质上是一个函数，函数内部返回一个类组件)
```
通信方式不同
```
Vue中有三种方式可以实现组件通信：父组件通过props向子组件传递数据或者回调，虽然可以传递回调，但是我们一般只传数据；子组件通过事件向父组件发送消息；通过V2.2.0中新增的provide/inject来实现父组件向子组件注入数据，可以跨越多个层级。

React中也有对应的三种方式：父组件通过props可以向子组件传递数据或者回调；可以通过 context 进行跨层级的通信，这其实和 provide/inject 起到的作用差不多。React 本身并不支持自定义事件，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数，但Vue更倾向于使用事件。在React中我们都是使用回调函数的，这可能是他们二者最大的区别。
```
模板渲染方式的不同
```
React是通过JSX渲染模板

而Vue是通过一种拓展的HTML语法进行渲染
```
渲染过程不同
```
Vue 是边计算边渲染，而 React 是等计算完毕之后在渲染
```
框架本质不同
```
Vue本质是MVVM框架，由MVC发展而来。

React是前端组件化框架，由后端组件化发展而来
```
### v-if 和 v-show 的区别

v-if 在编译过程中会被转化成三元表达式，条件不满足时不渲染此节点。

v-show 会被编译成指令，条件不满足时控制样式将此节点隐藏（display:none）
```
扩展补充：display:none 、 visibility:hidden 和 opacity:0 之间的区别？
一、是否占据空间。
display:none，隐藏之后不占位置；visibility:hidden、opacity:0，隐藏后任然占据位置。

二、子元素是否继承。
display:none --- 不会被子元素继承，父元素都不存在了，子元素也不会显示出来。
visibility:hidden --- 会被子元素继承，通过设置子元素 visibility:visible 来显示子元素。
opacity:0 --- 会被子元素继承，但是不能设置子元素 opacity:0 来先重新显示。

三、事件绑定。
display:none 的元素都已经不存在了，因此无法触发他绑定的事件。
visibility:hidden 不会触发他上面绑定的事件。
opacity:0 元素上面绑定的事件时可以触发的。

四、过度动画。
transition对于display是无效的。
transition对于visibility是无效的。
transition对于opacity是有效的。
```

### render 函数

Render 函数是 Vue2.x 新增的一个函数、主要用来提升节点的性能，它是基于 JavaScript 计算。使用 Render 函数将 Template 里面的节点解析成虚拟的 Dom 。

### vue 内置指令
```
v-once - 定义它的元素或组件只渲染一次，包括元素或组件的所有节点，首次渲染后，不再随数据的变化重新渲染，将被视为静态内容。
v-cloak - 这个指令保持在元素上直到关联实例结束编译 -- 解决初始化慢到页面闪动的最佳实践。
v-bind - 绑定属性，动态更新HTML元素上的属性。例如 v-bind:class。
v-on - 用于监听DOM事件。例如 v-on:click v-on:keyup
v-html - 赋值就是变量的innerHTML -- 注意防止xss攻击
v-text - 更新元素的textContent
v-model - 1、在普通标签。变成value和input的语法糖，并且会处理拼音输入法的问题。2、再组件上。也是处理value和input语法糖。
v-if / v-else / v-else-if。可以配合template使用；在render函数里面就是三元表达式。
v-show - 使用指令来实现 -- 最终会通过display来进行显示隐藏
v-for - 循环指令编译出来的结果是 -L 代表渲染列表。优先级比v-if高最好不要一起使用，尽量使用计算属性去解决。注意增加唯一key值，不要使用index作为key。
v-pre - 跳过这个元素以及子元素的编译过程，以此来加快整个项目的编译速度。
```

### 怎样理解 Vue 的单项数据流

数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改。这样会防止从子组件意外改变父组件的状态，从而导致你的应用的数据流向难以理解。

注意：在子组件直接用 v-model 绑定父组件传过来的 props 这样是不规范的写法，开发环境会报警告。

如果实在要改变父组件的 props 值可以再data里面定义一个变量，并用 prop 的值初始化它，之后用$emit 通知父组件去修改。


### computed 和 watch 的区别和运用的场景

computed 是计算属性，依赖其它属性计算值，并且 computed 的值有缓存，职友集当计算值变化才会返回内容，他可以设置getter和setter。

watch 监听到值的变化就会执行回调，在回调中可以进行一系列的操作。

计算属性一般用在模板渲染中，某个值是依赖其它响应对象甚至是计算属性而来；而侦听属性适用于观测某个值的变化去完成一段复杂的业务逻辑。

### v-if 和 v-for 为什么不建议一起使用

v-for和v-if不要在同一标签中使用，因为解析时先解析v-for在解析v-if。如果遇到需要同时使用时可以考虑写成计算属性的方式。

### Vue 2.0 响应式数据的原理 🎈🎈

整体思路是数据劫持 + 观察者模式

对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持（只会劫持已存在的属性），数组则是通过重写数组来实现。当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存在它所依赖的 watcher （依赖收集）get，当属性变化后会通知自己对应的 watcher 去更新（派发更新）set。

1、Object.defineProperty 数据劫持
2、使用 getter 收集依赖 ，setter 通知 watcher派发更新。
3、watcher 发布订阅模式。

### Object.defineProperty

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

### Vue 的计算属性如何实现缓存

#### watcher 的流程

进入正题，Vue 初次运行时会对 computed 属性做一些初始化处理，首先我们回顾一下 watcher 的概念，它的核心概念是 get 求值，和 update 更新。

在求值的时候，它会先把自身也就是 watcher 本身赋值给 Dep.target 这个全局变量。

然后求值的过程中，会读取到响应式属性，那么响应式属性的 dep 就会收集到这个 watcher 作为依赖。

下次响应式属性更新了，就会从 dep 中找出它收集到的 watcher，触发 watcher.update() 去更新。

所以最关键的就在于，这个 get 到底用来做什么，这个 update 会触发什么样的更新。

在基本的响应式更新视图的流程中，以上概念的 get 求值就是指 Vue 的组件重新渲染的函数，而 update 的时候，其实就是重新调用组件的渲染函数去更新视图。

而 Vue 中很巧妙的一点，就是这套流程也同样适用于 computed 的更新。

#### 初始化 computed

这里先提前剧透一下，Vue 会对 options 中的每个 computed 属性也用 watcher 去包装起来，它的 get 函数显然就是要执行用户定义的求值函数，而 update 则是一个比较复杂的流程，接下来我会详细讲解。

首先在组件初始化的时候，会进入到初始化 computed 的函数

进入 initComputed ,首先定义了一个空的对象，用来存放所有计算属性相关的 watcher，后文我们会把它叫做 计算watcher。
然后循环为每个 computed 属性生成了一个 计算watcher。

`dirty 属性`其实是缓存的关键

发现 dirty 是 false，直接返回 watcher.value 这个值就可以了，这其实就是计算属性缓存的概念。

在update中只有计算属性依赖的响应式值发生更新的时候，才会把 dirty 重置为 true

>    响应式的值 count 更新
>    
>    同时通知 computed watcher 和 渲染 watcher 更新
>    
>    omputed watcher 把 dirty 设置为 true
>    
>    视图渲染读取到 computed 的值，由于 dirty 所以 computed watcher 重新求值。





### Vue 如何检测数组变化

数组考虑性能原因没有用 defineProperty 对数组的每一项进行拦截，而是选择对7种数组（push,shift,pop,splice,unshift,sort,reverse）方法进行重写（AOP 切片思想）。

所以在 Vue 中修改数组的索引和长度无法监控到。需要通过以上7种变异方法修改数组才会触发数组对应的watcher进行更新。

### 虚拟DOM是什么？有什么优缺点？

频繁操作DOM，会产生一定性能问题。这就是虚拟Dom的产生原因。Vue2的Virtual DOM 借鉴了开源库 snabbdom 的实现。Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点，是对真实DOM的一层抽象。

优点：
1、保证性能下限：框架的虚拟DOM需要适配任何上层API可能产生的操作，他的一些DOM操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的DOM操作性能要好很多，因此框架的虚拟DOM至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，既保证性能的下限。

2、无需手动操作DOM：我们不需手动去操作DOM，只需要写好 View-Model的 代码逻辑，框架会根据虚拟DOM和数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率。

3、跨平台：虚拟DOM本质上是JavaScript对象，而DOM与平台强相关，相比之下虚拟DOM可以进行更方便地跨平台操作，例如服务器端渲染、weex开发等等。

缺点：
1、无法进行极致优化：虽然虚拟DOM + 合理的优化，足以应对大部分应用的性能需要，但在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化。

2、首次渲染大量DOM时，由于多了一层DOM计算，会比innerHTML插入慢。

### 虚拟DOM
```
数据改变 -》 虚拟DOM(计算变更) -》 操作真实DOM -》 视图更新

JS 表达DMO（抽象语法树）

snabbdom
  通过patch()函数 把虚拟节点塞到容器里vnode -> container
 
diff 算法 -》 树
  1、只比较同一级
  2、标签名不同，直接删除
  3、标签名相同，key相同，就认为是相同节点不继续深度比较

生成vnode
  h函数会通过算法返回一个vnode节点，而vnode节点是保存了6个属性的节点

patch
接收 oldVnode vnode|Element ，新 vnode
  init -> 是不是DOM元素 是就创建空的Vnode并且关联一个DOM元素，还会比较patch()第一个参数和第二个参数是不是同一个Vnode，如果是同一个Vnode我们就直接patchVnode更新，不是就创建新的DOM元素，并且删除老的

patchVnode
  核心就是在旧的虚拟dom上打补丁，尽可能的复用节点，减少浏览器的回流重绘，提高性能

  设置新的 vnode 关联的DOM元素

  if(isUndef(vonode.text)) { // 无text 有children
    // 新有children 老有
    updateChildren
    // 新有 children 老没有 但有text
    清空text -> add children
    // 新无 就有 chilidren
    移除老的
    // 老的Vnode有text
    清空
  }
  else if (vonode.text !== old.text) {
    // 设置新的Vnode
  }

updateChidren
  复用老的节点
  oldstartIdx

```
### diff 算法了解吗？
diff算法采用同级比较。
- 1、tag 标签不一致直接新节点替换旧节点。
- 2、tag 标签一样。
- - 先替换属性
- - 对比子元素
- - - 新老都有子元素，采用双指针方式进行对比
sameVnode 判断tag和key完全相同为同一节点，进行节点复用
- - - - 头和头相等对比
- - - - 尾和尾相等对比
- - - - 头和尾相等对比
- - - - - sameVnode 的时候传入两个新老子节点patch(oldChild,newChild)
- - - - 乱序情况
- - - - - 上面的都不符合，先遍历旧子节点数组形成 key值映射的map对象。
然后根据新子节点数组循环 按照key值和位置关系移动以及新增节点 最后删除多余的旧子节点 如果移动旧节点同样需要patch(oldChild,newChild)
- - - 新的有子元素，老的没有子元素。-- 直接将子元素虚拟节点转化成真实节点插入即可。
- - - 新的没有子元素，老的有子元素。 -- 直接清空 innerHtml
- 3、无 tag 标签 -- 文本节点直接比较内容是否一致

## Vue3.0 

### Vue3.0 用过吗？了解多少？

响应式原理的改变 Vue3.x 使用 Proxy 取代 Vue2.x 版本的 Object.defineProperty。

组件选项声明方式 Vue3.x 使用 Composition API setup是Vue3.x新增的一个选项，他是组件内使用Composition API 的入口。

模板语法变化 slot 具名插槽语法，自定义指令v-model升级。

其他方面的更改 Suspense支持Fragment（多个根节点）和 Protal（在dom其他部分渲染组件内容）组件，针对一些特殊的场景做了处理。基于 treeShaking 优化，提供了更多的内置功能。

### Vue3.0 和 2.0 的响应式原理区别

Vue3.x 改用 Proxy 替代 Object.defineProperty。因为 Proxy 可以直接监听对象和数组的变化，并且有多达13种拦截方法。

### Vue2 与 Vue3 生命周期

```
beforeCreate -> 使用 setup()
created -> 使用 setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted


errorCaptured -> onErrorCaptured

Vue2 options API

Vue3 compotion API 优化代码组织
```
### v-model 原理

v-model 是语法糖

1、v-bind绑定响应式数据

2、通过v-on:input触发事件获取当前$event.target.value，然后赋值给当前变量。

```
v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件。
text 和 textarea 元素使用 value property 和 input 事件；
checkbox 和 radio 使用 checked property 和 change事件；
select 字段将 value 作为 prop 并将 change 作为事件。
注意：对于需要使用输入法的语言，你会发现 v-model 不会在输入法组合文字过程中得到更新。
在普通元素上：
input v-model='sth'
input v-bind:value='sth' v-on:input='sth = $event.target.value'
```

### v-for为什么要加key

如果不使用key，Vue会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。`key 是为Vue中Vnode的唯一标识`，通过这个key，我们的diff操作可以更准确、更快速。

更准确：因为带key就不是就地复用了，在sameNode函数 a.key === b.key 对比中可以避免就地复用的情况。所以更加准确。

更快速：利用key的唯一性生成map对象来获取对应节点，比遍历方式块。

### Vue事件绑定原理

原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过Vue自定义的$on实现的。如果要在组件上使用原生事件，需要加.native修饰符，这样就相当于在父组件中把子组件当做普通的HTML标签，然后加上原生事件。

`$on、$emit` 是基于发布订阅模式的，维护一个事件中心，on的时候将事件按名称存在事件中心里，称之为订阅者，然后emit将对应的事件进行发布，去执行事件中心里的对应的监听器。

### vue-router 路由钩子函数是什么？执行顺序是什么？
```
路由钩子的执行流程，钩子函数种类有：全局守卫、路由守卫、组件守卫。

完整的导航解析流程：

1、导航被触发。
2、在失活的组件里调用 beforeRouterLeave 守卫。
3、调用全局的 beforeEach 守卫。
4、在重用的组件调用 beforeRouterUpdate 守卫（2.2+）。
5、在路由配置里面 beforeEnter。
6、解析异步路由组件。
7、在被激活的组件里调用 beforeRouterEnter。
8、调用全局的 beforeResolve 守卫（2.5+）。
9、导航被确认。
10、调用全局的 afterEach 钩子。
11、触发 DOM 更新。
12、调用 beforeRouterEnter 守卫中传给next的回调函数，创建好的组件实例会作为回调函数的参数传入。
```

### 动态路由

动态路径参数
```javascript
const User = {
  template: "User",
};
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User },
  ],
});

```

### vue-router 组件复用导致路由参数失效怎么办
1、通过watch监听路由参数再发请求
```javascript
watch: {
  "router": function () {
    this.getData(this.$router.params.xxx)
  }
}
```
2、用 :key来阻止复用
```
router-view :key="$route.fullPath"
```

### 使用过 Vue SSR 吗？说说 SSR

SSR 也就是服务端渲染，也就是将 Vue 在客户端把标签渲染成 HTML 的工作放在服务端完成，然后再把 html 直接返回给客户端。

优点：
SSR 有着更好的 SEO、并且首屏加载速度更快。

缺点：
开发条件会受限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Node.js 的运行环境。
服务器会有更大的负载需求。


### vue 中使用了哪些设计模式

1、工厂模式 - 传入参数即可创建实例
虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode。

2、单例模式 - 整个程序有且仅有一个实例
vuex 和 vue-router 的插件注册方法 install 判断如果系统存在实例就直接返回掉。

3、发布-订阅模式。（vue 事件机制）

4、观察者模式。（响应式数据原理）

5、装饰器模式（@装饰器的用法）

6、策略模式，策略模式指对象有某个行为，但是在不同的场景中，该行为有不同的实现方案 - 比如选项的合并策略。

### 你都做过哪些 Vue 的性能优化

这里只列举针对 Vue 的性能优化，整个项目的性能优化是一个大工程。

- 对象层级不要过深，否则性能就会差。
- 不需要响应式的数据不要放在 data 中（可以使用 Object.freeze() 冻结数据）
- v-if 和 v-show 区分使用场景
- computed 和 watch 区分场景使用
- v-for 遍历必须加 key，key最好是id值，且避免同时使用 v-if
- 大数据列表和表格性能优化 - 虚拟列表 / 虚拟表格
- 防止内部泄露，组件销毁后把全局变量和时间销毁
- 图片懒加载
- 路由懒加载
- 异步路由
- 第三方插件的按需加载
- 适当采用 keep-alive 缓存组件
- 防抖、节流的运用
- 服务端渲染 SSR or 预渲染

### Vue.mixin 的使用场景和原理

在日常开发中，我们经常会遇到在不同组件中经常用到一些相同或者相似的代码，这些代码的功能相对独立，可以通过vue 的 mixin 功能抽离公共的业务逻辑，原理类似“对象的继承”，当组件初始化时会调用 mergeOptions 方法进行合并，采用策略模式针对不同的属性进行合并。当组件和混入对象含有相同名选项时，这些选项将以恰当的方式进行“合并”。
```
// 复用代码
export const showMixin = {
  data() {}
  methods: {

  }
}

import {showMixin} from ''

export default {
  mixins: [showMixin]
}

相同数据 用组件里的
```

### nextTick 使用场景和原理

nextTick 中的回调是在下次 DOM 更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。主要思路就是采用微任务优先的方式调用异步方法去执行 nextTick 包装的方法。

### keep-alive 使用场景和原理

keep-alive 是 Vue 内置的一个组件，可以实现组件缓存，当组件切换时不会对当前组件进行卸载。
- 常用的两个属性 include/exclude，允许组件有条件的进行缓存。
- 两个生命周期 activated/deactivated，用来得知当前组件是否处理活跃状态。
- keep-alive 运用了 LRU 算法，选择最近最久未使用的组件予以淘汰。

扩展补充：LRU 算法是什么？
```
        this.keys

| 淘汰 | | | 被访问 |新入|

1、将数据从尾部插入到this.keys
2、每当缓存命中（即缓存数据被访问），则将数据一刀 this.keys的尾部
3、this.keys满的时候，头部的数据丢弃
```

### Vue.set 方法原理
了解 Vue 响应式原理的同学都知道在两种情况下修改 Vue 是不会触发视图更新的。

1、在实例创建之后添加新的属性到实例上（给响应式对象新增属性）

2、直接更改数组下标来修改数组的值。

Vue.set 或者说是 $set 原理如下

因为响应式数据 我们给对象和数组本身新增了`__ob__`属性，代表的是 Observer 实例。当给对象新增不存在的属性，首先会把新的属性进行响应式跟踪 然后会触发对象` __ob__ `的dep收集到的 watcher 去更新，当修改数组索引时我们调用数组本身的 splice 方法去更新数组。

### Vue.extend 作用和原理

官方解释：Vue.extend 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

其实就是一个子类构造器，是Vue组件的核心api。实现思路就是使用原型继承的方法返回了 vue 的子类，并且利用 mergeOptions 把传入组件的 options 就和父类的 options 进行了合并。

### 写过自定义指令吗？原理是什么？
指令本质上是装饰器，是 vue 对 HTML 元素的扩展，给 HTML 元素添加自定义功能。vue 编译 DOM 时，会找到指令对象，执行指令的相关方法。

自定义指令有五个生命周期（也叫钩子函数），分别是 bind、inserted、update、componentUpdated、unbind

- 1、bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- 2、inserted：被绑定元素插入父节点时调用。
- 3、update：被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较前后的绑定值。
- 4、componentUpdated：被绑定元素所在模板完成一次更新周期时调用。
- 5、unbind：只调用一次，指令与元素解绑时调用。

原理：
- 1、在生成 ast 语法树时，遇到指令会给当前元素添加 directives 属性
- 2、通过 genDirectives 生成指令代码
- 3、在 patch 前将指令的钩子提取到 cbs 中，在 patch 过程中调用对应的钩子。
4、当执行指令对应钩子函数时，调用对应指令定义方法。
### Vue 修饰符有哪些？
```
事件修饰符
.stop 阻止事件继续传播
.prevent 阻止标签默认行为
.capture 使用事件捕获模式，即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
.self 只当在 event.target 是当前元素自身时触发处理函数
.once 事件只会触发一次
.passive 告诉浏览器你不想阻止事件的默认行为
v-model 的修饰符
.lazy 通过这个修饰符，转变为在 change 事件再同步
.number 自动将用户输入值转化为数值类型
.trim 自动过滤用户输入的收尾空格
键盘事件修饰符
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right
系统修饰符
.ctrl
.alt
.shift
.meta
鼠标按钮修饰符
.left
.right
.middle
```
### Vue 模板编译原理
Vue 的编译过程就是将 template 转化为 render 函数的过程，分为以下三步：

第一步是将 模板字符串转换成 element ASTs（解析器）

第二步是对 AST 进行静态节点标记，主要用来做虚拟 DOM 的渲染优化（优化器）

第三步是 使用element ASTs 生成 render 函数代码字符串（代码生成器）

### 生命周期钩子是如何实现的

Vue 的生命周期钩子核心实现是利用发布订阅模式先把用户传入的生命周期钩子订阅好（内部采用数组的方法存储）然后在创建组件实例的过程中会一次执行对应的钩子方法（发布）


### 能说下 vue-router 中常用的路由模式和实现原理吗？

**hash 模式**

1、location.has 的值实际就是 URL 中 # 后面的东西。它的特点在于：hash虽然出现 URL 中，但不会被包含在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

2、可以为 hash 的改变添加监听事件
window.addEventListener("hashchange",funcRef,false)
每一次改变 hash (window.location.hash)，都会在浏览器的访问历史中增加一个记录，利用hash的以上特点，就可以实现前端路由“更新视图但不重新请求页面”的功能了
特点：兼容性好但是不美观

**history 模式**

利用 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。

这两个方法应用于浏览器的历史记录站，在当前已有的 back、forward、go 的基础上，他们提供了对历史记录进行修改的功能。这两个方法有个共同点：当调用他们修改浏览器历史记录栈后，虽然当前 URL 改变了，但浏览器不会刷新页面，这就为单页面应用前端路由“更新视图但不重新请求页面”提供了基础

特点：虽然美观，但是刷新会出现 404 需要后端进行配置。



### 双向绑定

双向绑定可以分为三个问题？
什么是双向绑定？
双向绑定的原理？
如何实现双向绑定？

#### 什么是双向绑定？

我们先从单向绑定切入

单向绑定非常简单，就是把 Model 绑定到 View，当我们用 JavaScript 代码更新 Model 时，View 就会自动更新

双向绑定就很容易联想到了，在单向绑定的基础上，用户更新了 View，Model 的数据也自动被更新了，这种情况就是双向绑定

#### 双向绑定的原理是什么
我们都知道 Vue 是数据双向绑定的框架，双向绑定由三个重要部分构成

- 数据层（Model）：应用的数据及业务逻辑

- 视图层（View）：应用的展示效果，各类 UI 组件

- 业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

而上面的这个分层的架构方案，可以用一个专业术语进行称呼：MVVM

这里的控制层的核心功能便是 “数据双向绑定” 。自然，我们只需弄懂它是什么，便可以进一步了解数据绑定的原理

理解 ViewModel
它的主要职责就是：

数据变化后更新视图
视图变化后更新数据
当然，它还有两个主要部分组成

- 监听器（Observer）：对所有数据的属性进行监听

- 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数


#### 实现双向绑定

我们还是以 Vue 为例，先来看看 Vue 中的双向绑定流程是什么的
- new Vue()首先执行初始化，对 data 执行响应化处理，这个过程发生 Observe 中；defineReactive 时为每⼀个 key 创建⼀个 Dep 实例

- 同时对模板执行编译，找到其中动态绑定的数据，从 data 中获取并初始化视图，这个过程发生在 Compile 中；初始化视图时读取某个 key，例如 name1，创建⼀个 watcher1

- 同时定义⼀个更新函数和 Watcher，将来对应数据变化时 Watcher 会调用更新函数

- 由于 data 的某个 key 在⼀个视图中可能出现多次，所以每个 key 都需要⼀个管家 Dep 来管理多个 Watcher;由于触发 name1 的 getter 方法，便将 watcher1 添加到 name1 对应的 Dep 中

- 将来 data 中数据⼀旦发生变化,会首先找到对应的 Dep，通知所有 Watcher 执行更新函数；当 name1 更新，setter 触发时，便可通过对应 Dep 通知其管理所有 Watcher 更新


[img地址](https://img.bosszhipin.com/beijin/cms/6c155f92bf101d7f3474c8db1dc5a5f2ceb4162adcce9c8ed358cb008b64ac2a92d08620afbe4bc5b07a8d61e4550181.png?x-oss-process=image/quality,q_60)


实现思路

- defineReactive 时为每⼀个 key 创建⼀个 Dep 实例

- 初始化视图时读取某个 key，例如 name1，创建⼀个 watcher1

- 由于触发 name1 的 getter 方法，便将 watcher1 添加到 name1 对应的 Dep 中

- 当 name1 更新，setter 触发时，便可通过对应 Dep 通知其管理所有 Watcher 更新


### props和data优先级谁高
props 高

props ==> methods ==> data ==> computed ==> watch

### data 必须是一个函数
// 不想每个组件共享同一份数据，函数就可以让我们单独的维护一个数据

// 同一组件复用，data属性要是对象的话，两个组件的data在栈中保存的是同一地址值，指向堆中同一对象
const data = {count: 0}
export default {
  data: function() {
    return data
  }
}

### watch监听响应式数据
当需要对响应式对象进行深度监听时，设置deep: true
```
v-model="name"
v-model="info"
```
```
data() {
  return {
    name: 'li',
    info: {
      hobby: 'ride'
    }
  }
}
watch: {
  name(newVal, oldVal) {
    log()
  },
  info(newVal, oldVal) {
    handler: fuction(newVal, oldVal) {
      log()
    },
    deep: true
  }
}
```
Vue3

1.通常我们把原始类型的数据（number、string等）定义为ref响应数据，引用类型的数据（数组、对象）定义为reactive响应式数据；

2.当我们使用watch监听数据变化需要同时获取新值和老值时，我们需要把数据源定义为函数的形式，并且把数据源进行深拷贝返回。当我们只需要新值时，可以增加deep:true选项即可。

### 为什么this.xxx能访问data里面的数据.md
```
this._init(options)
initState -> initData
this.msg Vue会做代理
访问 this._data.msg
```

### 命名路由
```
// router-link 动态绑定to属性
<router-link to="/about">
<router-link :to="{name: 'about'}">

```

### computed 
在data 和 props 中间加了一层

### Vue 性能优化 🎈🎈🎈

分方向

首先是 Vue 代码编写层面，例如：代码分割、服务端渲染、组件缓存、长列表优化

最常见的路由懒加载，访问时异步加载，借助webpack的import()实现异步组件
```javascript
const router = createRouter({
  routes: [
    {path: '/foo', component: () => import('/Foo.vue')}
  ]
})
```
然后是组件缓存`keep-alive`缓存页面：避免重复创建组件实例，且能保留缓存组件状态
```
<router-view v-slot="{Component}">
  <keep-alive>
    <component :is="Component"></component>
  </keep-alive>
</router-view>
```
使用`v-show`复用DOM，避免重复创建组件
```
比如某个组件很重，通过v-show来隐藏或显示，而不是删除或创建
```
`v-for`遍历的同时避免使用`v-if`

不再变化的数据使用`v-once`，`v-momo`只更新选中状态变化项

```html
<div 
v-for="item in list" 
:key="item.id" 
v-memo="[item.id === selected]">
  <p>
    ID: {{ item.id }} - 
    selected：{{ item === selected}}
  </p>
<div>
```

长列表性能优化：如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域内容

```
一些开源库: 
vue-virtual-scroller
vue-cirtual-scroll-grid
```

事件的销毁：Vue 组件销毁时，自动解绑的指令和watch相关的监听器，但是用户自定义的事件，比如定时器是不会被销毁的，最好清除掉

```javascript
export default {
  created() {
    this.timer = setInterval(this.refresh, 2000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}
```

图片懒加载

```
<img v-lazy="./img">
开源项目：v-lazyload
```

第三方插件按需加载

像`element-plus`这样的第三方组件库可以按需加载，避免引入体积过大

```javascript
import { createApp } from 'vue'
import { Button, Select } from 'element-plus'

const app = createApp()
app.use(Button)
app.user(Select)
```

子组件分割：较重的状态组件适合拆分

如果SPA应用有首屏渲染慢点问题，服务端渲染/静态网站生成：SSR、SSG方案优化，常见的是nuxt这样的框架

### vue封装组件考虑哪些问题 🎈🎈🎈

一、数据问题

二、是否会有组件嵌套的情况

三、考虑到可扩展性需要在可扩展的地方加入slot

四、循环引用问题

五、v-for key的参数相同报错 问题

Vue组件的API主要包含三部分：prop、event、slot

props 表示组件接收的参数，最好用对象的写法，这样可以针对每个属性设置类型、默认值或自定义校验属性的值，此外还可以通过type、validator等方式对输入进行验证

slot可以给组件动态插入一些内容或组件，是实现高阶组件的重要途径；当需要多个插槽时，可以使用具名slot

event是子组件向父组件传递消息的重要途径

### router-link

link 实际渲染的结果就是 a，hash 模式的时候是通过锚点来切换 url 路径实现的所以并不会触发实际的物理跳页，在 history 模式时是通过阻止默认行为来实现的拦截点击事件利用 pushstate 来切换 url 路径。
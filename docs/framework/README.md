

### 生命周期

```text
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

beforeDestory 钩子能做什么
我们常用来销毁一些监听事件及定时函数，使用场景一般用在vue实例的$off方法清除eventBus
```

### 生命周期钩子是如何实现的

Vue 的生命周期钩子核心实现是利用发布订阅模式先把用户传入的生命周期钩子订阅好（内部采用数组的方法存储）然后在创建组件实例的过程中会一次执行对应的钩子方法（发布）

### Vue组件通信 🔥

- props $emit
  - 父 -> 子 props
  - 子 -> 父 this.$emit() 

- $parent 和 $children

  - 当一个组件需要访问其父组件或子组件时，可以使用 `$parent` 或 `$children` 属性

- 自定义事件

  ```js
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
  
  // 记得 移除 EventBus.$off
  ```

- Vuex

  ```
  child1 this.$store.commit()
  child2 ...mapState(['username])
  ```

### props 和 data 谁优先级高

props 高

props ==> methods ==> data ==> computed ==> watch

### data必须是一个函数

不想每个组件共享同一份数据，函数就可以让我们单独的维护一个数据

### Vuex基本使用

state: 数据

getters: state的计算属性 辅助函数: mapGetters 定义在Computed 里使用 <=> $store.state.items

mutaion: 设置数据 辅助函数: mapMutations <=> this.$store.commit 定义在methods 里

action: 是异步操作方法 可以拿到参数commit,state去执行mutaiton 辅助函数: mapActions <=> this.$store.dispatch()

### 一定不要在action中修改state，而是要在mutation中修改

因为state是实时更新的，mutations无法进行异步操作，而如果直接修改state的话是能够异步操作的，当你异步对state进行操作时，还没执行完，这时候如果state已经在其他地方被修改了，这样就会导致程序存在问题了。所以state要同步操作，通过mutations的方式限制了不允许异步。

### actions 和 mutaions 的区别

actions 可以进行异步操作，可用于向后台提交数据或者接受后台的数据；

mutations 中是同步操作，用于将数据信息写在全局数据状态中缓存。

### Vuex如何保证每个组件都拿到同一个store实例的 🎈

  Vuex 提供了一个 store 选项，用于在根组件中创建一个 Vuex store 实例，并将其注入到所有子组件中。

```
Vue.use(Vuex) -> 插件的install方法
applyMixin(Vue)
判断是不是根，如果是根就添加一个store属性 -》 newVue 就能获取Vue store
 不是根就去父亲上拿，赋值到自己的$store属性
```

Vuex是通过全局注入store对象，利用vue的mixin混入机制，在beforeCreate钩子前混入vuexInit方法，vuexInit方法实现了store注入

![img](http://qn.aixshi.top/blog/vuex.png)

### Vuex 为什么要分模块并且加命名空间

模块： 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能会变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

命名空间： 默认情况下，模块内部的 action、mutation、getter是注册在全局命名空间的 --- 这样使得多个模块能够对同一 mutation 或 action 做出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced:true 的方式使其成为带命名的模块。当模块被注册后，他所有 getter、action、及 mutation 都会自动根据模块注册的路径调整命名。

### vue中mixin的原理

mixin -> 封装，可复用，mixin的生命周期比其他的先执行

主要是调用`merOptions`方法

递归处理 mixins 先遍历合并parent中的key，调用mergeField方法进行合并，

然后保存在变量options

再遍历child，合并补上parent中没有的key，调用mergeField方法进行合并，保存在变量options

通过 mergeField 函数进行了合并 合并策略：替换型、合并型、队列型、叠加型

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

### 为什么this.xxx能访问data里面的数据

```text
Vue.js 在组件实例化时，会将这些属性合并到组件实例中，并将它们代理到组件实例的属性中
this._init(options)
initState -> initData
this.msg Vue会做代理
访问 this._data.msg
```

### 如何理解MVVM（双向绑定）

>View和Model之间是没有直接联系的，它们通过ViewModel进行通信。ViewModel负责处理View的事件，更新Model的数据，并将数据绑定到View中，使得数据在View中的展示和用户的操作都能够自动同步到Model中

### 实现双向绑定

我们还是以 Vue 为例，先来看看 Vue 中的双向绑定流程是什么的

- new Vue()首先执行初始化，对 data 执行响应化处理，这个过程发生 Observe 中；defineReactive 时为每⼀个 key 创建⼀个 Dep 实例
- 同时对模板执行编译，找到其中动态绑定的数据，从 data 中获取并初始化视图，这个过程发生在 Compile 中；初始化视图时读取某个 key，例如 name1，创建⼀个 watcher1
- 同时定义⼀个更新函数和 Watcher，将来对应数据变化时 Watcher 会调用更新函数
- 由于 data 的某个 key 在⼀个视图中可能出现多次，所以每个 key 都需要⼀个管家 Dep 来管理多个 Watcher;由于触发 name1 的 getter 方法，便将 watcher1 添加到 name1 对应的 Dep 中
- 将来 data 中数据⼀旦发生变化,会首先找到对应的 Dep，通知所有 Watcher 执行更新函数；当 name1 更新，setter 触发时，便可通过对应 Dep 通知其管理所有 Watcher 更新

[img地址(opens new window)](https://img.bosszhipin.com/beijin/cms/6c155f92bf101d7f3474c8db1dc5a5f2ceb4162adcce9c8ed358cb008b64ac2a92d08620afbe4bc5b07a8d61e4550181.png?x-oss-process=image/quality,q_60)

实现思路

- defineReactive 时为每⼀个 key 创建⼀个 Dep 实例
- 初始化视图时读取某个 key，例如 name1，创建⼀个 watcher1
- 由于触发 name1 的 getter 方法，便将 watcher1 添加到 name1 对应的 Dep 中
- 当 name1 更新，setter 触发时，便可通过对应 Dep 通知其管理所有 Watcher 更新

### Vue 的实现原理

Vue2 的实现原理主要包括以下几个方面：

1. 数据劫持：Vue2 使用了 Object.defineProperty 方法来对数据进行劫持，从而实现了响应式数据绑定。Vue2 会在初始化时递归地遍历 data 对象的每个属性，并使用 Object.defineProperty 方法将其转换为 getter 和 setter，当数据发生变化时，会触发 setter 方法，从而通知依赖于该数据的组件进行更新。
2. 模板编译：Vue2 使用了编译器将模板转换成渲染函数，从而实现了模板的动态渲染。Vue2 的编译器会将模板解析成 AST，然后通过 AST 转换器将其转换成渲染函数，渲染函数接收数据对象作为参数，生成虚拟 DOM 并渲染到页面上。
3. 虚拟 DOM：Vue2 使用了虚拟 DOM 来优化视图的渲染性能。虚拟 DOM 是一个抽象的 DOM 树，它可以在内存中进行操作和计算，减少了真实 DOM 的操作和计算次数，从而提高了渲染性能。Vue2 的虚拟 DOM 和 React 的虚拟 DOM 类似，都是基于树形结构的数据结构，可以进行快速的比较和更新。
4. 组件化：Vue2 支持组件化开发，可以将页面拆分成多个组件，每个组件都有自己的模板、样式和逻辑。Vue2 的组件化开发可以提高代码的复用性和可维护性，使得应用程序更加易于扩展和维护。
5. 生命周期：Vue2 的组件有自己的生命周期钩子函数，可以在组件创建、挂载、更新和销毁等不同的阶段执行一些特定的逻辑。Vue2 的生命周期钩子函数包括 beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy 和 destroyed 等。
6. 指令和插件机制：Vue2 提供了一些内置指令和插件机制，可以扩展 Vue 的功能和特性。Vue2 的指令包括 v-if、v-for、v-bind、v-on 等，可以方便地操作视图和数据之间的关系。Vue2 的插件机制可以让开发者编写自己的插件，从而扩展 Vue 的功能和特性，例如 Vuex、Vue Router 等。

> 深度监听需要递归到底，一次性计算量特别大

需要注意的是，Vue2 的实现原理和 Vue3 有一些不同，Vue3 在数据劫持、模板编译和虚拟 DOM 等方面做出了一些改进和优化。

>vue 初次渲染过程
>
>Vue 初次渲染过程可以分为以下几个步骤：
>
>1. 解析模板：Vue 会先解析模板，将模板编译成渲染函数。渲染函数是一个函数，接收数据对象作为参数，并返回虚拟 DOM 树。
>2. 创建虚拟 DOM 树：在初次渲染时，Vue 会将渲染函数的返回值（虚拟 DOM 树）和真实 DOM 树进行比较，找出两者之间的差异，然后根据差异进行局部更新。因此，Vue 需要先创建虚拟 DOM 树。
>3. 初始化 Watcher：在初始化过程中，Vue 会为每个响应式数据对象创建一个 Watcher 对象，用于监听数据变化，并在变化时触发重新渲染。
>4. 执行渲染函数：在初次渲染时，Vue 会执行渲染函数，生成虚拟 DOM 树。
>5. 将虚拟 DOM 树转换成真实 DOM 树：在生成虚拟 DOM 树后，Vue 会将其转换成真实 DOM 树，并插入到文档中。
>6. 返回挂载的实例：Vue 会返回一个 Vue 实例，该实例可以通过 $el 属性访问到挂载的元素。
>
>需要注意的是，上述过程是一个同步过程，即在执行过程中不会涉及异步操作。如果渲染过程中涉及到异步操作，例如使用了 nextTick 方法或者在组件中使用了异步组件，那么渲染过程会稍有不同
>
>异步渲染
>
>nextTick 待 DOM 渲染完再回调

### 监听data变化的核心API

#### Vue2

Vue2 使用了 Object.defineProperty 方法来对数据进行劫持，从而实现了响应式数据绑定。Vue2 会在初始化时递归地遍历 data 对象的每个属性，并使用 Object.defineProperty 方法将其转换为 getter 和 setter，当数据发生变化时，会触发 setter 方法，从而通知依赖于该数据的组件进行更新。

```js
// 丐版
function observe(data) {
  Object.keys(data).forEach(key => {
    let value = data[key];

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(`get ${key}: ${value}`);
        return value;
      },
      set(newValue) {
        console.log(`set ${key}: ${newValue}`);
        if (value !== newValue) {
          value = newValue;
        }
      }
    });
  });
}
const obj = {
  name: 'Vue.js',
  age: 3
};
observe(obj);
console.log(obj.name); // get name: Vue.js
obj.name = 'React.js'; // set name: React.js
```

```js
function updateView() {
  console.log('视图更新')
}
// 重新定义数组原型
const oldArrayProperty = Array.prototype
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
  arrProto[methodName] = function () {
    updateView()
    oldArrayProperty[methodName].call(this, ...arguments)
  }
})

function defineReactive(target, key, value) {
  observer(value)
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        observer(newValue) // 设置新值时需要重新监听
        value = newValue
        // 触发更新视图
        updateView()
      }
    }
  })
}

// 监听对象属性
function observer(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if (Array.isArray(target)) {
    target.__proto__ = arrProto
  }
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

const obj = {
  name: 'zhangsan',
  age: 20,
  info: {
    address: '北京' // 需要深度监听
  },
  nums: [10, 20, 30]
}

// 监听数据
observe(obj)

console.log(obj.foo) // 输出 'get foo' 和 'bar'
console.log(obj.baz.qux) // 输出 'get baz' 和 'get qux' 和 'quux'
console.log(obj.arr[0]) // 输出 'get arr' 和 '1'

obj.foo = 'baz' // 输出 'set foo'
obj.baz.qux = 'corge' // 输出 'set qux'
obj.arr[0] = 4 // 输出 'set 0'

```

#### Vue3

Vue3 使用了 ES6 的 Proxy 来代替 Object.defineProperty 对数据进行劫持。Proxy 与 Object.defineProperty 相比有许多优势，例如可以对整个对象进行劫持，支持对数组的劫持等。

下面是一个简单的示例代码，展示了在 Vue3 中如何使用 Proxy 对数据进行劫持：

```js
const data = {
  count: 0
}

const proxyData = new Proxy(data, {
  get(target, key, receiver) {
    console.log(`getting ${key} value: ${target[key]}`);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log(`setting ${key} value: ${value}`);
    return Reflect.set(target, key, value, receiver);
  }
});

proxyData.count = 1; // setting count value: 1
console.log(proxyData.count); // getting count value: 1
```

在这个示例中，我们使用了 Proxy 对象来代理 data 对象。当我们修改 proxyData.count 的值时，会触发 set() 方法，输出设置的值。当我们访问 proxyData.count 的值时，会触发 get() 方法，输出访问到的值。通过这种方式，我们可以在 Vue3 中实现对数据的劫持和监听。

### Vue 2.0 响应式数据的原理 🎈

1、Object.defineProperty 数据劫持 2、发布订阅模式 使用 getter 收集依赖 ，setter 通知 watcher派发更新

整体思路是数据劫持 + 观察者模式

对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持（只会劫持已存在的属性），数组则是通过重写数组来实现。当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存在它所依赖的 watcher （依赖收集）get，当属性变化后会通知自己对应的 watcher 去更新（派发更新）set。

### 虚拟DOM 和 diff

虚拟 DOM 是一种轻量级的 DOM 抽象，它可以在内存中操作和计算，减少了真实 DOM 的操作和计算次数，从而提高了渲染性能。虚拟 DOM 是以树形结构的方式组织的，每个节点代表着一个真实 DOM 元素，包含了元素的标签名、属性、子元素等信息。

Diff 算法的基本思路是先对比根节点是否相同，如果不同，则直接替换为新的节点；如果相同，则比较子节点的差异，再按照相应的策略进行更新。（snabbdom）

```js
// 定义虚拟 DOM 节点的构造函数
function VNode(tag, props, children) {
  this.tag = tag
  this.props = props
  this.children = children
}

// 定义 Diff 算法的实现函数
function diff(oldVNode, newVNode) {
  if (oldVNode === newVNode) {
    return
  }

  if (!oldVNode) {
    // 如果旧节点不存在，则直接插入新节点
    render(newVNode)
  } else if (!newVNode) {
    // 如果新节点不存在，则直接删除旧节点
    remove(oldVNode)
  } else if (oldVNode.tag !== newVNode.tag) {
    // 如果节点类型不同，则直接替换为新节点
    replace(oldVNode, newVNode)
  } else {
    // 否则，按照相应的策略更新子节点
    update(oldVNode, newVNode)
  }
}

// 定义渲染节点的函数
function render(vnode) {
  const el = document.createElement(vnode.tag)
  Object.keys(vnode.props).forEach(key => {
    el.setAttribute(key, vnode.props[key])
  })
  vnode.children.forEach(child => {
    if (child instanceof VNode) {
      el.appendChild(render(child))
    } else {
      el.appendChild(document.createTextNode(child))
    }
  })
  return el
}

// 定义替换节点的函数
function replace(oldVNode, newVNode) {
  const parent = oldVNode.el.parentNode
  parent.replaceChild(render(newVNode), oldVNode.el)
}

// 定义删除节点的函数
function remove(vnode) {
  const parent = vnode.el.parentNode
  parent.removeChild(vnode.el)
}

// 定义更新节点的函数
function update(oldVNode, newVNode) {
  const el = oldVNode.el
  const oldChildren = oldVNode.children
  const newChildren = newVNode.children

  if (!newChildren.length) {
    // 如果新节点没有子节点，则直接删除旧节点的子节点
    el.innerHTML = ''
  } else {
    // 否则，按照相应的策略更新子节点
    for (let i = 0; i < newChildren.length || i < oldChildren.length; i++) {
      diff(oldChildren[i], newChildren[i])
    }
  }
}

// 定义虚拟 DOM 树
const oldVNode = new VNode('div', { id: 'app' }, [
  new VNode('p', {}, ['Hello,']),
  new VNode('p', {}, ['world!'])
])

const newVNode = new VNode('div', { id: 'app' }, [
  new VNode('p', {}, ['Hello,']),
  new VNode('p', {}, ['Vue!'])
])

// 使用 Diff 算法更新节点
diff(oldVNode, newVNode)
```

>Diff 算法的具体实现方式有多种，常见的实现方式包括：
>
>1. 全量 Diff：对比新旧虚拟 DOM 树的所有节点，找出差异，并进行更新。这种方式的缺点是效率低，因为需要比较所有节点。
>2. 局部 Diff：只对比新旧虚拟 DOM 树中发生变化的节点，找出差异，并进行更新。这种方式的优点是效率高，但需要额外的标记或事件来标识哪些节点发生了变化。
>3. 双端 Diff：通过同时从新旧虚拟 DOM 树的两端开始遍历，找出差异，并进行更新。这种方式的优点是效率高，但需要对新旧虚拟 DOM 树的结构进行额外的判断和处理。
>
>在实际应用中，常常采用局部 Diff 的方式来实现虚拟 DOM 的更新，配合使用一些优化技巧，可以提高虚拟 DOM 的性能和渲染速度。例如，可以使用 key 属性来标识节点，从而减少不必要的 DOM 操作；可以使用批量更新的方式，将多次操作合并为一次操作，从而减少更新的次数；可以使用异步更新的方式，将更新操作放到任务队列中执行，从而避免阻塞主线程。

- 1、tag 标签不一致直接新节点替换旧节点。
- 2、tag 标签一样。
- - 先替换属性
- - 对比子元素
- - - 新老都有子元素，采用双指针方式进行对比 sameVnode 判断tag和key完全相同为同一节点，进行节点复用
- - - - 头和头相等对比
- - - - 尾和尾相等对比
- - - - 头和尾相等对比
- - - - - sameVnode 的时候传入两个新老子节点patch(oldChild,newChild)
- - - - 乱序情况
- - - - - 上面的都不符合，先遍历旧子节点数组形成 key值映射的map对象。 然后根据新子节点数组循环 按照key值和位置关系移动以及新增节点 最后删除多余的旧子节点 如果移动旧节点同样需要patch(oldChild,newChild)
- - - 新的有子元素，老的没有子元素。-- 直接将子元素虚拟节点转化成真实节点插入即可。
- - - 新的没有子元素，老的有子元素。 -- 直接清空 innerHtml
- 3、无 tag 标签 -- 文本节点直接比较内容是否一致

### 模版编译

将模版编译成render函数，执行render函数生成vnode

Vue 的编译过程就是将 template 转化为 render 函数的过程，分为以下三步：

第一步是将 模板字符串转换成 element ASTs（解析器）

第二步是对 AST 进行静态节点标记，主要用来做虚拟 DOM 的渲染优化（优化器）

第三步是 使用element ASTs 生成 render 函数代码字符串（代码生成器）

### 路由原理

- hash

  - 变化不会刷新页面
  - 会触发网页跳转，即前进和后退
  - 和server端无交互

  ```js
  // 定义路由映射表
  const routes = {
    '/': home,
    '/about': about,
    '/contact': contact
  }
  
  // 定义路由处理函数
  function router() {
    const hash = location.hash.slice(1) || '/'
    const component = routes[hash] || notFound
    component.render()
  }
  
  // 监听 hash 值变化事件
  window.addEventListener('hashchange', router)
  
  // 初始化路由
  router()
  ```

- H5 history

  - 用url 规范的路由，跳转时不刷新页面
  - history.pushState window.onpopstate
  - 需要服务端支持

- MemoryHistory(vue)

  - 不会前进和后退

### Vue 路由守卫的原理

1. 全局钩子函数：Vue Router 提供了一些全局的生命周期钩子函数，包括 `beforeEach`、`beforeResolve` 和 `afterEach`。这些钩子函数会在路由跳转时依次执行，可以用来进行路由守卫操作、数据预取等。

- `beforeEach(to, from, next)`：在路由跳转前执行，可以用来进行路由守卫操作。如果需要跳转到下一个路由，需要调用 `next()` 函数。
- `beforeResolve(to, from, next)`：在路由跳转前执行，用来处理异步路由组件。如果需要跳转到下一个路由，需要调用 `next()` 函数。
- `afterEach(to, from)`：在路由跳转后执行，用来进行一些收尾工作，例如清除临时数据。

2. 组件内的钩子函数：在 Vue Router 中，组件也可以定义一些生命周期钩子函数来处理路由相关的逻辑。这些钩子函数包括 `beforeRouteEnter`、`beforeRouteUpdate` 和 `beforeRouteLeave`。

- `beforeRouteEnter(to, from, next)`：在组件实例化之前调用，用于在组件内部处理路由相关逻辑。如果需要跳转到下一个路由，需要调用 `next()` 函数。
- `beforeRouteUpdate(to, from, next)`：在组件可以复用时调用，用于更新组件内的数据。如果需要跳转到下一个路由，需要调用 `next()` 函数。
- `beforeRouteLeave(to, from, next)`：在组件退出前调用，用于确认是否可以离开该路由。如果需要跳转到下一个路由，需要调用 `next()` 函数。

在 Vue.js 应用程序中，Vue Router 是作为一个插件来使用的，它会在 Vue 实例化之前进行安装

我们通过创建一个 Vue 实例来启动应用程序，并使用 `Vue.use()` 方法来安装 Vue Router 插件

在路由解析过程中，Vue Router 会按照路由配置中的顺序依次执行全局前置守卫 `beforeEach`、路由独享守卫 `beforeEnter` 和组件内守卫 `beforeRouteEnter`，并根据守卫的返回值决定是否允许路由跳转。如果某个守卫返回了 `false` 或者调用了 `next(false)`，则该路由跳转会被中止，不会进入该路由。

### Vue watch 和 computed 的区别

- `watch` 适用于监听某个数据的变化，并在数据发生变化时执行一些异步或复杂的操作，例如发送网络请求、更新 DOM 等。`watch` 可以监听响应式数据的变化，也可以监听非响应式数据的变化。
- `computed` 适用于根据某个或某些响应式数据的变化，计算出一个新的值，并将该值作为一个新的响应式数据暴露出去。`computed` 的计算结果会被缓存，只有当计算依赖的响应式数据发生变化时，才会重新计算。

例如，下面的代码演示了如何使用 `watch` 和 `computed` 计算一个属性 `fullName`：

```js
var vm = new Vue({
  data: {
    firstName: 'John',
    lastName: 'Doe'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  },
  watch: {
    firstName: function () {
      this.fullName = this.firstName + ' ' + this.lastName
    },
    lastName: function () {
      this.fullName = this.firstName + ' ' + this.lastName
    }
  }
})
```

上述代码中，`computed` 属性定义了一个计算属性 `fullName`，该属性根据 `firstName` 和 `lastName` 计算出一个新的值，并将该值作为一个新的响应式数据暴露出去。`watch` 属性用于监听 `firstName` 和 `lastName` 的变化，当这两个数据发生变化时，将重新计算 `fullName` 并更新该属性的值。

下面的代码演示了如何使用 `watch` 和 `computed` 计算商品列表的总价：

```js
var vm = new Vue({
  data: {
    products: [
      { name: 'Product A', price: 10, quantity: 2 },
      { name: 'Product B', price: 20, quantity: 3 },
      { name: 'Product C', price: 30, quantity: 4 }
    ]
  },
  computed: {
    total: function () {
      return this.products.reduce(function (total, product) {
        return total + product.totalPrice
      }, 0)
    }
  },
  watch: {
    products: {
      deep: true,
      handler: function (newValue, oldValue) {
        newValue.forEach(function (product) {
          this.$set(product, 'totalPrice', product.price * product.quantity)
        }, this)
      }
    }
  }
})
```

上述代码中，`products` 是一个响应式数据，包含了三个商品的信息。`computed` 属性中定义了一个计算属性 `total`，该属性计算出所有商品的总价。`watch` 属性监听 `products` 数据的变化，当 `products` 数据发生变化时，重新计算每个商品的总价，并将其作为一个新的响应式数据 `totalPrice` 添加到商品对象中。

需要注意的是，在使用 `watch` 和 `computed` 时，需要注意它们的执行顺序和依赖关系，以避免出现意外的结果。在上述代码中，`watch` 需要在 `computed` 之前执行，以确保计算属性 `total` 能够正确地依赖商品的总价。

### Vue的计算属性如何实现缓存

计算属性的缓存是通过 `Object.defineProperty` 方法的 getter 和 setter 实现的，Vue.js 在计算属性的 getter 函数中，会使用一个名为 `Dep` 的类来进行依赖收集。当计算属性的 getter 函数被调用时，Vue.js 会将当前的计算属性作为依赖对象，将其添加到一个全局的依赖收集器中。如果在计算属性的 getter 函数中访问了其他响应式属性（如 `data` 或其他计算属性），Vue.js 会将这些属性的依赖也添加到全局的依赖收集器中。当这些响应式属性发生改变时，Vue.js 会重新计算计算属性的值，并将计算结果缓存起来。

### v-model 原理

`v-model` 会监听表单元素的 `input` 或 `change` 事件，并在事件触发时更新绑定的属性，相当于是语法糖

### v-for为什么要加key

`key是Vue中Vnode的标识`，通过这个key，我们的diff操作可以更准确、更快速。如果不使用key，Vue会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。

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

```text
router-view :key="$route.fullPath"
```

### Vue 修饰符有哪些？

```text
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

### nextTick 使用场景和原理

nextTick 中的回调是在下次 DOM 更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。主要思路就是采用微任务优先的方式调用异步方法去执行 nextTick 包装的方法。

### React useMemo 和 useCallBack的区别

当需要缓存计算结果时，使用 `useMemo`；当需要缓存函数引用时，使用 `useCallback`

#### useMemo 的例子

假设我们有一个组件需要根据一个数组中的数据来渲染列表，并计算出列表中所有数据的总和。由于计算总和的过程比较耗时，我们可以使用 `useMemo` 缓存计算结果，以避免在每次渲染时都重新计算。

```jsx
import React, { useMemo } from 'react';

const List = ({ list }) => {
  const total = useMemo(() => {
    console.log('Calculating total...');
    return list.reduce((acc, item) => acc + item.value, 0);
  }, [list]);

  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item.id}>{item.name}: {item.value}</li>
        ))}
      </ul>
      <p>Total: {total}</p>
    </div>
  );
};
```

上述代码中，我们使用 `useMemo` 缓存了计算结果 `total`。当 `list` 数组发生变化时，会重新计算 `total`；否则，直接使用缓存的计算结果。

#### useCallback 的例子

假设我们有一个组件需要传递一个回调函数给子组件使用，并且这个回调函数需要依赖于组件中的一些状态。由于每次渲染都会创建新的函数引用，可能会导致子组件的不必要的重复渲染。我们可以使用 `useCallback` 缓存函数引用，以避免在每次渲染时都创建新的函数。

```jsx
import React, { useState, useCallback } from 'react';

const Child = ({ onIncrement }) => {
  console.log('Child render.');
  return (
    <button onClick={onIncrement}>Increment</button>
  );
};

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  console.log('Parent render.');
  return (
    <div>
      <p>Count: {count}</p>
      <Child onIncrement={handleIncrement} />
    </div>
  );
};
```

上述代码中，我们使用 `useCallback` 缓存了回调函数 `handleIncrement`。由于 `handleIncrement` 不依赖于任何状态，所以将空数组作为依赖项传递给 `useCallback`，以确保只在组件挂载时创建一次函数引用。在子组件中使用 `handleIncrement` 时，将不会触发不必要的重复渲染。

### Vue 和 React 的区别🎈

- 监听数据上：Vue 通过 getter / setter 以及一些函数的劫持，能精确直到数据变化
  React 默认是通过比较引用的方式（ diff ）进行的，如果不优化可能导致大量不必要计算的 VDOM 的重新渲染。
- 设计理念：vue 使用的是可变数据，而 React 更强调数据不可变
- 数据流：Vue 是双向绑定数据流，而 React 是单向数据流
- 模版渲染方式: React 是通过JSX渲染模板，而Vue是通过一种拓展的HTML语法进行渲染
- 渲染过程：Vue 是边计算边渲染，而 React 是等计算完毕之后在渲染
- 数据绑定：Vue 提供了双向数据绑定和计算属性等功能，而 React 只提供单向数据流和不可变数据结构。Vue 的双向数据绑定可以让开发者更方便地操作视图和数据之间的关系，而 React 的单向数据流可以更好地控制数据的流动和变化，避免了一些潜在的问题。

- 响应式系统：Vue 的响应式系统使用了 Object.defineProperty 和 Proxy 等技术，可以自动追踪数据的变化并更新视图，而 React 利用虚拟 DOM 和 diff 算法来优化视图的渲染性能。Vue 的响应式系统对于小型应用和数据量较小的应用非常友好，而 React 在大型应用和数据量较大的应用中表现更加出色。

- 组件化：Vue 和 React 都支持组件化开发，但是它们的实现方式略有不同。Vue 的组件包括模板、样式和逻辑，可以直接编写在一个文件中，而 React 的组件将模板、样式和逻辑分离开来，通常需要使用 JSX 或者模板字符串来描述组件的结构和样式。

- 生命周期：Vue 和 React 都有自己的生命周期钩子函数，但是它们的名称和触发时机略有不同。Vue 的生命周期包括 beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy 和 destroyed 等钩子函数，而 React 的生命周期包括 constructor、getDerivedStateFromProps、componentDidMount、shouldComponentUpdate、getSnapshotBeforeUpdate、componentDidUpdate 和 componentWillUnmount 等钩子函数。

### React与 Vue更新数据的区别

- Vue 只有依赖收集的数据发生更新，才会去重新渲染页面

- 只要数据有更新（setState，useState 等手段触发更新），都会去重新渲染页面
  （可以使用shouldComponentUpdate/ PureComponent 改善）

>`Vue` 通过**依赖收集**，当数据更新时， `Vue` 明确知道是哪些数据更新了，每个组件都有自己的渲染 `watcher` ，掌管当前组件的视图更新，所以可以精确地更新对应的组件，所以更新的粒度是**组件级别**的。
>
>React 会递归地把所有的子组件 重新 `render` 一下，不管是不是更新的数据，此时，都是新的。然后通过 diff 算法 来决定更新哪部分的视图。所以，React 的更新粒度是一个整体。

### Vue2 Vue3 和 React 三者diff算法的区别

- Vue2 双端比较
- Vue3 最长递增子序列
- React 仅右移

### React 原理

React 是一种用于构建用户界面的 JavaScript 库。它的核心思想是使用声明式编程模型来描述用户界面，以及使用虚拟 DOM 技术来实现高效的 DOM 更新和渲染。

React 的实现原理可以分为以下几个步骤：

1. JSX 解析：React 支持使用 JSX 语法来描述用户界面，但浏览器无法直接识别 JSX 语法，因此需要将 JSX 代码转换为普通的 JavaScript 代码。这个过程可以使用 Babel 等工具来完成。
2. 组件渲染：React 中的组件是构建用户界面的基本单元。组件可以通过继承 React.Component 类或者使用函数式组件来定义。当组件被渲染到页面上时，React 会根据组件的描述生成一个虚拟 DOM（Virtual DOM）树。
3. 虚拟 DOM 操作：虚拟 DOM 是一个轻量级的 JavaScript 对象，它描述了页面上所有的 DOM 元素和属性。当组件的状态发生变化时，React 会通过比较新旧状态生成一个新的虚拟 DOM 树，并计算出需要更新的部分。
4. DOM 更新：React 通过比较新旧虚拟 DOM 树，计算出需要更新的部分，然后只更新这些部分对应的真实 DOM 元素，从而避免了不必要的 DOM 操作，提高了页面渲染的性能。
5. 生命周期管理：React 提供了一系列生命周期方法，用于在组件被创建、更新、销毁等不同的阶段执行一些特定的操作，例如组件初始化、数据更新、事件处理等。

总的来说，React 的实现原理可以概括为：使用虚拟 DOM 技术来实现高效的 DOM 更新和渲染，通过组件化的编程模型来描述用户界面，以及使用生命周期方法来管理组件的状态和行为。
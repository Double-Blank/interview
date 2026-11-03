## Vuex
### Vuex持久化

  1、手动利用HTML5的本地存储
  vuex的state在localStorage或sessionStorage或其它存储方式中取值
  在mutations,定义的方法里对vuex的状态操作的同时对存储也做对应的操作。
  这样state就会和存储一起存在并且与vuex同步

  2、利用vuex-persistedstate插件
  插件的原理其实也是结合了存储方式,只是统一的配置就不需要手动每次都写存储方法

### Vuex基本使用

  state: 数据

  getters: state的计算属性  辅助函数: mapGetters 定义在Computed 里使用  <=> $store.state.items

  mutaion: 设置数据 辅助函数: mapMutations <=> this.$store.commit 定义在methods 里
  
  action: 是异步操作方法 可以拿到参数commit,state去执行mutaiton
    辅助函数: mapActions <=> this.$store.dispatch()

### Vuex 实现状态持久化
```
  mutaions: {
    markVideoPlayed(state) {
      state.isplayed = true

      window.localStorge.isplayed = JSON.stringify(true)
    },
    setPlayStatus(state, status) {
      state.isplayed = status
    }
  }

  actions: {
    loadVideoStatus({ commit }) {
      let viodeStatus = JSON.parse(window.localStorge.isPlayed)
      commit('setPlayStatus', videoStastus)
    }
  }
```
### 一定不要在action中修改state，而是要在mutation中修改

  因为state是实时更新的，mutations无法进行异步操作，而如果直接修改state的话是能够异步操作的，当你异步对state进行操作时，还没执行完，这时候如果state已经在其他地方被修改了，这样就会导致程序存在问题了。所以state要同步操作，通过mutations的方式限制了不允许异步。

### actions 和 mutaions 的区别

  actions 可以进行异步操作，可用于向后台提交数据或者接受后台的数据；

  mutations 中是同步操作，用于将数据信息写在全局数据状态中缓存。

### Vuex中表单处理的问题和解决方法
```
  v-model 如果要设置的话，要配合计算属性的setter

  computed: {
    value: {
      get() {
        return this.$store.getters.value
      }
      set(value) {
        this.$store.commit('update', value)
      }
    }
  }
```

### Vuex日志插件
```
  plugins: [ createLogger() ] : []
  生产环境: process.env.NODE_ENV !== 'production'
```
### Vuex如何保证每个组件都拿到同一个store实例的
```
  Vue.use(Vuex) -> 插件的install方法
  
  applyMixin(Vue)

  判断是不是根，如果是根就添加一个store属性 -》 newVue 就能获取Vue store
              不是根就去父亲上拿，赋值到自己的$store属性

```
### vuex的实现原理

Vuex是通过全局注入store对象，利用vue的mixin混入机制，在beforeCreate钩子前混入vuexInit方法，vuexInit方法实现了store注入

![img](http://qn.aixshi.top/blog/vuex.png)

### vue中mixin的原理

mixin -> 封装，可复用，mixin的生命周期比其他的先执行

主要是调用`merOptions`方法

递归处理 mixins
先遍历合并parent中的key，调用mergeField方法进行合并，

然后保存在变量options

再遍历child，合并补上parent中没有的key，调用mergeField方法进行合并，保存在变量options

通过 mergeField 函数进行了合并
合并策略：替换型、合并型、队列型、叠加型

### Vuex 为什么要分模块并且加命名空间

模块： 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能会变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

命名空间： 默认情况下，模块内部的 action、mutation、getter是注册在全局命名空间的 --- 这样使得多个模块能够对同一 mutation 或 action 做出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced:true 的方式使其成为带命名的模块。当模块被注册后，他所有 getter、action、及 mutation 都会自动根据模块注册的路径调整命名。


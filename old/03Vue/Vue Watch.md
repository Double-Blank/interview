watch监听响应式数据
当需要对响应式对象进行深度监听时，设置deep: true
v-model="name"
v-model="info"

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

Vue3
1.通常我们把原始类型的数据（number、string等）定义为ref响应数据，引用类型的数据（数组、对象）定义为reactive响应式数据；

2.当我们使用watch监听数据变化需要同时获取新值和老值时，我们需要把数据源定义为函数的形式，并且把数据源进行深拷贝返回。当我们只需要新值时，可以增加deep:true选项即可。
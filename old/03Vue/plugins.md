let myPlugin = {}

myPlugin.install = function(Vue, options){
  // 全局方法
  Vue.myGlobalMethod = function() {

  }
  // 指令绑定
  Vue.directive('my-directive', {
    bind() {

    }
  })

  Vue.mixin({
    created() {

    }
  })
  // 实例方法
  Vue.prototype.$myMethod = function() {

  }
}

export default myPlugin;

<h1 v-my-directive="">
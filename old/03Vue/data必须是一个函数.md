// 不想每个组件共享同一份数据，函数就可以让我们单独的维护一个数据

// 同一组件复用，data属性要是对象的话，两个组件的data在栈中保存的是同一地址值，指向堆中同一对象
const data = {count: 0}
export default {
  data: function() {
    return data
  }
}
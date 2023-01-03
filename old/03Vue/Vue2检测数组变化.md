data() {
  return {
    colors: ['red', 'green', 'black']
  }
}

## 改变数组元素
// 1
  vm.$set
// 2
  vm.colors.splice
  // 会进行劫持

## 改变数组长度
// 1
  vm.$set
// 2
  vm.colors.splice(2)
// 排序算法
// 冒泡排序
const arr = [3,4,5,1,2]
var sortArr1 = function (arr) {
  for (let i = 0 ; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j],arr[j+1]] = [arr[j+1] , arr[j]]
      }
    }
  }
  return arr
}
//选择排序
var sortArr2 = function (arr) {
  let minIndex
  for(let i = 0; i < arr.length - 1; i++) {
    minIndex = i
    for (let j = i+1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}
// 插入排序
var sortArr3 = function (arr) {
  let len = arr.length
  let preIndex, current
  for (let i = 1; i < len; i++) {
    preIndex = i - 1
    current = arr[i]
    while (preIndex >=0 && arr[preIndex] > current) {
      // 交换
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}

console.log(sortArr3(arr))
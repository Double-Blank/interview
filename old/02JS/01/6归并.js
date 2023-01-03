// 归并
// TODO 来一个if,定义个middle,左右来merge，，merge函数是头戏，现在来merge，先定义result[]，留作后面做返回，然后来while，左右长度做条件，小于或等于，一点一点来push result，马上胜利啦，再来俩while，来做result.push，最后返回result
var mergeSort = function (arr) {
  let len = arr.length
  if (len < 2) return arr
  let middle = Math.floor( len / 2 )
  let left = arr.slice(0, middle)
  let right = arr.slice(middle, len)
  return merge(mergeSort(left),mergeSort(right))
}

var merge = function (left, right) {
  let result = []
  while (left.length && right.length) {
    // ! <=
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  while (left.length) { result.push(left.shift()) }
  while (right.length) { result.push(right.shift()) }
  return result
}
console.log(mergeSort([4,5,3,1,2]))
  // var sortArr4 = function (arr) {
  //   let len = arr.length
  //   if (len <= 1) return arr
  //   let middle = Math.floor(len / 2)
  //   let left = arr.slice(0, middle)
  //   let right = arr.slice(middle, len)
  //   return merge(sortArr4(left), sortArr4(right))
  // }
  // const merge = (left, right) => {
  //   const result = [];
  //   while (left.length && right.length) {
  //     if (left[0] <= right[0]) {
  //       result.push(left.shift())
  //     } else {
  //       result.push(right.shift())
  //     }
  //   }
  //   while (left.length) result.push(left.shift());
  //   while (right.length) result.push(right.shift());
  //   return result;
  // }
  // console.log(sortArr4([4,5,3,1,2]))
// 快排
var quickSort = function (arr) {
  if (arr.length <= 1) { return arr; }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};
// 检个数，小等于1
// 择"基准"，so place give me index，math floor ~
// 遍历装左右，跟基准比较
// 递归左中右，concat别忘记



var sortArr3 = function (arr) {
  if (arr.length <= 1) return arr
  let pivotIndex = Math.floor(arr.length / 2)
  // !  let pivot = arr.splice(arr[pivotIndex],1)[0]
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return sortArr3(left).concat([pivot], sortArr3(right))
}

// TODO 改进的
// TODO 先检数，定基准和左中右，再遍历，递归左中右
var quickSort = function (arr) {
  if (arr.length <= 1) { return arr; }
  var pivot = arr[0];
  var left = [];
  var right = [];
  var mid = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] > pivot) {
      right.push(arr[i]);
    } else {
      mid.push(arr[i]);
    }
  }
  return quickSort(left).concat(mid, quickSort(right));
};

// console.log(sortArr3([5, 4, 2, 1, 3]))
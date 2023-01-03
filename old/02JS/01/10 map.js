// map
function map(arr, callback) {
  // 准备一个数组
  const result = [];
  // 循环
  for (let i = 0; i < arr.length; i++) {
    // 执行函数并传入数组项和索引
    result.push(callback(arr[i], i));
  }
  // 返回重组后的数组
  return result;
}

// 测试
const arr = [2, 3, 4, 5];
const newArr = map(arr, (item, index) => {
  console.log(item, index);
  return item * 10;
});
console.log(newArr); // [20, 30, 40, 50]
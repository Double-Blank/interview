// fliter
function filter(arr, callback) {
  // 定义结果数组
  const result = [];
  // 循环
  for (let i = 0; i < arr.length; i++) {
    // 执行回调函数传入数组项和索引得到返回值
    const res = callback(arr[i], i);
    // 返回值为true推入结果数组
    if (res) {
      result.push(arr[i]);
    }
  }
  // 返回结果数组
  return result;
}

// 测试
const arr = [1, 2, 3, 4, 5];
const newArr = filter(arr, (item, index) => {
  return item % 2 === 0;
});
console.log(newArr); // [2, 4]
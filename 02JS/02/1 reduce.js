// reduce
function reduce(arr, callback, initValue) {
  // result 赋值为初始值
  let result = initValue;
  // 循环
  for (let i = 0; i < arr.length; i++) {
    // 执行函数传入初始值和数组元素将返回值重新赋值result以便于下次作为回调函数的第一个参数
    result = callback(result, arr[i]);
  }
  // 返回累计结果
  return result;
}

// 测试
const arr = [1, 2, 3, 4, 5];
const result = reduce(
  arr,
  (pre, cur) => {
    return pre + cur;
  },
  5
);
console.log(result); // 20


function myReduce(arr, callBack, init) {
  let result = init
  for (let i = 0; i < arr.length ; i++) {
    result = callBack(arr[i], result)
  }
  return result
}

const test = myReduce([1,2,3], (pre, cur) => {return pre + cur}, 5)
console.log(test)
// 给定一个整数数组，找到具有最大乘积的相邻元素对并返回该乘积
function solution(inputArray) {
  var max = inputArray[0] * inputArray[1];
  for (var i = 1; i < inputArray.length; i++) {
    max = Math.max(max, inputArray[i - 1] * inputArray[i]);
  }
  return max
}
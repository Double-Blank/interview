// 连续操作结束后再执行
const inputDOM = document.getElementById("test")
// function debounce(fn, delay) {
//   // 定时器变量
//   let timerId;
//   return function (...args) {
//     // 判断
//     if (timerId) {
//       // 清空定时器
//       clearTimeout(timerId);
//     }
//     // 开启定时器执行函数
//     timerId = setTimeout(() => {
//       fn.apply(this, args);
//       // 执行完成清空当前定时器,防止下次进来走到if逻辑
//       timerId = null;
//     }, delay);
//   };
// }
// 防抖
var debounce = function (fn, delay) {
  let clearTime = null
  return function (...args) {
    if (clearTime) {
      clearTimeout(clearTime)
    }
    clearTime = setTimeout(() => {
      fn.apply(this, args)
      clearTime = null
    },delay)
  }
}
inputDOM.addEventListener('input', debounce((e) => {
  console.log(e.target.value)
}, 1000))


// 先定义定时器 ，return fuction三个点，if 判空，开定时，定时里面来执行，fnfnffffn，记得带上apply



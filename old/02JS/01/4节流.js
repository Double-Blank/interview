// function throttle(fn, delay) {
//   // 定义开始时间
//   let start = 0;
//   return function (...args) {
//     let now = Date.now();
//     // 判断 当前时间 - 开始时间大于等于延迟时间
//     if (now - start >= delay) {
//       // 执行函数
//       fn.apply(this, args);
//       // 改变开始时间
//       start = now;
//     }
//   };
// }
// 节流
var throttle = function (fn, delay) {
  let start = 0
  return function (...args) {
    let end = Date.now()
    if (end - start > delay) {
      fn.apply(this, args)
      start = end
    }
  }
}
function task() {
  console.log("run task");
}
const throttleTask = throttle(task, 1000);
window.addEventListener("scroll", throttleTask);


//先定，return，再定现，判断，执行，改定开




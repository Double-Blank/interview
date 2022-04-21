// 柯里化 1
// TODO 发财发，FCF,RFCF,a,长度相等return fa,不相等再来个a2，箭头递归12
function curry(fn) {
  return function curryFn(...args1) {
    if (fn.length === args1.length) return fn(...args1)
    return (...args2) => curryFn(...args1, ...args2)
  }
}
// 测试
function getSum(a,b,c) {
  return a + b + c
}
let curried = curry(getSum);
console.log(curried(1)(2)(3)); // 6

// 柯里化 2
const add = (...args) => args.reduce((a, b) => {
  return a + b
});
function delayCurry(func) {
  let args = [];
  return function result(...a) {
    if (arguments.length === 0) { return func(...args) } // 直到没有参数时才返回结果
    args = args.concat([].slice.apply(arguments))
    return result;
  }
}

const sum = delayCurry(add);


console.log(sum(6)(3)(3)())


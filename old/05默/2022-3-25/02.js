// ! faf currtFn()
function curry(fn) {
  return function curryFn(...args1) {
    if (fn.length === args1.length) return fn(...args1)
    return (...args2) => curryFn(...args1, ...args2)
  }
}

function Sum(a, b, c, d) {
  return a + b + c + d
}

let curried = curry(Sum)

curried(1, 2)(3, 4)

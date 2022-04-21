// ! const result = obj.temp(...args)
function call(fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  obj.temp = fn
  const result = obj.temp(...args)
  delete obj.temp
  return result
}

const obj = {
  c: 20
}
function add(a, b) {
  return a+b+this.c
}
function apply(fn, obj, args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  obj.temp = fn
  const result = obj.temp(...args)
  delete obj.temp
  return result
}
function bind(fn, obj, ...args1) {
  return function (...args2) {
    return call(fn, obj, ...args1, ...args2)
  }
}

const test = bind(add, obj, 10)
console.log(test(20))


function myNew(Fn, ...args) {
  const obj = Fn.prototype
  const res = Fn.call(obj, ...args)
  return res instanceof Object ? res : obj
}

function People(name) {
  this.name = name
}
People.prototype.sayHello = function () {
  console.log('hello')
}
const t = myNew(People,'li')
console.log(t)
t.sayHello()

function myInstanceof(Fn, obj) {
  const prototype = Fn.prototype
  const proto = obj.__proto__
  while (proto) {
    if (prototype === proto) return true
    proto = proto.__proto__
  }
  return false
}
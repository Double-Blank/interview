// 浅拷贝
function shallowClone(target) {
  if (typeof target === 'object' && target !== null) {
    if (Array.isArray(target)) {
      return [...target]
    } else {
      return {...target}
    }
  } else {
    return target
  }
}

const obj = {a:1, b:{m:2}}
const cloneObj = shallowClone(obj)
cloneObj.a = 2
cloneObj.b.m = 3
console.log('cloneObj',cloneObj)
console.log('obj', obj)
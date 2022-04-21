// ! && 写成 ||
function deepclone(target, map = new Map()) {
  if (target !== null && typeof target === 'object') {
    const cache = map.get(target)
    if (cache) return cache
    let result = Array.isArray(target) ? [] : {}
    map.set(target, result)
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepclone(target[key], map)
      }
    }
    return result
  } else {
    return target
  }
}

const obj = {
  a: 1,
  b: {
    c: 2
  },
  d: [3]
}
const obj2 = deepclone(obj)
console.log(obj)
console.log(obj2)
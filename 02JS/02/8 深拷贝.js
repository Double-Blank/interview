// 深拷贝

// TODO 传个target,map,判断target 是 object ，则定义cache，如果cache有值return
// TODO 定义result数组对象区分一下，map set 
// TODO 开始遍历
// TODO 判断是否原型，是的话递归
function deepClone2(target, map = new Map()) {
  if (typeof target === "object" && target !== null) {
    const cache = map.get(target);
    if (cache) {
      return cache;
    }
    const result = Array.isArray(target) ? [] : {};
    map.set(target, result);
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone2(target[key], map);
      }
    }
    return result;
  } else {
    return target;
  }
}
// ! key in target 我写成了map

// ! map.set

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
  b: [2],
  c: 3,
  d: 4
};

obj.b.circle = obj.b
const cloneObj = deepclone(obj);
// console.log(obj);
console.log(cloneObj);




















/*
function mergeSort(arr) {
  let len = arr.length
  if (len < 2) return arr
  let middleIndex = Math.floor(len/2)
  // ! Arry.slice
  let left = arr.slice(0, middleIndex)
  let right = arr.slice(middleIndex, len)
  // ! return
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  // ! if
  while ( left.length ) result.push(left.shift())
  while ( right.length ) result.push(right.shift())
  return result
}

console.log(mergeSort([3,2,4,5,1]))
*/
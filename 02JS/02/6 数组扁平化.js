// 数组扁平化
function flat1(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...flat1(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

const arr = [1, 2, [3, 4, [5, 6]], 7]
const newArr = flat1(arr)
console.log(newArr)

// 合并多个对象
// TODO 定义result，传参foreach，再来foreach对象键名，如果有pro，就连R星O星，否则R星=O星，最后来return
function mergeObject(...objs) {
  const result = {}
  objs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (result.hasOwnProperty(key)) {
        result[key] = [].concat(result[key], obj[key])
      } else {
        result[key] = obj[key]
      }
    })
  })
  return result;
}

const obj1 = { a: [{ x: 2 }, { y: 4 }], b: 1 };
const obj2 = { a: { z: 3 }, b: [2, 3], c: "foo" };
// {a: [{x: 2}, {y: 4}, {z: 3}], b: [1, 2, 3], c:"foo"}


function mergeObj(...objs) {
  const result = {}
  // ! foreach 应为 forEach
  objs.foreach((obj) => {
    Object.keys(obj).forEach( key => {
      if (result.hasOwnProperty(key)) {
        result[key] = [].concat(result[key], obj[key])
      } else {
        result[key] = obj[key]
      }
    });
  })
  return result
}
console.log(mergeObj(obj1, obj2));
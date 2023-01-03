// 合并数组
const obj1 = { a: [{ x: 2 }, { y: 4 }], b: 1 };
const obj2 = { a: { z: 3 }, b: [2, 3], c: "foo" };
// {a: [{x: 2}, {y: 4}, {z: 3}], b: [1, 2, 3], c:"foo"}
function mergeObj(...args) {
  let result = {}
  args.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (result.hasOwnProperty(key)) {
        result[key] = [].concat(result[key], obj[key])
      } else {
        result[key] = obj[key]
      }
    });
  });
  return result
}
// console.log(mergeObj(obj1, obj2))
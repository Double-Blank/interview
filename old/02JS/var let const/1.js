// 将下列对象进行合并
const a = {
  a: 1,
  b: 4
}

const b = {
  b: 2,
  c: 3
}

let obj1 = Object.assign(a, b)
console.log(obj1)

// 扩展运算符
let obj2 = {...a, ...b}


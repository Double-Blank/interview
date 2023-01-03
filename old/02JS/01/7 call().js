// call()
// TODO 先判断，不符合指向全局，用临时obj.temp，result装一下，装的时候要展开，删了临时再return

function call(fn, obj, ...args) {
  if (obj === null || obj === undefined) {
    obj = globalThis
  }
  obj.temp = fn;
  const reuslt = obj.temp(...args);
  delete obj.temp;
  return reuslt;
}

function add(a, b) {
  return a + b + this.c;
}
this.c = 10;
const obj = {
  c: 20,
};

console.log(call(add, null, 30, 40)); // 指向window 结果80
console.log(call(add, obj, 30, 40)); // 指向obj 结果90

// myCall

Function.prototype.myCall = function (context, ...args) {
  if (typeof context === 'undefined' || context === null) {
    context = globalThis
  }
  const temp = context
  temp.tempFn = this
  const result = temp.tempFn(...args)
  delete temp.tempFn
  return result
}
function fn(a, b) {
  console.log('a', a)
  console.log('b', b)
  console.log('this', this)

  return 'hello'
}
const res = fn.myCall({ x: 10 }, 20, 30)

// apply()
function apply(fn, obj, args) {
  // 判断obj为ull 或者 undefined就指向全局对象
  if (obj === null || obj === undefined) {
    obj = globalThis; //全局对象
  }
  // 为obj添加临时方法
  obj.temp = fn;
  // 执行临时方法传入参数得到结果
  const reuslt = obj.temp(...args);
  // 删除临时方法
  delete obj.temp;
  // 返回结果
  return reuslt;
}

// 测试
function add(a, b) {
  // console.log(this);
  return a + b + this.c
}
window.c = 10;
const obj = {
  c: 20
}

console.log(apply(add, null, [30, 40])); // 指向window 结果80
console.log(apply(add, obj, [30, 40]));  // 指向obj 结果90

//bind()
function bind(fn, obj, ...args1) {
  //  返回新函数
  return function (...args2) {
    // 新函数执行call函数返回结果
    return call(fn, obj, ...args1, ...args2)
  }
}

// 测试
function add(a, b) {
  // console.log(this);
  return a + b + this.c;
}
window.c = 10;
const obj = {
  c: 20,
};
// bind绑定this同时参数全部传递 返回新函数
const fn1 = bind(add, obj, 30, 40);
console.log(fn1()); // 90

// 返回的新函数传递参数
const fn2 = bind(add, obj);
console.log(fn2(30, 50)); // 100

// 先传递一些后面再传递完整
const fn3 = bind(add, obj, 30);
console.log(fn3(60)); // 110
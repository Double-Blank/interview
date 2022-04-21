// new 构造函数生成实例
function MyNew(Fn, ...args) {
  // 创
  const object = Object.create(Fn.prototype);
  // 执
  const result = Fn.call(object, ...args);
  // 返
  return result instanceof Object ? result : object;
}

// 测试
function People(name) {
  this.name = name;
}
People.prototype.sayHello = function () {
  console.log("Hi");
};
const yun = MyNew(People, "yunmu");
console.log(yun); // People {name: 'yunmu'}
yun.sayHello(); // Hi




function mynew(Fn, ...args) {
  const obj = Object.create(Fn.prototype)
  const res = Fn.call(obj, args)
  return res instanceof Object ? res : obj
}


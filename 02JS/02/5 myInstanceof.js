// instanceof F显 O隐 遍历proto
function myInstanceof(Fn, obj) {
  const prototype = Fn.prototype;
  let proto = obj.__proto__;
  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
}

function myinstanceof(Fn, obj) {
  let prototype = Fn.prototype
  let proto = obj.__proto__
  while (proto) {
    if (proto === prototype) {
      return true
    }
    proto = proto.__proto__
  }
  return false
}

function C() {}
function D() {}

var o = new C()
console.log(myinstanceof(Object,C))







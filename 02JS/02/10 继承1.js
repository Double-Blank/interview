// call
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log('People')
}

function Chinese(name, age, city) {
  Person.call(this, name, age) // ! 
  this.city = city
}
let chinese1 = new Chinese('li', 22, 'beijing')
console.log(chinese1)

// 组合继承
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log('People')
}

function Chinese(name, age, city) {
  Person.call(this, name, age)
  this.city = city
}
/*
TODO 可以封装
function Fn() {}
Fn.prototype = Person.prototype
Chinese.prototype = new Fn()
*/

// function object(obj) {
//   function Fn() {}
//   Fn.prototype = obj
//   return new Fn()
// }
// Chinese.prototype = object(Person.prototype)
Chinese.prototype = Object.create(Person.prototype)

let chinese1 = new Chinese('li', 22, 'beijing')

console.log(chinese1)

// 寄生组合继承

function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log('People')
}

function Chinese(name, age, city) {
  Person.call(this, name, age)
  this.city = city
}

inheritPrototype(Chinese, Person)

function inheritPrototype(Sub, Super) {
  let prototype = Object.create(Super.prototype)
  prototype.constructor = Sub
  Sub.prototype = prototype
}

let chinese1 = new Chinese('li', 22, 'beijing')

console.log(chinese1)

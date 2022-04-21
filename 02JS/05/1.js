function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log('Hello')
}

function Chinese(location) {
  this.location = location
}
// 原型链继承
Chinese.prototype = new Person()

// call 借用构造函数继承
function Chinese(name, age, city) {
  Person.call(this, name, age)
  this.city = city
}

const chinese1 = new Chinese('Li',23,'tieling')

// 组合继承
function Chinese(name, age, city) {
  Person.call(this, name, age)
  this.city = city
}
Chinese.prototype = Object.create(Person.prototype)
const chinese2 = new Chinese('Li',23,'tieling')


function Chinese(name, age, city) {
  Person.call(this, name, age)
  this.city = city
}
// 寄生组合继承
inherit(Chinese, Person)

function inherit(Sub, Super) {
  let prototype = Object.create(Super.prototype)
  prototype.constructor = Sub
  Sub.prototype = prototype
}
// es6
class Person {
  constructor(name, age){
    this.name = name
    this.age = age
  }
  say () {
    console.log('Hello')
  }
}

class Chinese extends Person {
  constructor(name, age, city) {
    super(name, age)
    this.city = city
  }
}
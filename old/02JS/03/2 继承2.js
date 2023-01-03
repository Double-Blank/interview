// class 继承
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  say() {
    console.log('Hello Person !!!')
  }
}
class Chinese extends Person {
  constructor(name, age, city) {
    super(name, age)
    this.city = city
  }
}
// let person = new Person('class', 19)
// console.log(person)
let chinese = new Chinese('wang',22,'beijing')
console.log(chinese)
chinese.say()

// 构造函数模式 constructor 原型模式 prototype __proto__
// 原型链继承
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log('wubaba')
}


function Chinese(city) {
  this.city = city
}
Chinese.prototype = new Person()

chinese1 = new Chinese('nanjing')
console.log(chinese1.__proto__)

// * 好电脑，请你再撑一段时间，现在我很需要你
// object.create
// TODO give me some tomato
function myCrearte(obj) {
  function temp() {}
  // ! temp.property = obj
  temp.prototype = obj
  return new temp()
}

let testObj = {
  test : '1'
}
const res = myCrearte(testObj)
console.log(res)
// console.log(Object.create(testObj).test)



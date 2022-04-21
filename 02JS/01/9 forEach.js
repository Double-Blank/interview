// forEach
const array1 = ['a', 'b', 'c'];
function myforEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
// array1.forEach(element => console.log(element));
myforEach(array1, (element,index) => console.log(element,index))
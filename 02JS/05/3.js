// 数组去重
// 1
console.log(...new Set(arr))
// 2 indexOf
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i])
    }
  }
  return array;
}
console.log(unique(arr))
// 3 sort
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return;
  }
  arr = arr.sort()
  var arrry = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      arrry.push(arr[i]);
    }
  }
  return arrry;
}
// 4 includes
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (!array.includes(arr[i])) {//includes 检测数组是否有某个值
      array.push(arr[i]);
    }
  }
  return array
}
// 5 hasOwnProperty 所有的都能去掉
function uniqueTest(arr) {
  var obj = {};
  return arr.filter(function(item, index, arr){
    console.log(obj)
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
  })
}



// 数组去重优化版
// filter
arr = [1,2,3,4,5,5,5,5,6]
function unique(arr) {
  let result = arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })

  return result
}
// reduce
function unique2(arr) {
  let result = arr.reduce((pre, item) => {
    return pre.includes(item) ? pre : [...pre, item]
  }, [])

  return result
}
// object
function unique3(arr) {
  let result = {}

  arr.forEach((item, index) => {
    result[arr[index]] = ''
  })

  return Object.keys(result).map(x => parseInt(x))
}

// indexOf
function unique4(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i])
    }
  }
  return array;
}
// sort
function unique5(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return;
  }
  arr = arr.sort()
  var arry = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      arry.push(arr[i]);
    }
  }
  return arry;
}
// includes
function unique6(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (!array.includes(arr[i])) {//includes 检测数组是否有某个值
      array.push(arr[i]);
    }
  }
  return array
}
// hasOwnProperty
function unique7(arr) {
  var obj = {};
  return arr.filter((item, index, arr) => {
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
  })
}
console.log(unique7(arr))
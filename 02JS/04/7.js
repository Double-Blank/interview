// 有这样一个字符串"http://www.showmebug.com/item.html?a=1&b=2&c=&d=xxx",要求转化成 {"a":1,"b":2,"c":,"d":xxx}
let str = 'http://www.showmebug.com/item.html?a=1&b=2&c=&d=xxx'
console.log(solution(str))
function solution(str) {
  var json = {};
  if (str.indexOf('?') != -1) {
    var str1 = str.substring(str.indexOf('?') + 1);
    console.log(str1)
    var arr = str1.split('&')
    for (var i = 0; i < arr.length; i++) {
      var arr1 = arr[i].split('=');
      json[arr1[0]] = arr1[1]
    }
  }
  return json;
}


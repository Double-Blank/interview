// 括号是否有效
// 判断括号字符是否有效
var isValid = function (s) {
  const stack = []
  for (let i of s) {
    if (i === '(')
      stack.push(')')
    else if (i === '[')
      stack.push(']')
    else if (i === '{') {
      stack.push('}')
    }
    else if (i !== stack.pop())
      return false
  }
  return stack.length === 0
}

console.log(encodeURIComponent('&#xD83C;&#xDF97;'))
// 回文
var isPalindrome = function(s) {
  let validate = s.toLowerCase().match(/[A-Za-z0-9+]/g)
  if (!validate) return ture
  let right = validate.join('')
  let left = right.split('').reverse().join('')
  return right===left
}
console.log(isPalindrome('A man, a plan, a canal: Panama'))
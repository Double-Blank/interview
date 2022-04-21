// 最长回文子串
var longestPalindrome = function(s) {
  let len = s.length
  if (len < 2) {
    return s
  }
  let maxLen = 1
  let begin = 0
  let dp = Array.from(new Array(len), () => new Array(len).fill(false))
  for (let L = 2; L <= len; L++) {
    for (let i = 0; i < len ; i++) {
      let j = L + i - 1
      // 初始条件
      if ((L===2 || L===3) && s[i]===s[j]){
        dp[i][j] = true
      }
      // 递推公式
      if(s[i] === s[j] && dp[i + 1][j - 1] === true){
        dp[i][j] = true
      }
      if(dp[i][j] && (L > maxLen)) {
        maxLen = L
        begin = i
      }
    }
  }
  return s.substr(begin,maxLen)
}

function long(s) {
  let res = ''

  for (let i = 0; i < s.length; i++) {
    // 奇数
    let leftIndex = i - 1
    let rightIndex = i + 1
    while (leftIndex >= 0 && rightIndex < s.length && s[leftIndex] === s[rightIndex]) {
      leftIndex --
      rightIndex ++
    }
    if (res.length < rightIndex - leftIndex - 1) {
      res = s.substr(leftIndex + 1, rightIndex - leftIndex - 1)
    }

    //偶数
    leftIndex = i
    rightIndex = i + 1
    while (leftIndex >= 0 && rightIndex < s.length && s[leftIndex] === s[rightIndex]) {
      leftIndex --
      rightIndex ++
    }
    if (res.length < rightIndex - leftIndex - 1) {
      res = s.substr(leftIndex + 1, rightIndex - leftIndex - 1)
    }
  }

  return res
  
}

console.log(long('cbbd'))
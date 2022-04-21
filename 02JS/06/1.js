function findMost(arr) {
  if (!arr.length) return
  if (arr.length === 1) return 1
  let res = {}
  let maxName, maxNum = 0
  // 遍历数组
  arr.forEach((item) => {
    res[item] ? res[item] += 1 : res[item] = 1
  })
  console.log(res)
  // 遍历 res
  for (let r in res) {
    if (res[r] > maxNum) {
      maxNum = res[r]
      maxName = r
    }
  }
  return '出现次数最多的元素为:' + maxName + ', 出现次数为:' + maxNum;
}

console.log(findMost([1, 2, 3, 3, 5, 2, 9, 8, 6, 5, 3]))
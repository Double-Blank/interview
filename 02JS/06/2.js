arr = readline().split(" ")
if (!arr.length) return
  if (arr.length === 1) return 1
  let res = {}
  let maxName, maxNum = 0
  // 遍历数组
  arr.forEach((item) => {
    res[item] ? res[item] += 1 : res[item] = 1
  })
  // 遍历 res
  for (let r in res) {
    if (res[r] > maxNum) {
      maxNum = res[r]
      maxName = r
    }
  }
  print(maxName)


  // \[|\]| 
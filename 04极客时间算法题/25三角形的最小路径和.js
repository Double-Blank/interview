// 三角形的最小路径和
var minimumTotal = function (triangle) {
  let l = triangle.length
  let arr = triangle[l - 1]
  for (let i = l - 2; i >= 0; i--) {
    let next = []
    for (let j = 0; j <= i; j++) {
      next.push(triangle[i][j] + Math.min(arr[j], arr[j + 1]))
    }
    arr = next
  }
  return arr[0]
}
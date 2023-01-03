
const arr = [1, 2, [3, 4, [5, 6]], 7]
function myFlat(arr) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...myFlat(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  // ! return result
  return result
}

console.log(myFlat(arr))
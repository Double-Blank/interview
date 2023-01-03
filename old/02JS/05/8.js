// 斐波那契
// f(n)=f(n-1)+f(n-2)(n>2) f(0)=1;f(1)=1; 递归方程
// 递归实现 时间复杂度O(2^n) 空间复杂度O(n)
function fibo(n) {
  if (n < 3) return 1
  else return fibo(n - 1) + fibo(n - 2)
}

console.log(fibo(10))

// 动态规划+滑动数组 时间复杂度：O(n) 空间复杂度：O(1)
function fib(n) {
  if (n < 2){
    return n
  }
  let p = 0, q = 0, r = 1
  for(let i = 2; i <= n; i++){
    p = q
    q = r
    r = p + q
  }
  return r
}

console.log(fib(10))
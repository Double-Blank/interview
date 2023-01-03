## 编程
```javascript
let arr = readline().replace(/\[|\]| /g, "").split(",")
```
### 出现次数最多的元素为
```javascript
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
```
### 反转链表
```javascript
// 反转链表
function listNode(val, next) {
  this.val = val
  this.next = next
}

const head = new listNode(1)
head.next = new listNode(2)
head.next.next = new listNode(3)
console.log(head)

//      1    2   3 4
//pre  cur  temp
// 先备后断再连再连
var reverseList = function (head) {
  let cur = head
  let pre = null
  while (cur) {
    const temp =cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }
  return pre
}

console.log(reverseListT(head))
```

### 排序算法
```javascript
// 排序算法
// 冒泡排序
const arr = [3,4,5,1,2]
var sortArr1 = function (arr) {
  for (let i = 0 ; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j],arr[j+1]] = [arr[j+1] , arr[j]]
      }
    }
  }
  return arr
}
//选择排序
var sortArr2 = function (arr) {
  let minIndex
  for(let i = 0; i < arr.length - 1; i++) {
    minIndex = i
    for (let j = i+1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}
// 插入排序
var sortArr3 = function (arr) {
  let len = arr.length
  let preIndex, current
  for (let i = 1; i < len; i++) {
    preIndex = i - 1
    current = arr[i]
    while (preIndex >=0 && arr[preIndex] > current) {
      // 交换
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}

console.log(sortArr3(arr))

// 快排
var quickSort = function (arr) {
  if (arr.length <= 1) { return arr; }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};
// 检个数，小等于1
// 择"基准"，so place give me index，math floor ~
// 遍历装左右，跟基准比较
// 递归左中右，concat别忘记

var sortArr3 = function (arr) {
  if (arr.length <= 1) return arr
  let pivotIndex = Math.floor(arr.length / 2)
  // !  let pivot = arr.splice(arr[pivotIndex],1)[0]
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return sortArr3(left).concat([pivot], sortArr3(right))
}

// TODO 改进的
// TODO 先检数，定基准和左中右，再遍历，递归左中右
var quickSort = function (arr) {
  if (arr.length <= 1) { return arr; }
  var pivot = arr[0];
  var left = [];
  var right = [];
  var mid = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] > pivot) {
      right.push(arr[i]);
    } else {
      mid.push(arr[i]);
    }
  }
  return quickSort(left).concat(mid, quickSort(right));
};

// console.log(sortArr3([5, 4, 2, 1, 3]))

// 归并
var mergeSort = function (arr) {
  let len = arr.length
  if (len < 2) return arr
  let middle = Math.floor( len / 2 )
  let left = arr.slice(0, middle)
  let right = arr.slice(middle, len)
  return merge(mergeSort(left),mergeSort(right))
}

var merge = function (left, right) {
  let result = []
  while (left.length && right.length) {
    // ! <=
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  while (left.length) { result.push(left.shift()) }
  while (right.length) { result.push(right.shift()) }
  return result
}
console.log(mergeSort([4,5,3,1,2]))
```
### 防抖节流
```javascript
// 防抖
// 多次触发，重新计时
var debounce = function (fn, delay) {
  let clearTime = null
  return function (...args) {
    if (clearTime) {
      clearTimeout(clearTime)
    }
    clearTime = setTimeout(() => {
      fn.apply(this, args)
      clearTime = null
    },delay)
  }
}
inputDOM.addEventListener('input', debounce((e) => {
  console.log(e.target.value)
}, 1000))

// 节流
// 多次触发，只执行一次
var throttle = function (fn, delay) {
  let start = 0
  return function (...args) {
    let end = Date.now()
    if (end - start > delay) {
      fn.apply(this, args)
      start = end
    }
  }
}
function task() {
  console.log("run task");
}
const throttleTask = throttle(task, 1000);
window.addEventListener("scroll", throttleTask);
```
### 计算相邻重复单词数
```javascript
function solution(s) {
  var res = s.match(/(\b\w+)\s\1/ig);
  return res == null ? 0 : res.length;
}

(捕获分组 #1. 把多个标记分在同一组并创建一个捕获分组，用来创建子串或引用。
  \b词边界. 匹配一个单词边界，也就是指单词和空格间的位置。
  \w单词. 匹配字母、数字、下划线。
  +量词. 匹配 1 或更多 个前面的标记。
)

\s空白字符. 匹配任何空白字符。(空格, 制表符, 换行符)

\1数字引用. 匹配#1号捕获分组的结果。
```
### 每三位数字加个逗号和最后增加两位小数点
```javascript
 /**转化金额**/
function convert(money) {
  var s = money; /**获取小数型数据**/
  s += "";
  if (s.indexOf(".") == -1) s += ".0"; /**如果没有小数点，在后面补个小数点和0**/
  if (/\.\d$/.test(s)) s += "0"; /**正则判断**/
  while (/\d{4}(\.|,)/.test(s)) /**符合条件则进行替换**/
    s = s.replace(/(\d)(\d{3}(\.|,))/, "$1,$2"); /**每隔3位添加一个**/
  return s;
}
console.log(convert(1000));
```

### 寻找名至实归的用户
```javascript
function solution(users) {
  var min = + Infinity;
  var ans = 0;
  for (var key in users)
    if (Math.abs(users[key] - Number(key)) < min) {
      min = Math.abs(users[key] - Number(key));
      ans = key;
    }
  return +ans
}
```
### 生成圣诞树
```javascript
// 生成圣诞树
function solution(height) {
  for (var i = 0, out = "", num = 1, spaces = height - 1; i < height; i++) {
    for (var j = 0; j < spaces; j++) out += " ";
    for (var j = 0; j < num; j++) out += "*";
    for (var j = 0; j < spaces; j++) out += " ";
    num += 2, out += "\n", spaces -= 1;
  }
  return out.substr(0, out.length - 1);
}
```
### 树转列表
```javascript
// 树转列表
function Node(value, childNodes = null) {
  this.value = value;
  this.childNodes = childNodes;
}

function solution(root) {
  var nodesList = []
  nodes = []
  nodes.push(root)
  while (nodes.length > 0) {
    node = nodes.shift()
    nodesList.push(node.value)
    for (i = 0; i < (node.childNodes || []).length; i++) {
      nodes.push(node.childNodes[i])
    }
  }
  return nodesList
}
```
### 按层级排序二叉树
```javascript
function Node(value, left = null, right = null) {
  this.value = value;
  this.left = left;
  this.right = right;
}
function solution(root) {
  p = []
  q = [root]
  while (q.length > 0) {
    v = q.shift()
    if (v != null) {
      p.push(v.value);
      q.push(v.left);
      q.push(v.right);
    }
  }
  return root ? p : [];
}
```
### 类型校验
```javascript
// 类型校验
function Mytypeof(obj) {
  const dataType = typeof obj
  if (dataType !== 'object') {
    return dataType
  }
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
```
### 数组去重
```javascript
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
```
### 二叉树
```javascript
function TreeNode(val) {
  this.val = val
  this.left = null
  this.right = null
}
let root = new TreeNode(3)
root.left = new TreeNode(9)
root.right = new TreeNode(20)
root.right.left = new TreeNode(15)
root.right.right = new TreeNode(7)
console.log('')
// 二叉树
// 二叉树层次遍历
function fn(root) {
  if (root === null) {
    return []
  }
  const result = []
  const temp = []
  temp.push(root)
  while (temp.length !== 0) {
    let size = temp.length
    result.push([])
    for (let i = 1 ; i <= size; i++) {
      const node = temp.shift()
      result[result.length - 1].push(node.val)
      if(node.left) temp.push(node.left)
      if(node.right) temp.push(node.right)
    }
  }
  return result
}

// 后序遍历
var postorderTraversal = function(root) {
  let number = []
  function search(node){
    if (node !== null) {
      search(node.left)
      search(node.right)
      number.push(node.val)
    }
  }
  search(root)
  return number
}

// console.log(postorderTraversal(root))

// 中序遍历
var preorderTraversal = function(root) {
  let number = []
  function search(node){
    if (node !== null) {
      search(node.left)
      number.push(node.val)
      search(node.right)
    }
  }
  search(root)
  return number
}

// console.log(preorderTraversal(root))

// 前序遍历
var preorderTraversal = function(root) {
  let number = []
  function search(node){
    if (node !== null) {
      number.push(node.val)
      search(node.left)
      search(node.right)
    }
  }
  search(root)
  return number
}

// console.log(preorderTraversal(root))

// N叉树的层次遍历
var levelOrder = function(root) {
  const res = []
  function traversal (root,k) {
    if (root !== null) {
      if (res[k] === undefined) {
        res[k] = [] 
      }
      res[k].push(root.val)
      root.children.forEach(child => traversal(child, k+1))
    }
  }
  traversal(root, 0)
  return res
}

// console.log(levelOrder(root))
```
### 回文
```javascript
var isPalindrome = function(s) {
  let validate = s.toLowerCase().match(/[A-Za-z0-9+]/g)
  if (!validate) return ture
  let right = validate.join('')
  let left = right.split('').reverse().join('')
  return right===left
}
console.log(isPalindrome('A man, a plan, a canal: Panama'))
```
### 合并数组
```javascript
const obj1 = { a: [{ x: 2 }, { y: 4 }], b: 1 };
const obj2 = { a: { z: 3 }, b: [2, 3], c: "foo" };
// {a: [{x: 2}, {y: 4}, {z: 3}], b: [1, 2, 3], c:"foo"}
function mergeObj(...args) {
  let result = {}
  args.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (result.hasOwnProperty(key)) {
        result[key] = [].concat(result[key], obj[key])
      } else {
        result[key] = obj[key]
      }
    });
  });
  return result
}
// console.log(mergeObj(obj1, obj2))
```

### 找到两个数组的交集
```javascript
var numOne = [0, 2, 4, 6, 8, 8];
var numTwo = [1, 2, 3, 4, 5, 6];
var duplicatedValues = […new Set(numOne)].filter(item => numTwo.includes(item));
console.log(duplicatedValues); // returns [2, 4, 6]
```

### randomInt
```javascript
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);// 向上取整
  max = Math.floor(max);// 向下取整
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}
```

### 最长回文子串
```javascript
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
console.log(longestPalindrome('aatesetaa'))
```
### 括号是否有效
```javascript
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
```
### 斐波那契
```javascript
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
```

### 给定一个整数数组，找到具有最大乘积的相邻元素对并返回该乘积
```javascript
function solution(inputArray) {
  var max = inputArray[0] * inputArray[1];
  for (var i = 1; i < inputArray.length; i++) {
    max = Math.max(max, inputArray[i - 1] * inputArray[i]);
  }
  return max
}
```

### 有这样一个字符串"http://www.showmebug.com/item.html?a=1&b=2&c=&d=xxx",要求转化成 {"a":1,"b":2,"c":,"d":xxx}
```javascript
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
```
### 三数之和
```
首先对数组进行排序，排序后固定一个数 nums[i]nums[i]nums[i]，再使用左右指针指向 nums[i]nums[i]nums[i]后面的两端，数字分别为 nums[L]nums[L]nums[L] 和 nums[R]nums[R]nums[R]，计算三个数的和 sumsumsum 判断是否满足为 000，满足则添加进结果集
如果 nums[i]nums[i]nums[i]大于 000，则三数之和必然无法等于 000，结束循环
如果 nums[i]nums[i]nums[i] == nums[i−1]nums[i-1]nums[i−1]，则说明该数字重复，会导致结果重复，所以应该跳过
当 sumsumsum == 000 时，nums[L]nums[L]nums[L] == nums[L+1]nums[L+1]nums[L+1] 则会导致结果重复，应该跳过，L++L++L++
当 sumsumsum == 000 时，nums[R]nums[R]nums[R] == nums[R−1]nums[R-1]nums[R−1] 则会导致结果重复，应该跳过，R−−R--R−−
时间复杂度：O(n2)O(n^2)O(n2)，nnn 为数组长度
```
```javascript
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len ; i++) {
        if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let L = i+1;
        let R = len-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if(sum == 0){
                ans.push([nums[i],nums[L],nums[R]]);
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }        
    return ans;
}
```

### 两数之和

```javascript
hashMap
var twoSum = function (nums, target) {
    const map = new Map();
    for (var i = 0; i < nums.length - 1; i++) {
        if (map.has(nums[i])) {
            return [map.get(nums[i]), i];
        } else {
            map.set(target - nums[i], i)
        }
    }
}
```
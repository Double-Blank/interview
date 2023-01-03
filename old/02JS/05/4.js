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
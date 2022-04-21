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
}
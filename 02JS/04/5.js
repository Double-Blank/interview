// 按层级排序二叉树
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
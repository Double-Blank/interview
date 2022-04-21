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
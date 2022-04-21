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


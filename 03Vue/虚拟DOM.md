数据改变 -》 虚拟DOM(计算变更) -》 操作真实DOM -》 视图更新

JS 表达DMO（抽象语法树）

snabbdom
  通过patch()函数 把虚拟节点塞到容器里vnode -> container
 
diff 算法 -》 树
  1、只比较同一级
  2、标签名不同，直接删除
  3、标签名相同，key相同，就认为是相同节点不继续深度比较

生成vnode
  h函数会通过算法返回一个vnode节点，而vnode节点是保存了6个属性的节点

patch
接收 oldVnode vnode|Element ，新 vnode
  init -> 是不是DOM元素 是就创建空的Vnode并且关联一个DOM元素，还会比较patch()第一个参数和第二个参数是不是同一个Vnode，如果是同一个Vnode我们就直接patchVnode更新，不是就创建新的DOM元素，并且删除老的

patchVnode
  核心就是在旧的虚拟dom上打补丁，尽可能的复用节点，减少浏览器的回流重绘，提高性能

  设置新的 vnode 关联的DOM元素

  if(isUndef(vonode.text)) { // 无text 有children
    // 新有children 老有
    updateChildren
    // 新有 children 老没有 但有text
    清空text -> add children
    // 新无 就有 chilidren
    移除老的
    // 老的Vnode有text
    清空
  }
  else if (vonode.text !== old.text) {
    // 设置新的Vnode
  }

updateChidren
  复用老的节点
  oldstartIdx
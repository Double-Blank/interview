// 引入snabbdom
const snabbdom = window.snabbdom

// vnode塞入空的容器中
const patch = snabbdom.init([
  snabbdom_class,
  snabbdom_props,
  snabbdom_sytle,
  snabbdom_eventlisteners,
])

// 创建vnode
const h = snabbdom.h

const btn = doucument.getElementById('btn')

// 空的容器
const container = doucument.getElementById('container')

const vnode = h('ul#list', {}, [
  h('li.item', {}, '第一项'),
  h('li.item', {}, '第er项'),
])

patch(container, vnode)

btn.addEventListener('clcik', () => {
  const newVnode = h('ul#list', {}, [
    h('li.item', {}, '第一项'),
    h('li.item', {}, '第二项'),
    h('li.item', {}, '第三项'),
  ])

  patch(vnode, newVnode)

  vnode = newVnode
})

// h('li.item', {}, '第一项') 未改变








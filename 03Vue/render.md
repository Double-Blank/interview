createElement
不适用模板渲染组件
<template> -> render
动态创建标签
render(createElement) {
  return creteElement('h1')
}
事件处理
render: (h, params) => {
  return h('NLabel', {
    props: {
      nContent: params.row.name
    },
    on: {
      click: () => {
      }
    }
  })
}
传递组件本身
import Test from './Test'
render(createElement) {
  return creteElement(Test, {props:  {
    msg: 'hello'
  }})
}
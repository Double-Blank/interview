v-model = "selectedLaebl" 
<=>
v-bind:value = "selectedLaebl"  prop
v-on:input ="selectedLaebl = $event" 监听input事件
派发监听事件 method -> trigger -> this.$emit('input', value)

Vue2不能绑定多个 可以用修饰符.sync
v-model="age"
:name.sync="name"

Vue3 v-model 的变化
v-model:age
v-model:name

// 自定义Model , v-model默认监听input事件, 使用model配置项，属性跟事件配置
<BaseCheckBox :checked="checked" @change="checked = $event">

export default {
  model: {
    prop: 'check',
    event: 'change'
  },
  props: ['checked'],
  method: {
    handleChange(e) {
      this.$emit('change', e.target.checked)
    }
  }
}
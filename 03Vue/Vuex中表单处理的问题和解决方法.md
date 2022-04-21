// 计算属性设置getter和setter
v-model="value"
computed {
  value: {
    get() {
      return this.$store.getters.value
    },
    set() {
      this.$store.commit('updateValue', value)
    }
  }
}

vuex.store({
  stateL: {
    value: 0
  },
  getters: {
    value(state) {
      return state.value
    },
  },
  mutations: {
    updateValue(state, value) {
      state.value = value
    }
  },
  action: {},
  modules: {},
})
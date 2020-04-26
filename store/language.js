export const state = () => ({
  value: 'en'
})

export const mutations = {
  CHANGE_LANGUAGE(state, value) {
    state.value = value
  }
}

export const actions = {
  async change({ commit }, value) {
    commit('CHANGE_LANGUAGE', value)
  }
}

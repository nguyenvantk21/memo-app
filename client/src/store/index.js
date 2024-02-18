import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    memos: [],
  },
  mutations: {
    login(state, user) {
      state.user = user
    },
    logout(state) {
      state.user = null
      state.memos = []
    },
    addMemo(state, memo) {
      state.memos.push(memo)
    },
    updateMemo(state, { index, newContent }) {
      state.memos[index].content = newContent
    },
    deleteMemo(state, index) {
      state.memos.splice(index, 1)
    },
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload)
    },
    logout({ commit }) {
      commit('logout')
    },
    addMemo({ commit }, memo) {
      commit('addMemo', memo)
    },
    updateMemo({ commit }, payload) {
      commit('updateMemo', payload)
    },
    deleteMemo({ commit }, index) {
      commit('deleteMemo', index)
    },
  },
  getters: {
    getAllMemos: (state) => state.memos,
  },
})

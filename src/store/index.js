import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    memos: [],
  },
  mutations: {
    loginUser(state, user) {
      state.user = user;
    },
    logoutUser(state) {
      state.user = null;
    },
    addMemo(state, memo) {
      state.memos.push(memo);
    },
    updateMemo(state, { index, newContent }) {
      state.memos[index].content = newContent
    },
    deleteMemo(state, index) {
      state.memos.splice(index, 1)
    }
  },
  actions: {
    addMemo({ commit }, memo) {
      commit('addMemo', memo)
    },
    updateMemo({ commit }, payload) {
      commit('updateMemo', payload)
    },
    deleteMemo({ commit }, index) {
      commit('deleteMemo', index)
    }
  },
  getters: {
    getAllMemos: state => state.memos
  }
});

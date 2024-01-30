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
      console.log(memo);
      console.log(state.memos);
    },
    editMemo(state, { index, newContent }) {
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
    editMemo({ commit }, payload) {
      commit('editMemo', payload)
    },
    deleteMemo({ commit }, index) {
      commit('deleteMemo', index)
    }
  },
  getters: {
    getAllMemos: state => state.memos
  }
});

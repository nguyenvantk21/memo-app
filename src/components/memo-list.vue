<template>
  <div>
    <h2>Memo List</h2>
    <div v-if="user">
      <div>
        <h2>Welcome, {{ user.email }}!</h2>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <form @submit.prevent="addMemo">
      <label for="memo">Add Memo:</label>
      <input type="text" id="memo" v-model="newMemo" required />
      <button type="submit">Add</button>
    </form>
    <ul>
      Memo List
      <li v-for="(memo, index) in memos" :key="index">
        {{ index }} - {{ memo.content }}
        <button @click="editMemo(index)">Edit</button>
        <button @click="deleteMemo(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      newMemo: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    memos() {
      return this.$store.getters.getAllMemos
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    addMemo() {
      this.$store.dispatch('addMemo', { content: this.newMemo })
      this.newMemo = ''
    },
    // editMemo(index) {
      // this.$store.dispatch('editMemo', { index, newContent })
    // },
    deleteMemo(index) {
      if (confirm('Are you sure you want to delete this memo?')) {
        this.$store.dispatch('deleteMemo', index)
      }
    }
  },
  mounted() {
    document.title = "Memo Management Page";
  },
};
</script>
  
<style scoped>
</style>
  
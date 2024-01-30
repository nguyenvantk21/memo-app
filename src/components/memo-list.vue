<template>
  <div>
    <h2>Memo List</h2>
    <div v-if="user">
      <div>
        <h2>Welcome, {{ user.email }}!</h2>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <form v-if="btnType == 'add'" @submit.prevent="addMemo">
      <label for="memo">Add Memo:</label>
      <input type="text" id="memo" v-model="newMemo" required />
      <button type="submit">Add</button>
    </form>
    <form v-if="btnType == 'edit'" @submit.prevent="updateMemo">
      <label for="memo">Edit Memo:</label>
      <input type="text" id="memo" v-model="editMemoContext" required />
      <button type="submit">Save</button>
    </form>
    <form v-if="btnType == 'edit'" @submit.prevent="cancelEdit">
      <button type="submit">Cancel</button>
    </form>
    <ul>
      Memo List
      <li v-for="(memo, index) in memos" :key="index">
        {{ memo.content }}
        <button @click="clickToEditMemo(index)">Edit</button>
        <button @click="deleteMemo(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      newMemo: "",
      btnType: "add",
      currentIndex: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    memos() {
      return this.$store.getters.getAllMemos;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    addMemo() {
      this.$store.dispatch("addMemo", { content: this.newMemo });
      this.newMemo = "";
    },
    clickToEditMemo(index) {
      this.btnType = "edit";
      this.editMemoContext = this.memos[index].content;
      this.currentIndex = index;
    },
    updateMemo() {
      this.$store.dispatch("updateMemo", {
        index: this.currentIndex,
        newContent: this.editMemoContext,
      });
      this.btnType = "add";
      this.newMemo = "";
    },
    cancelEdit() {    
      this.btnType = "add";
      this.newMemo = "";
    },
    deleteMemo(index) {
      if (confirm("Are you sure you want to delete this memo?")) {
        this.$store.dispatch("deleteMemo", index);
      }
    },
  },
  mounted() {
    document.title = "Memo Management Page";
  },
};
</script>
  
<style scoped>
</style>
  
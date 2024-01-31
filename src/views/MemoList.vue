  <template>
  <div>
    <HeaderComponent   />
    <form v-if="btnType == 'add'" class="form-container" @submit.prevent="addMemo">
      <input type="text" id="memo" v-model="newMemo" required />
      <button type="submit">Add memo</button>
    </form>
    <form v-if="btnType == 'edit'" class="form-container" @submit.prevent="updateMemo">
      <input type="text" id="memo" v-model="editMemoContext" required />
      <button type="submit">Save</button>
      <button @click="cancelEdit" type="button">Cancel</button>
    </form>
    <ul class="memo-list">
      <li v-for="(memo, index) in memos" :key="index">
        <span class="memo-content">{{ memo.content }}</span>
        <a class="edit-link" @click="clickToEditMemo(index)">Edit</a>
        <a class="delete-link" @click="deleteMemo(index)">Delete</a>
      </li>
    </ul>
  </div>
</template>
  
  <script>
  import HeaderComponent from '../components/HeaderComponent.vue';
export default {
  data() {
    return {
      newMemo: "",
      btnType: "add",
      currentIndex: null,
    };
  },
  computed: {
    memos() {
      return this.$store.getters.getAllMemos;
    },
  },
  methods: {
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
  components: {
    HeaderComponent,
  }
};
</script>
  
<style scoped>
.form-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  label {
    margin-bottom: 8px;
  }

  input {
    margin-bottom: 16px;
    margin-top: 16px;
    padding: 5px;
    width: 300px;
  }

  button {
    padding: 8px;
    margin-left: 10px;
    cursor: pointer;
    width: 100px;
    background-color: #5399D9;
    border: none;
    border-radius: 8px;
  }

  .memo-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .memo-list li {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    width: 450px;
  }

  .memo-content {
    border-bottom: 1px solid #000;
    padding-bottom: 5px;
    margin-right: 10px;
    width: 350px;
  }

  .edit-link {
    color: #007bff;
    cursor: pointer;
    margin-right: 10px;
  }

  .delete-link {
    color: #dc3545;
    cursor: pointer;
  }
</style>
  
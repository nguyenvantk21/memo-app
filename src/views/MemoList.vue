  <template>
  <div>
    <HeaderComponent />
    <form
      v-if="btnType == 'add'"
      class="form-container"
      @submit.prevent="addMemo"
    >
      <input
        type="text"
        id="memo"
        v-model="newMemoContent"
        @input="validateMemo(newMemoContent)"
      />
      <button type="submit">Add memo</button>
    </form>
    <form
      v-if="btnType == 'edit'"
      class="form-container"
      @submit.prevent="updateMemo"
    >
      <input
        type="text"
        id="memo"
        v-model="editMemoContext"
        @input="validateMemo(editMemoContext)"
      />
      <button type="submit">Save</button>
      <button @click="cancelEdit" type="button">Cancel</button>
    </form>
    <div v-if="memoError" class="error-message">{{ memoError }}</div>
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
import HeaderComponent from "../components/HeaderComponent.vue";
export default {
  data() {
    return {
      newMemoContent: "",
      btnType: "add",
      currentIndex: null,
      memoError: "",
    };
  },
  computed: {
    memos() {
      return this.$store.getters.getAllMemos;
    },
  },
  methods: {
    validateMemo(memoContent) {
      this.memoError = "";
      const memoLength = memoContent.length;
      if (memoLength > 2000) {
        this.memoError = "Memo content must be less than 2000 characters.";
        return;
      }
    },
    addMemo() {
      if (this.newMemoContent.trim() == "") {
        this.memoError = "Memo content is required.";
        return;
      }
      this.validateMemo(this.newMemoContent);
      if (this.memoError !== "") {
        return;
      }
      this.$store.dispatch("addMemo", { content: this.newMemoContent });
      this.newMemoContent = "";
    },
    clickToEditMemo(index) {
      this.memoError = "";
      this.btnType = "edit";
      this.editMemoContext = this.memos[index].content;
      this.currentIndex = index;
    },
    updateMemo() {
      if (this.editMemoContext.trim() == "") {
        this.memoError = "Memo content is required.";
        return;
      }
      this.validateMemo(this.editMemoContext);
      if (this.memoError !== "") {
        return;
      }
      this.$store.dispatch("updateMemo", {
        index: this.currentIndex,
        newContent: this.editMemoContext,
      });
      this.btnType = "add";
      this.newMemoContent = "";
    },
    cancelEdit() {
      this.btnType = "add";
      this.newMemoContent = "";
      this.memoError = "";
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
  },
};
</script>
  
<style scoped>
.form-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
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
  background-color: #5399d9;
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

.error-message {
  width: 410px;
  color: #ff0000;
  font-size: 12px;
  margin: auto;
}
</style>
  
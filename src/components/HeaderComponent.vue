<template>
  <div v-if="user">
    <div class="welcome-container">
      <div class="welcome-email">Welcome, {{ user.email }}!</div>
      <a @click="logout">Logout</a>
    </div>
  </div>
</template>
  
<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  },
};
</script>
  
<style scoped>
.welcome-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #cccccc;
  margin-bottom: 20px;
  background-color: #9bbde4;
}
</style>
  
<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <h2>Login</h2>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          required
        />
        <div v-if="passwordError" class="error-message">
          {{ passwordError }}
        </div>
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordError: null,
    };
  },
  methods: {
    login() {
      // Login validate
      if (this.password.length < 6 || this.password.length > 20) {
        this.passwordError = "Password must be between 6 and 20 characters.";
        return;
      }
      // Login success
      this.$store.commit("loginUser", {
        email: this.email,
        password: this.password,
      });
      // Redirect MemoList page
      this.$router.push("/memo-list");
    },
  },
  mounted() {
    document.title = 'Login Page';
  },
};
</script>
  
  <style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-form {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.login-form h2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 98%;
  padding: 10px;
  border: 1px solid #0e0d0d;
  border-radius: 4px;
  background-color: #fff;
}

button {
  background-color: #5399D9;
  color: white;
  padding: 10px;
  margin-left: 150px;
  align-items: center;
  width: 100px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
}
</style>
  
<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <h2>Login</h2>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" name="email" />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
        />
        <span v-if="passwordError" class="error-message">
          {{ passwordError }}
        </span>
      </div>

      <button type="submit" :disabled="isDisabled">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: null,
      isDisabled: true,
    }
  },
  watch: {
    email() {
      this.validateEmail()
      this.checkBtnLogin()
    },
    password() {
      this.validatePassword()
      this.checkBtnLogin()
    },
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(this.email)) {
        this.emailError = ''
        return true
      } else {
        this.emailError = 'Invalid email'
        return false
      }
    },
    validatePassword() {
      const passwordLength = this.password.length
      if (passwordLength >= 6 && passwordLength <= 20) {
        this.passwordError = ''
        return true
      } else {
        this.passwordError = 'Password must be between 6 and 20 characters.'
        return false
      }
    },
    checkBtnLogin() {
      if (this.emailError || this.passwordError) {
        this.isDisabled = true
      } else if (!this.email || !this.password) {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    },
    login() {
      // Login validate when click button Login
      this.validateEmail()
      this.validatePassword()
      // Check error
      if (this.emailError !== '' || this.passwordError !== '') {
        return
      }
      this.handleLogin()
    },
    async handleLogin() {
      try {
        const response = await this.$axios.post(
          '/api/login',
          {
            email: this.email,
            password: this.password,
          },
          {
            withCredentials: true,
          },
        )

        this.$store.dispatch('login', {
          email: response.data.email,
        })
        this.$router.push('/')
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error || 'Login failed.')
        } else {
          alert('Server error.')
        }
      }
    },
  },
  mounted() {
    document.title = 'Login Page'
  },
}
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
  background-color: #5399d9;
  color: white;
  padding: 10px;
  margin-left: 150px;
  align-items: center;
  width: 100px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
}
</style>

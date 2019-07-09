<template>
  <v-layout column align-center>
          <h2 class="title">Register!</h2>

          <Notification :message="error" v-if="error"/>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                  prepend-icon="mdi-account"
                  name="email"
                  label="Email"
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  required
                />
            <v-text-field
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  required
                  v-model="password"
                  :rules="passwordRules"
                />
            <v-text-field
                  prepend-icon="mdi-lock"
                  name="confirmedPassword"
                  label="Retype Password"
                  id="confirmedPassword"
                  type="password"
                  required
                  v-model="confirmedPassword"
                  :rules="passwordRules"
                />

              <v-btn :disabled="!valid" @click="register">Register</v-btn>
          </v-form>

          <div class="has-text-centered" style="margin-top: 20px">
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
          </div>
  </v-layout>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  middleware: 'guest',
  components: {
    Notification,
  },

  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmedPassword: '',
      error: null,
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
    }
  },

  methods: {
    async register() {
      try {
        await this.$axios.post('register', {
          username: this.username,
          email: this.email,
          password: this.password
        })

        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          },
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>
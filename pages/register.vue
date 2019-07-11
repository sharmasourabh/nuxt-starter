<template>
  <v-layout column align-center>
    <h2 class="title">Register!</h2>

    <Notification v-if="error" :message="error" />

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        prepend-icon="mdi-account"
        name="email"
        label="Email"
        type="email"
        required
      />
      <v-text-field
        id="password"
        v-model="password"
        :rules="passwordRules"
        prepend-icon="mdi-lock"
        name="password"
        label="Password"
        type="password"
        required
      />
      <v-text-field
        id="confirmedPassword"
        v-model="confirmedPassword"
        :rules="passwordRules"
        prepend-icon="mdi-lock"
        name="confirmedPassword"
        label="Retype Password"
        type="password"
        required
      />

      <v-btn :disabled="!valid" @click="register">Register</v-btn>
    </v-form>

    <div class="has-text-centered" style="margin-top: 20px">
      Already got an account? <nuxt-link to="/login">Login</nuxt-link>
    </div>
  </v-layout>
</template>

<script>
import Notification from "~/components/Notification";

export default {
  middleware: "guest",
  components: {
    Notification
  },

  data() {
    return {
      valid: true,
      lazy: false,
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
      error: null,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"]
    };
  },

  methods: {
    async register() {
      try {
        await this.$axios.post("register", {
          email: this.email,
          password: this.password
        });

        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });

        this.$router.push("/");
      } catch (e) {
        this.error =
          e.response && e.response.data && e.response.data.message
            ? e.response.data.message
            : e;
      }
    }
  }
};
</script>

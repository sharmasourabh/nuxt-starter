<template>
  <section class="section">
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-card-title primary-title>
              <p class="headline mb-0">Login</p>
            </v-card-title>
            <Notification v-if="error" :message="error" />
            <v-card-text>
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
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" @click="login">Log in</v-btn>
            </v-card-actions>
            <v-card-text>
              Don't have an account?
              <nuxt-link to="/register">Register</nuxt-link>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
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
      email: "",
      password: "",
      error: null,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"]
    };
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
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

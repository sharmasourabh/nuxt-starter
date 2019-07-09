<template>
  <section class="section">
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-card-title primary-title>
              <p class="headline mb-0">Login</p>
            </v-card-title>
            <Notification :message="error" v-if="error" />
            <v-card-text>
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
      email: "",
      password: "",
      valid: true,
      error: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
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
        this.$router.push("/");
      } catch (e) {
        this.error = e.response.data.message;
      }
    }
  }
};
</script>
<template>
  <div>
    <v-app-bar class="hidden-sm-and-up" dense fixed clipped-left app>
      <v-app-bar-nav-icon light @click.stop="drawer = !drawer" />
      <span class="center nav_text">
        <v-toolbar-title class="title">NUXTS</v-toolbar-title>
      </span>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      class="hidden-sm-and-up"
      fixed
      clipped
      app
    >
      <v-list>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link to="/" class="nav_link">Home</nuxt-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAuthenticated" link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <nuxt-link to="/profile" class="nav_link">Profile</nuxt-link>
          </v-list-item-title>
        </v-list-item>

        <v-subheader class="mt-3 grey--text text--darken-1 text-uppercase"
          >User</v-subheader
        >

        <v-list-item v-if="!isAuthenticated" link>
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <nuxt-link to="/login" class="nav_link">Login</nuxt-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isAuthenticated" link>
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <nuxt-link to="/register" class="nav_link">Register</nuxt-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-else link>
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <span @click="logout">Logout</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="hidden-xs-only" dense fixed clipped-left app>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">NUXTS</span>
      </v-toolbar-title>
      <nuxt-link to="/" class="nav_link">
        <v-btn text>Home</v-btn>
      </nuxt-link>
      <span v-if="!isAuthenticated"></span>
      <nuxt-link v-else to="/profile" class="nav_link">
        <v-btn text>Profile</v-btn>
      </nuxt-link>

      <v-spacer></v-spacer>
      <v-btn v-if="!isAuthenticated" text large href="/register">
        <v-icon>mdi-account-plus</v-icon><span>Register</span>
      </v-btn>
      <v-btn v-if="!isAuthenticated" text large href="/login">
        <v-icon>mdi-login</v-icon><span>Login</span>
      </v-btn>
      <v-btn v-else text @click="logout">
        <v-icon>mdi-logout</v-icon><span>Logout</span>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Appheader",
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },

  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
};
</script>

<style scoped>
.center {
  width: 80%;
  text-align: center;
}
.nav_link {
  text-decoration: none;
}
</style>

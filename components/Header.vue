<template>
  <div>
    <v-app-bar class="hidden-sm-and-up" dense fixed clipped-left app>
      <v-app-bar-nav-icon light @click.stop="drawer = !drawer"/>
      <span class="center nav_text">
        <v-toolbar-title class="title">CARLESS</v-toolbar-title>
      </span>
    </v-app-bar>

    <v-navigation-drawer class="hidden-sm-and-up" v-model="drawer" fixed clipped app>
      <v-list>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link to="/" class="nav_link">Početna</nuxt-link>
            </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAuthenticated" link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
            <v-list-item-title>
              <nuxt-link to="/profile" class="nav_link">Profil</nuxt-link>
            </v-list-item-title>
        </v-list-item>

        <v-subheader class="mt-3 grey--text text--darken-1 text-uppercase">User</v-subheader>

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
        <span class="title">CARLESS</span>
      </v-toolbar-title>
      <nuxt-link to="/" class="nav_link">
        <v-btn  text>Početna</v-btn>
      </nuxt-link>
      <span v-if="!isAuthenticated"></span>
      <nuxt-link to="/profile" class="nav_link" v-else>
        <v-btn  text>Profil</v-btn>
      </nuxt-link>

      <v-spacer></v-spacer>
      <v-btn text large href="/register" v-if="!isAuthenticated">
        <v-icon>mdi-account-plus</v-icon><span>Register</span>
      </v-btn>
      <v-btn text large href="/login" v-if="!isAuthenticated">
        <v-icon>mdi-login</v-icon><span>Login</span>
      </v-btn>
      <v-btn  @click="logout" text v-else>
        <v-icon>mdi-logout</v-icon><span>Logout</span>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "appheader",
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
<!--template>
  <v-toolbar light>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="white--text"><nuxt-link class="navbar-item" to="/">Nuxt Auth</nuxt-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">Nuxt Auth</nuxt-link>
        <button class="button navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarApp">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div id="navbarApp" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable" v-if="isAuthenticated">
            <a class="navbar-link">
              {{ loggedInUser.username }}
            </a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" to="/profile">My Profile</nuxt-link>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">Logout</a>
            </div>
          </div>
          <template v-else>
            <nuxt-link class="navbar-item" to="/register">Register</nuxt-link>
            <nuxt-link class="navbar-item" to="/login">Log In</nuxt-link>
          </template>
        </div>
      </div>
  </nav>
</template-->

# Nuxt Starter

Nuxt (Vue Framework), Nuxt-Auth, Nuxt-Vuetify

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# Start the mock server
$ cd mock_server && node server.js

# serve with hot reload at localhost:3000
$ npm run dev

# start dev in debug mode in VSCODE
# https://github.com/nuxt/nuxt.js/issues/2734

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate

# e2e Test
# For debug follow https://github.com/avajs/ava/blob/master/docs/recipes/debugging-with-vscode.md
# Run e2e test
$ npm run test

# Linting
# https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c
$ npm run lint
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Tutorial
1. Step by step Tutorial (nuxt + nuxt-auth + Bulma):
  https://scotch.io/tutorials/implementing-authentication-in-nuxtjs-app
2. Bulma is replaced by Vuetify. Pages, layout and components are updated to use `@nuxtjs/vuetify`.\
  *That includes changes in*
    ``` sh
    assets/variables.scss       | 15 ++++
    components/Footer.vue       | 16 +++--
    components/Header.vue       | 163 ++++++++++++++++++++++++++++++++++++++++++++
    components/Navbar.vue       | 48 -------------
    components/Notification.vue | 10 ++-
    layouts/default.vue         | 20 +++---
    nuxt.config.js              | 15 +++-
    package.json                | 1 +
    pages/login.vue             | 109 +++++++++++++++--------------
    pages/register.vue          | 85 +++++++++++------------
    10 files changed, 317 insertions(+), 165 deletions(-)
    ```

### Additional Resources
https://hire.jonasgalvez.com.br/2019/apr/27/nuxt-the-hard-parts/
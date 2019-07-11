module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "nuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      /** Added for bulma
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
      }*/
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
      if (isClient) config.devtool = "eval-source-map";
      else config.devtool = "inline-source-map";
    }
  },

  /** Added modules and other configuration */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],

  devModules: ["@nuxtjs/vuetify"],

  vuetify: {
    // customVariables: ["~/assets/variables.scss"],
    //theme: { },
    //defaultAssets: { font: true, icons: true }
    //preventFullImport: false
  },

  axios: {
    baseURL: "http://127.0.0.1:8888/api/v1"
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "auth/token", method: "post", propertyName: "token" },
          user: { url: "me", method: "get", propertyName: "user" },
          logout: false
        }
      }
    }
  }
};

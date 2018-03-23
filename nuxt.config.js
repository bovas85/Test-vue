const axios = require("axios");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = {
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {
    titleTemplate: titleChunk => {
      // If undefined or blank then we don't need the hyphen
      return titleChunk ? `${titleChunk} - Vodafone` : "Vodafone";
    },
    meta: [
      { charset: "utf-8" },
      {
        hid: "viewport",
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      { name: "msapplication-TileColor", content: "#ffffff" },
      { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
      { name: "theme-color", content: "#ffffff" },
      {
        hid: "description",
        name: "description",
        content:
          "Stay Connected With Vodafone's Most Reliable Network Ever. Brands: Apple, Samsung, Sony, Huawei, LG, BlackBerry, Motorola. Types: Pay Monthly Handsets, Pay As You Go Handsets, SIM Only, Mobile Broadband, Accessories."
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "Apple, Samsung, Sony, Huawei, LG, BlackBerry, Motorola, Pay Monthly Handsets, Pay As You Go Handsets, SIM Only, Mobile Broadband, Accessories"
      },
      { hid: "image", name: "image", content: "/vodafone.png" },
      { hid: "name", itemprop: "name", content: "Vodafone" },
      {
        hid: "description",
        itemprop: "description",
        content: "Vodafone Website"
      },
      { hid: "image", itemprop: "image", content: "" },
      { hid: "twitter:card", name: "twitter:card", content: "summary" },
      { hid: "twitter:title", name: "twitter:title", content: "Vodafone" },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Vodafone Website"
      },
      { hid: "twitter:site", name: "twitter:site", content: "@Vodafone" },
      {
        hid: "twitter:creator",
        name: "twitter:creator",
        content: "@Vodafone"
      },
      { hid: "twitter:image", name: "twitter:image", content: "" },
      { hid: "og:title", name: "og:title", content: "Vodafone" },
      { hid: "og:url", name: "og:url", content: "" },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "Vodafone Website"
      },
      {
        hid: "og:description",
        name: "og:description",
        content: "Vodafone Website"
      },
      { hid: "og:locale", name: "og:locale", content: "en_GB" },
      { hid: "og:type", name: "og:type", content: "website" },
      { hid: "og:image", name: "og:image", content: "" }
    ],
    script: [
      {
        src:
          "https://cdn.polyfill.io/v2/polyfill.js?features=String.prototype.includes,Array.prototype.find,Promise"
      }
    ]
  },
  // enable this if deploying to a subfolder
  // router: {
  //   base: '/voxi-fone/'
  // },
  /* PWA Configuration
  **
  */
  manifest: {
    name: "Vodafone",
    short_name: "Vadafone",
    theme_color: "#e60000"
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    postcss: [
      require("postcss-resemble-image").default,
      require("postcss-responsive-type")()
    ],
    analyze: {
      analyzerMode: "static"
    },
    extend (config, { isDev, isClient }) {
      /*
      ** Run ESLint on save
      */
      if (isDev && isClient) {
        // config.devtool = 'eval-source-map'
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            // fix: true
          }
        });
      }
    }
  },
  css: [
    // node.js module but we specify the pre-processor
    "@/assets/css/main.scss"
  ],
  /*
  ** Customize the progress-bar style
  */
  loading: {
    color: "#002650",
    height: "4px",
    failedColor: "#DF4661"
  },
  /*
  ** Modules
  */
  modules: [
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    // provide path to the file with resources
    ["nuxt-sass-resources-loader", "~/assets/css/variables.scss"]
  ],
  axios: {
    timeout: 5000,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  },
  plugins: [
    "~/plugins/store",
    "~/plugins/v-lazy-image.js",
    { src: "~/plugins/vue-progressive-image.js", ssr: false },
    { src: "~/plugins/vue-media.js", ssr: false },
    { src: "~/plugins/vue-intersect", ssr: false },
    { src: "~/plugins/vue-localstorage.js", ssr: false }
  ]
};

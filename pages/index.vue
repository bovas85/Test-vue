<template>
  <main class="phone-page">

    <div class="container">
      <div class="col col--left col--12-mobile col--6-tablet">
        <img src="" alt="">
      </div>
      <div class="col col--right col--12-mobile col--6-tablet">
        {{ page }}
      </div>
    </div>

  </main>
</template>

<script>
  export default {
    // we can either fetch data here or use nuxtServerInit inside the vuex store
    // using the latter as more performant and able to be cached

    // async fetch ({ app, store, commit }) {
    //   // fetching vuex store before rendering the page
    //   let data = require('~/assets/data/phones.json')
    //   store.commit("setData", data[0]);
    // },
    data () {
      return {
        online: true
      };
    },
    components: {},
    head () {
      return { title: "Home" };
    },
    mounted () {
      // initialising data after component load
      this.init();
    },
    methods: {
      init () {
        // local update if data changes after load
        if (process.browser) {
          // DOM loaded here
          window.onNuxtReady(app => {
            let data = require("~/assets/data/phones.json");
            this.$store.commit("setData", data[0]);
          });
        }
      }
    },
    computed: {
      page () {
        if (this.$store.state.data) {
          return this.$store.state.data;
        } else return [];
      }
    }
  };
</script>

<style lang="scss" scoped>
  .phone-page {
    margin-top: 60px;
    min-height: calc(100vh - 120px); // debug
  }
</style>

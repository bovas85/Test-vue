<template>
  <main class="phone-page">

    <div class="container">
      <div class="col col--left col--12-mobile col--6-tablet">
        <img :src="`/images/`" alt="">
      </div>
      <div class="col col--right col--12-mobile col--6-tablet">
        <h1>{{ currentPhone.displayName }}</h1>
        <p>{{ currentPhone.displayDescription }}</p>
        <i 
          class="fa fa-star"
          v-for="(star, index) in computedStars.rating"
          :key="index"
        ></i>
        <i v-show="computedStars.half" class="fa fa-star-half"></i>
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
        online: true,
        // set some defaults here
        selectedColour: "Space Grey",
        selectedMemory: "64GB"
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
      },
      currentPhone () {
        if (this.page == null) {
          return false;
        }
        return this.page.deviceSummary.find(filters => {
          // return an object of the matching phone
          return (
            filters.colourName === this.selectedColour &&
            filters.memory === this.selectedMemory
          );
        });
      },
      computedStars () {
        if (this.page == null) {
          return 0;
        } else {
          if (this.page.rating % 1 !== 0) {
            // number is float
            return {
              half: true,
              rating: Math.round(this.page.rating)
            };
          } else return { rating: Math.round(this.page.rating) };
        }
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

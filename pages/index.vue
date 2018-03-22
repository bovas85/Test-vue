<template>
  <main class="phone-page">

    <div class="container">
      <div class="col col--left col--12-mobile col--6-tablet">
        <img src="" alt="">
      </div>
      <div class="col col--right col--12-mobile col--6-tablet">
        .data
      </div>
    </div>

  </main>
</template>

<script>
  import Config from "~/assets/config";

  export default {
    async fetch ({ store, commit }) {
      // fetching vuex store before rendering the page
      let { data } = await this.$axios.get(
        Config.wpDomain + Config.api.homePage
      );
      this.$store.commit("setData", data);
    },
    data () {
      return {
        online: true
      };
    },
    components: {
    },
    head () {
      return { title: "Home" };
    },
    mounted () {
      // initialising data after component load
      this.init();
    },
    methods: {
      async init () {
        // if data is not in the vuex store yet, fetch it
        if (!this.$store.state.data) {
          let { data } = await this.$axios.get(
            Config.wpDomain + Config.api.homePage
          );
          this.$store.commit("setData", data);
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
  }
</script>

<style lang="scss" scoped>
  .phone-page {
    margin-top: 60px;
    background: $dark-grey;
    min-height: calc(100vh - 120px); // debug
  }
</style>

<template>
  <div 
    class="app" 
    :class="{'is-offline': $store.state.connection === 'null'}">
    <app-nav/>
    <div 
      class="app-main" 
      :class="{'fixed': $store.state.openModal}">
      <nuxt/>
    </div>
    <cookie-box/>
    <app-footer/>
  </div>
</template>

<script>
  import AppNav from "@/components/Nav/AppNav";
  import AppFooter from "@/components/Footers/AppFooter";

  export default {
    components: {
      AppNav,
      AppFooter,
      CookieBox: () => import("@/components/UI/CookieBox")
    }
  };
</script>

<style lang="scss">
  .fixed {
    overflow: hidden;
    position: fixed;
    z-index: 999;
  }
  .app-main {
    margin: 60px 0;
  }
</style>

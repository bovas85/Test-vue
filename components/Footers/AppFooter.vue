<template>
  <footer class="footer">
    <div 
      v-if="$store.state.current != null" 
      class="footer-section">
      <div 
        v-show="$store.state.window < 1024" 
        class="container main-footer is-hidden-desktop">
        <app-price v-if="$store.state.current != null" />

        <button class="button button--main">Buy Now</button>
      </div> <!-- container -->
    </div> <!-- footer-section -->
  </footer>
</template>

<script>
  export default {
    name: "AppFooter",
    props: {
      mobilenav: {
        type: Boolean,
        default: true
      }
    },
    components: {
      AppPrice: () => import("@/components/UI/AppPrice")
    }
  };
</script>

<style lang="scss" scoped>
  .footer {
    background: white;
    box-shadow: 0 0 3px 1px $grey;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    .footer-section {
      display: flex;
      height: 100%;
      align-items: center;
      .main-footer {
        display: flex;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        @media (min-width: $tablet) {
          padding: 0 15px;
        }
      }
      .button {
        margin-left: auto;
        margin-right: 15px;
      }
    }
  }
</style>

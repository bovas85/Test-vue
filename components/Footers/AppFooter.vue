<template>
  <footer class="footer">
    <div class="footer-section">
      <div class="container is-gapless main-footer"/> <!-- container -->
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
    }
  };
</script>

<style lang="scss" scoped>
  .footer {
    background: pink;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
  }
</style>

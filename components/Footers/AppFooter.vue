<template>
  <footer class="footer">
    <div 
      v-if="$store.state.current != null" 
      class="footer-section">
      <div 
        v-show="$store.state.window < 1024" 
        class="container is-flex main-footer">
        <div class="price">
          <div class="upfront">
            From £
            <span>
              {{ $store.state.current.priceInfo.hardwarePrice.oneOffPrice.gross }}
            </span>
            upfront cost
          </div>
          <div class="monthly">
            When you pay £ 
            <span>
              {{ $store.state.current.priceInfo.bundlePrice.monthlyPrice.gross }}
            </span> a month
          </div>
        </div>

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
        justify-content: space-around;
        align-items: center;
      }
    }
    .price {
      font-weight: 500;
      span {
        font-size: 24px;
        color: $red;
        font-weight: bold;
      }
    }
  }
</style>

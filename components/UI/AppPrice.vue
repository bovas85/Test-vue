<template>
  <div 
    class="price" 
    :class="{'has-bg': hasBg}">
    <div class="upfront">
      From £
      <span class="cost">
        {{ $store.state.current.priceInfo.hardwarePrice.oneOffPrice.gross }}
      </span>
      upfront <span class="hidden-mobile">cost</span>
    </div>
    <div class="monthly">
      <span class="hidden-mobile">When you pay</span> £ 
      <span class="cost">
        {{ $store.state.current.priceInfo.bundlePrice.monthlyPrice.gross }}
      </span> a month
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      hasBg: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="scss" scoped>
  .price {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 15px;
    font-weight: 500;
    font-size: responsive 16px 22px; /* min-size, max-size */
    font-weight: bold;
    @media (min-width: $tablet) {
      flex-direction: row;
      align-items: space-around;
      padding: $gap * 1.5;
    }
    &.has-bg {
      // price on main section with bg
      background: #fafafa;
    }
    .upfront {
      @media (min-width: $tablet) {
        padding-right: $gap;
        margin-right: $gap * 1.5;
        border-right: 1px solid lightgrey;
      }
    }
    .monthly {
      @media (min-width: $tablet) {
        padding-right: $gap;
      }
    }
    .cost {
      font-size: responsive 18px 32px; /* min-size, max-size */
      color: $red;
      font-weight: bold;
    }
  }
</style>

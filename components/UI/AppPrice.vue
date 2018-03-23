<template>
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
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .price {
    width: 100%;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: responsive 18px 22px; /* min-size, max-size */
    font-weight: bold;
    @media (min-width: $desktop) {
      background: #fafafa;
      padding: $gap * 2;
    }
    .upfront {
      padding-right: $gap;
      margin-right: $gap * 1.5;
      border-right: 1px solid lightgrey;
    }
    .monthly {
      padding-right: $gap;
    }
    span {
      font-size: responsive 24px 32px; /* min-size, max-size */
      color: $red;
      font-weight: bold;
    }
  }
</style>

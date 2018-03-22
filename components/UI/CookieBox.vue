<template>
  <div v-show="!hide" class="cookies" :class="{'active': show}">
    <div class="container">
      <p>We use cookies to improve your experience on our website.
        <br>By closing or clicking ‘OK’ you accept our cookies policy</p>
      <button class="button button--main" @click="setCookie()">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieBox',
  data () {
    return {
      hide: true,
      show: false
    }
  },
  mounted () {
    if (this.$localStorage.get('VodafoneCookie') != null) {
      this.hide = true
      this.show = false
    } else {
      setTimeout(() => {
        this.hide = false
        this.show = true
      }, 4000)
    }
  },
  methods: {
    setCookie () {
      this.hide = true
      this.$localStorage.set('VodafoneCookie', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .cookies {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    height: auto;
    z-index: 9999;
    background: #3a3a3a;
    opacity: 0;
    transition: opacity .6s ease-in-out;
    &.active {
      opacity: 1;
    }
    @media (min-width: $tablet) {
      height: 68px;
      padding: 0;
    }
    p {
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 1.1px;
      text-align: left;
      color: #ffffff;
      margin-right: 16px;
      @media (min-width: $tablet) {
        margin: 0;
      }
    }
    button {
      margin-left: auto;
      margin-right: 0;
    }
    .container {
      display: flex;
      height: 100%;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>

<template>
  <div class="phone-page">

    <div class="container">

      <!-- left column (full-width on mobile) -->
      <div 
        v-if="currentPhone != null" 
        class="col col--left col--12-mobile col--6-tablet">
        
        <product-image
          class="product-image"
          v-bind="$attrs"
          :id="currentPhone.merchandisingMedia[0].id"
          :src="currentPhone.merchandisingMedia[0].value"
          :alt="currentPhone.displayName"
        />
        
      </div>

      <!-- right column (full-width on mobile) -->
      <div 
        v-if="currentPhone != null" 
        class="col col--right col--12-mobile col--6-tablet">
        <h1>{{ currentPhone.displayName }}</h1>
        
        <i 
          class="fa fa-star"
          v-for="(star, index) in computedStars.rating"
          :key="index"
        />
        <!-- show half star if rating is float -->
        <i 
          v-show="computedStars.half" 
          class="fa fa-star-half"/>

        <p>{{ currentPhone.displayDescription }}</p>
        

        <div class="settings-section">
          <div class="col col--left">
            <p>Colour: 
              <strong>{{ currentPhone.colourName }}</strong>
            </p>
            <div class="colour-filters">
              <div
                class="filter"
                :class="{'active': colour === selectedColour}"
                @click="selectedColour = colour"
                v-for="(colour, index) in computedColours"
                :key="index"
                :style="`background-color: ${colour}`"
              />
            </div>
          </div>
          <div class="col col--right">
            <p>Capacity: 
              <strong>{{ currentPhone.memory }}</strong>
            </p>
            <div class="memory-filters">
              <div
                class="filter"
                :class="{'active': memory === selectedMemory}"
                @click="selectedMemory = memory"
                v-for="(memory, index) in computedMemory"
                :key="index"
              >
                {{ parseInt(memory) }}
              </div>
            </div>
          </div>
        </div>

        <div class="desktop-price is-hidden-touch">
          <div class="col col--12">
            <app-price 
              has-bg 
              v-if="$store.state.current != null" />
          </div>
          <div class="col col--12">
            <button class="button button--main">Buy Now</button>
          </div>
        </div>
      </div>
    </div>

  </div>
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
        // set some defaults here
        selectedColour: "#232324",
        selectedMemory: 64
      };
    },
    watch: {
      currentPhone () {
        this.$store.commit("setCurrent", this.currentPhone);
      }
    },
    components: {
      ProductImage: () => import("@/components/UI/ProductImage"),
      AppPrice: () => import("@/components/UI/AppPrice")
    },
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
            filters.colourHex === this.selectedColour &&
            parseInt(filters.memory) === this.selectedMemory
          );
        });
      },
      computedColours () {
        // return a set of unique colours from the different phone types
        let colourArray = this.page.deviceSummary.map(colour => colour.colourHex);

        // ES6 function to create a unique set of indexes (removes repeated hex colours)
        // source: https://stackoverflow.com/a/9229821
        return [...new Set(colourArray)];
      },
      computedMemory () {
        // return a set of unique colours from the different phone types
        let memArray = this.page.deviceSummary.map(mem => parseInt(mem.memory));

        // ES6 function to create a unique set of indexes (removes repeated hex colours)
        // source: https://stackoverflow.com/a/9229821
        return [...new Set(memArray)];
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
    // margin-top: 60px;
    // min-height: calc(100vh - 120px);
    overflow: auto;
    @media (min-width: $tablet) {
      margin-top: 60px + $gap;
    }
    .product-image {
      // mobile-first
      height: 100%;
      max-height: 20vh;
      @media (min-width: $tablet) {
        height: 50vh;
        max-height: unset;
      }
    }

    .col {
      padding: $gap $gap / 2 0; // gap is 24px, in variables.scss
      @media (min-width: $tablet) {
        padding: $gap 0;
      }
      &--left {
        width: 20%;
      }
      &--right {
        margin-left: 4%;
        width: 75%;
      }
      @supports (display: grid) {
        &--left {
          width: auto;
        }
        &--right {
          margin-left: 0;
          width: auto;
        }
      }
      &--left {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &--right {
        h1 {
          font-size: responsive 24px 36px;
          font-weight: 400;
          margin-bottom: $gap / 2;
          @media (min-width: $tablet) {
            margin-bottom: $gap;
          }
        }
        p {
          font-size: 18px;
          font-weight: 400;
          padding-bottom: 20px;
          margin-top: $gap / 2;
          @media (min-width: $tablet) {
            margin-top: $gap / 1.5;
          }
        }
        i {
          color: goldenrod;
        }

        .settings-section {
          display: flex;
          margin: $gap / 1.5 auto;
          justify-content: space-around;
          @media (min-width: $tablet) {
            justify-content: flex-start;
          }
          .col {
            padding: 0;
            display: flex;
            flex-direction: column;
            @media (min-width: $tablet) {
              &:first-child {
                margin-right: $gap * 5;
              }
            }
            p {
              align-self: flex-start;
              text-align: left;
            }
          }
          .colour-filters,
          .memory-filters {
            display: flex;
          }
          .filter {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
            margin: 0 5px;
            &.active {
              box-shadow: 0 0 0px 3px white, 0 0 0 5px seagreen;
            }
          }
          .memory-filters,
          .colour-filters {
            .filter {
              cursor: pointer;
              position: relative;
              &:after {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 10px;
                content: "";
                background: rgba(90, 90, 90, 0);
                background: linear-gradient(
                  to bottom,
                  rgba(90, 90, 90, 0) 0%,
                  rgba(90, 90, 90, 0.2) 60%,
                  rgba(90, 90, 90, 0.3) 100%
                );
              }
            }
          }
          .memory-filters {
            .filter {
              background: #fafafa;
            }
          }
        }
      }
    }
  }
</style>

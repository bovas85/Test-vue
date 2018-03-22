<template>
  <main class="phone-page">

    <div class="container">

      <!-- left column (full-width on mobile) -->
      <div class="col col--left col--12-mobile col--6-tablet">
        <product-image
          class="product-image"
          v-bind="$attrs"
          :id="currentPhone.merchandisingMedia[0].id"
          :src="currentPhone.merchandisingMedia[0].value"
          :alt="currentPhone.displayName"
        />
      </div>

      <!-- right column (full-width on mobile) -->
      <div class="col col--right col--12-mobile col--6-tablet">
        <h1>{{ currentPhone.displayName }}</h1>
        <p>{{ currentPhone.displayDescription }}</p>
        <i 
          class="fa fa-star"
          v-for="(star, index) in computedStars.rating"
          :key="index"
        />
        <i 
          v-show="computedStars.half" 
          class="fa fa-star-half"/>

        <section class="settings-section">
          <div class="col col--left">
            <p>Colour:</p>
            <div class="colour-filters">
              <div
                class="filter"
                v-for="(colour, index) in computedColours"
                :key="index"
                :style="`background-color: ${colour}`"
              />
            </div>
          </div>
          <div class="col col--right">
            <p>Capacity:</p>
            <div class="memory-filter"/>
          </div>
        </section>
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
    components: {
      ProductImage: () => import("@/components/UI/ProductImage")
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
            filters.colourName === this.selectedColour &&
            filters.memory === this.selectedMemory
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
    min-height: calc(100vh - 120px);

    .product-image {
      // mobile-first
      height: 100%;
      max-height: 40vh;
    }

    .col {
      padding: $gap $gap / 2 0; // gap is 24px, in variables.scss
      &--left {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &--right {
        h1 {
          font-size: 24px;
          font-weight: bold;
        }
        p {
          font-size: 18px;
          font-weight: 400;
          padding-bottom: 20px;
        }
        i {
          color: goldenrod;
        }

        .settings-section {
          display: flex;
          justify-content: space-between;
          .col {
            display: flex;
            flex-direction: column;
          }
          .colour-filters {
            display: flex;
          }
          .filter {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
            margin: 0 5px;
            &.active {
              box-shadow: 0 0 0px 3px white, 0 0 0 5px seagreen;
            }
          }
        }
      }
    }
  }
</style>

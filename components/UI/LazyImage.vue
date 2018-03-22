<template>
  <div 
    v-if="image != null && image" 
    class="lazy-image" 
    @click="clickIt" 
    :class="{'blog': type === 'post', 'home': home, 'hover-disabled': !hover}"
  >
    <no-ssr>
      <vue-media :query="{maxWidth: 576}">
        <progressive-img
          :src="image.small"
          @onLoad.once="imageLoaded"
          @onError="capture($event)"
          :placeholder="thumbnail"
          no-ratio
          :blur="15"
        />
      </vue-media>
    </no-ssr>
    <no-ssr>
      <vue-media :query="({minWidth: 577, maxWidth: 1200})">
        <progressive-img
          :src="image.medium"
          @onLoad.once="imageLoaded"
          @onError="capture($event)"
          :placeholder="thumbnail"
          no-ratio
          :blur="15"
        />
      </vue-media>
    </no-ssr>
    <no-ssr>
      <vue-media :query="({minWidth: 1201, maxWidth: 1920})">
        <progressive-img
          :src="getImage ? getImage : image.large"
          @onLoad.once="imageLoaded"
          @onError="capture($event)"
          :placeholder="thumbnail"
          no-ratio
          :blur="15"
        />
      </vue-media>
    </no-ssr>
    <no-ssr>
      <vue-media :query="{minWidth: 1921}">
        <progressive-img
          :src="getImage ? getImage : image.ultra"
          @onLoad.once="imageLoaded"
          @onError="capture($event)"
          :placeholder="thumbnail"
          no-ratio
          :blur="15"
        />
      </vue-media>
    </no-ssr>
    <div class="text-container">
      <!-- <p v-show="type === 'post' && title" class="text-heading">Experience</p> -->
      <nuxt-link 
        v-if="link && title" 
        :to="type === 'post' ? `/journal/${link}` : link" 
        class="text" 
        v-html="title"/>
      <p 
        v-show="type === 'post' && title" 
        class="text-subheading">Read More</p>
    </div>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: "LazyImage",
    props: {
      image: {
        type: Object,
        default: () => {
          return {
            thumbnail: "https://placehold.it/40x40",
            small: "https://placehold.it/400x400",
            medium: "https://placehold.it/600x600",
            large: "https://placehold.it/1920x1080"
          };
        }
      },
      title: {
        type: String,
        default: ""
      },
      link: {
        type: Boolean,
        Object,
        String,
        default: false
      },
      type: {
        type: String,
        default: ""
      },
      home: {
        type: Boolean,
        Object,
        default: false
      },
      isThumb: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: true
      },
      destination: {
        type: Boolean,
        default: false
      },
      event: {
        type: String,
        default: null
      }
    },
    methods: {
      capture (event) {
        return false;
      },
      imageLoaded (event) {
        if (!this.destination) {
          // console.log("image loaded", event);
          this.$store.commit("removeLoader");
        }
      },
      clickIt () {
        if (this.link && this.event == null) {
          if (this.$route.path === this.link) {
            window.location.reload();
          } else {
            this.$store.commit("routeTransition");
            let link =
              this.type === "post" ? `/journal/${this.link}` : `/${this.link}`;
            this.$router.push(link);
          }
        } else if (!this.link && this.event) {
          // emit AppCarousel click event
          this.$root.$emit("clicked", this.event);
        }
      }
    },
    computed: {
      getImage () {
        if (this.isThumb) {
          return this.image.small;
        } else if (
          this.$store.state.connection === "cellular" ||
          this.$store.state.connection === "other"
        ) {
          return this.image.medium;
        } else return false;
      },

      thumbnail () {
        if (this.image != null) {
          return this.image.thumbnail;
        } else return "https://placehold.it/150x150";
      }
    }
  };
</script>

<style lang="scss">
  .lazy-image {
    height: 100%;
    width: 100%;
    position: relative;
    cursor: pointer;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0);
      transition: all 0.3s ease-in-out;
    }
    .text-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      text-align: center;
      z-index: 101;
      transition: all 0.3s ease-in-out;
      @media (max-width: $mobile) {
        opacity: 1 !important;
      }
      .text {
        font-size: 52px;
        line-height: 1;
        text-align: center;
        pointer-events: none;
        text-transform: uppercase;
        font-weight: 300;
        text-decoration: none;
        border: none;
        color: rgba(255, 255, 255, 0.5);
      }
      &:hover {
        color: white;
      }
    }
    &:hover {
      .text-container {
        opacity: 1;
      }
      &:before {
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.25);
      }
      img {
        transform: scale(1.05);
      }
    }
    &.hover-disabled {
      &:before {
        transition: all 0.3s ease-in-out;
      }
      &:hover {
        .text-container {
          opacity: 1;
        }
        &:before {
          display: none;
        }
        img {
          transform: scale(1);
        }
      }
    }
    &.home {
      &:before {
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.25);
      }
      &:hover {
        .text-container {
          opacity: 0;
        }
        img {
          transform: none;
        }
      }
      img {
        object-position: right;
        @media (min-width: $tablet) {
          animation: zoomIn infinite;
          animation-duration: 60s;
          backface-visibility: hidden;
          transform: translateZ(0);
          perspective: 1000px;
          will-change: transform;
          transition: opacity 1.3s;
          &:hover {
            .overlay {
              opacity: 0;
            }
            img {
              transform: none;
            }
          }
        }
      }
    }

    &.blog {
      .text-container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .text-heading {
          font-size: 16px;
          line-height: 1.38;
          letter-spacing: 0.2px;
          font-weight: 400;
          text-align: center;
          color: white;
          text-transform: uppercase;
          padding-bottom: 0;
        }
        .text-subheading {
          font-size: 16px;
          line-height: 1.38;
          letter-spacing: 0.2px;
          font-weight: 400;
          text-align: center;
          color: white;
          text-transform: uppercase;
          padding-bottom: 0;
          position: relative;
          margin-top: 10px;
          &:before {
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            content: "";
            background: white;
            height: 2px;
            width: 50px;
          }
        }
        .text {
          font-size: 28px;
          line-height: 1.18;
          letter-spacing: 0.3px;
          font-weight: 400;
          opacity: 0.5;
          text-align: center;
          text-transform: uppercase;
          color: white;
        }
      }
    }
    img {
      transition: transform 0.6s ease-in-out;
    }
  }
  .progressive-image,
  .progressive-image-wrapper {
    height: 100%;
    object-fit: cover;
    .progressive-image-main {
      height: 100% !important;
      object-fit: cover;
      object-position: center;
    }
    .progressive-image-placeholder {
      background-size: cover;
      background-position: center;
    }
    .progressive-image-wrapper {
      overflow: hidden;
    }
  }
  @keyframes zoomIn {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
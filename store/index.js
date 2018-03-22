import Vuex from "vuex";
import axios from "axios";
const api = axios.create();
let arr = [];

/**
 * This is the secret sauce.
 * If the data being requested is cached, subsequent API calls will not be made
 * During a nuxt generate, nuxtServerInit will be called for every page
 * Because of this caching, the API calls will only be done once
 *
 */
function cacheData () {
  if (!arr.length) {
    console.log("Running API calls, no cache");
    // if cache doesn't exist, get the data from the API and cache it
    let data = require("~/assets/data/phones.json");
    arr = data;
    return data;
  } else {
    console.log("Using cached API calls");
    return arr;
  }
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      data: [],
      mobileNavOpen: false,
      navOpen: false,
      modalOpen: false,
      searchOpen: false,
      lazyloaded: false,
      routeTransition: true,
      window: 320,
      connection: null
    },
    mutations: {
      setData (state, obj) {
        state.data = obj;
      },
      resetMenus (state) {
        state.modalOpen = false;
        state.navOpen = false;
        state.searchOpen = false;
        state.mobileNavOpen = false;
        state.destinationMenu = false;
        state.destinationSubMenu = false;
      },
      removeLoader (state) {
        setTimeout(() => {
          state.lazyloaded = true;
          state.limit = state.destinations.length;
        }, 1500);
        state.routeTransition = false;
      },
      routeTransition (state) {
        state.limit = 1;
        state.routeTransition = true;
        state.lazyloaded = false;
      },
      windowResize (state, size) {
        state.window = size;
      },
      setConnection (state, type) {
        state.connection = type;
      },
      closeMenu (state) {
        state.navOpen = false;
        state.modalOpen = false;
      },
      openMenu (state) {
        state.navOpen = true;
        state.modalOpen = true;
      }
    },
    actions: {
      async nuxtServerInit ({ commit }) {
        const cache = await cacheData();
        commit("setData", cache[0]);
      }
    }
  });
};

export default createStore;

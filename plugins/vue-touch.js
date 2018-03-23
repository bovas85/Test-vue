import Vue from "vue";
import VueTouch from "vue-touch";
VueTouch.config.swipe = {
  direction: "horizontal"
};
Vue.use(VueTouch, { name: "v-touch", direction: "horizontal" });

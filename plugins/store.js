import Vue from "vue";
import startsWith from "lodash/startsWith";
import Config from "~/assets/config";

Vue.mixin({
  mounted () {
    // avoid mounted as it runs every component load (not page load)
  },
  methods: {
    // route navigation utility or external link validation
    navigateTo (url) {
      if (startsWith(url, "http")) {
        window.open(url);
      } else {
        // console.log('navigating to', url)
        this.$router.push({ path: url });
      }
    },
    isObject (o) {
      return o instanceof Object && o.constructor === Object;
    },
    getTimeNow () {
      return `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    },
    // utility for rendered html from WordPress
    breakIt (text) {
      return text.replace(/\n\r/g, "<br /><br />");
    },
    // route navigation utility
    goTo (url) {
      if (url != null && url !== "undefined" && url !== "") {
        this.$router.push(url);
      }
    },
    validateEmail (email) {
      var validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|co|it|xyz|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/i; // email regex
      if (validEmail.test(email)) {
        return true;
      } else return false;
    },
    // gets date in short suffix format
    getDate (string) {
      var date = new Date(string);
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let nth = n => {
        return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th";
      };
      var day = date.getDate();
      day += nth(day); // add suffix to day
      var monthIndex = date.getMonth();
      return monthNames[monthIndex] + " " + day;
    },
    markdown (text) {
      // markdown converter for bold text
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\*(.*?)\*/g, "<strong>$1</strong>");
    },
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
});

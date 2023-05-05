import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'

Vue.config.productionTip = false
//禁止某些页面分享
let share = require("../utils/share");
Vue.mixin(share);

import store from "./store/index";
Vue.prototype.$store = store;
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()

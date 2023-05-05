import Vue from "vue";

import Vuex from "vuex";
import { setStorege, removeStorage } from "../../utils/index";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //公共的变量，这里的变量不能随便修改，只能通过触发mutations的方法才能改变
    hasLogin: false,
    userInfo: {},
  },
  mutations: {
    //相当于同步的操作
    login(state, userInfo) {
      state.userInfo = userInfo;
      state.hasLogin = true;
      setStorege("userInfo", userInfo);
    },
    loginOut(state) {
      state.userInfo = {};
      state.hasLogin = false;
      removeStorage("userInfo");
    },
  },

  actions: {
    //相当于异步的操作,不能直接改变state的值，只能通过触发mutations的方法才能改变
    test(ctx) {
      ctx.commit("login", {});
      // ctx.dispatch('other actions');
    },
  },
});
export default store;

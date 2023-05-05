<script>
import { mapMutations } from "vuex";
export default {
  globalData: {
    hasAuth: false,
  },
  methods: {
    ...mapMutations(["login"]),
  },
  onLaunch: function () {
    console.log("App Launch");
    let userInfo = uni.getStorageSync("userInfo");
    if (userInfo) {
      this.login(userInfo);
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
</style>

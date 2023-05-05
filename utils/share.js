module.exports = {
  onLoad() {
    // 设置默认的转发参数
    share: {
      title: ""; // 默认为小程序名称
      path: ""; // 默认为当前页面路径
      imageUrl: ""; // 默认为当前页面的截图
    }
    //白名单
    const urlList = [
      "pages/index/Index",
      "pages/document/Document",
      "pages/video/Video",
      "pages/about/About",
      "pages/invitation/Invitation",
    ];
    //获取路由信息
    const pages = getCurrentPages();
    //获取当前路由
    let nowPage = pages[pages.length - 1];
    //判断路由包含‘takeoutPackageA’标识的同时不包含有白名单的路由就禁用
    if (!urlList.includes(nowPage.route)) {
      uni.hideShareMenu();
    }
  },
  //分享好友
  onShareAppMessage() {
    return this.share;
  },
  // #ifdef MP-WEIXIN
  //朋友圈
  onShareTimeline() {
    return this.share;
  },
  // #endif
};

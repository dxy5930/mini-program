import axios from "axios";
import qs from "qs";
import Vue from "vue";
import settle from "axios/lib/core/settle";
import buildURL from "axios/lib/helpers/buildURL";

let baseURL = "https://www.inhandle.com/config/pocket/release";

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV != "production") {
  baseURL = "https://www.inhandle.com/config/pocket/staging";
}
const service = axios.create({
  withCredentials: true,
  crossDomain: true,
  baseURL: baseURL, //这个baseURL是我在main.js下配置的请求url
  timeout: 6000,
});

service.interceptors.request.use(
  (config) => {
    try {
    //   uni.showNavigationBarLoading();
    //   uni.showLoading({
    //     title: "正在加载...",
    //   });
      const token = uni.getStorageSync("token");
      if (token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.authorization = token; //Authorization是登录接口返回
      }
      config.headers["Content-Type"] =
        config.method.toLocaleLowerCase() === "post"
          ? "application/x-www-form-urlencoded"
          : "application/json";
      return config;
    } catch (e) {
    //   uni.hideNavigationBarLoading();
    //   uni.hideLoading();
      uni.showToast({
        title: "发生错误，请稍后重试",
        position: "center",
        icon: "none",
        duration: 2000,
      });
    }
  },
  (err) => {
    // uni.hideNavigationBarLoading();
    // uni.hideLoading();
    return Promise.reject(err);
  }
);
// http response 拦截器
service.interceptors.response.use(
  (response) => {
    //拦截响应，做统一处理
    // if (response.data.status != 200) {
    // 	uni.showToast({
    // 		title: response.data.msg,
    // 		icon: "none",
    // 		duration: 2000
    // 	})

    // }
    // uni.hideNavigationBarLoading();
    // uni.hideLoading();
    return response;
  },
  //接口错误状态处理，也就是说无响应时的处理
  (error) => {
    // uni.hideNavigationBarLoading();
    // uni.hideLoading();
    // const {
    // 	response: {
    // 		status: status,
    // 		errMsg: statusText,
    // 		data: {
    // 			message
    // 		}
    // 	}
    // } = error;
    const token = uni.getStorageSync("token");
    // if (status == 401 && token) { // 登录过期处理
    // 	uni.clearStorageSync()
    // 	uni.showToast({
    // 		title: '登录已过期，请重新登录',
    // 		icon: 'none',
    // 		duration: 2000
    // 	})
    // } else {
    // 	uni.showToast({
    // 		title: `请求错误，请稍后重试`,
    // 		position: 'center',
    // 		icon: 'none',
    // 		duration: 2000
    // 	})
    // 	console.error(`请求错误${status||''}：${statusText||message||''}`)
    // }
    return Promise.reject(error); // 返回接口返回的错误信息
  }
);

axios.defaults.adapter = function (config) {
  //自己定义个适配器，用来适配uniapp的语法
  return new Promise((resolve, reject) => {
    // console.log(config)
    uni.request({
      method: config.method.toUpperCase(),
      url:
        config.baseURL +
        buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response?.data,
          status: response?.statusCode,
          errMsg: response?.errMsg,
          header: response?.header,
          config: config,
        };
        settle(resolve, reject, response);
      },
    });
  });
};
export default service;

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./AppH5";
import router from "./router";
import store from "./store";
import Vant from "vant";
import { Dialog, Toast } from "vant";
import "vant/lib/index.css";
//封装Axios
import Axios from "axios";
Axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Dialog);
Vue.prototype.globalData = {};
Vue.mixin({
  data() {
    return {
      router: "/", // 路由路径
      imgSrc: "", // 图片路径
      global: {},
      projectUrl: "http://salter.peyesight.cn/server/"
    };
  },
  methods: {
    //001 获取路由参数
    newroot() {
      return this.$route;
    },
    //002保留当前页面，跳转到应用内的某个页面
    navigateTo(url) {
      this.$router.push(url);
    },

    //003关闭当前页面，跳转到应用内的某个页面
    redirectTo(url) {
      this.$router.replace(url);
    },
    //004 弹出框
    alert(msg, fn) {
      Dialog.alert({
        title: "提示",
        message: msg
      }).then(() => {
        if (fn != null) {
          fn();
        }
      });
    },
    //005 loading
    showLoading() {
      this.global.loading = Toast.loading({
        //	是否显示背景蒙层
        mask: true,
        //持续时间
        duration: 0,
        //是否显示遮罩层
        mask1: false,
        //禁止背景点击
        forbidClick: true,
        message: "加载中..."
      });
    },
    //006取消loading
    hideLoading() {
      this.global.loading.clear();
    },
    //007确认框
    confirm(msg, sucessFn, errorFn) {
      Dialog.confirm({
        title: "提示",
        message: msg
      })
        .then(() => {
          // on confirm
          sucessFn();
        })
        .catch(() => {
          // on cancel'
          if (errorFn != null) {
            errorFn();
          }
        });
    },
    //008 post请求，携带loading
    post(obj) {
      this.showLoading();
      return new Promise((resolve, reject) => {
        Axios.post(this.projectUrl + obj.url, obj.data).then(
          response => {
            this.hideLoading();
            resolve(response.data);
          },
          err => {
            this.hideLoading();
            console.log("=============error");
          }
        );
      });
    },
    //009 post2请求，不携带loading
    post2(obj) {
      return new Promise((resolve, reject) => {
        Axios.post(this.projectUrl + obj.url, obj.data).then(
          response => {
            resolve(response.data);
          },
          err => {
            console.log("=============error");
          }
        );
      });
    },

    //010 通过openid登录
    openIdLogin(fn) {
      if (fn != null) {
        fn();
      }
    },
    //011 保存formId
    saveFormId(e) {
      console.log("==============sssssss");
    },
    isNull(text) {
      if (undefined == text) {
        return true;
      }
      if (null == text) {
        return true;
      }
      if (text.length == "" || text.length == 0) {
        return true;
      }
      return false;
    },
    //保存打开小程序日志
    saveWxAPPOpenLog() {
      this.post2({
        url: "/wx_app/open_log/save",
        data: {
          openid: this.globalData.openid,
          activeId: this.globalData.activeId,
          appid: this.globalData.appid,
          remark: this.newroot().query,
          source: this.globalData.source,
          mediaCp: this.newroot().query.media_cp,
          mediaPl: this.newroot().query.media_pl,
          mediaMd: this.newroot().query.media_md
        }
      }).then(data => {});
    }
  },
  created() {}
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  store
});

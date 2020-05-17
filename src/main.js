import Vue from "vue";
import App from "./App";
import store from "./store";
import bottom from "./components/bottom.vue";
import "./utils/storage";

Vue.component("v-bottom", bottom);

Vue.config.productionTip = false;
App.mpType = "app";
Vue.prototype.$store = store;

Vue.mixin({
  data() {
    return {
      router: "/",
      imgSrc: "/",
      projectUrl: "https://dev.peyesight.cn/server/",
      appEnName: "se",
      exchangeText:"锦鲤"
    };
  },
  methods: {

    flushGameNum(){
      this.post({
        url: "/salter/user/flushGameNum",
        data: { userId:this.globalData.user.id,isAnswer:this.globalData.user.isAnswer,isGuess:this.globalData.user.isGuess,isWatering:this.globalData.user.isWatering }
      }).then(res => {
        console.log(res)
      });
    },
    checkBannerResource(fun){
      this.post2({
        url: "/salter/ad/checkBannerResource",
        data: {  }
      }).then(res => {
        if(res.success){
          fun();
        }
        console.log(res)
      });
    },
    checkVideoResource(fun){
      this.post({
        url: "/salter/ad/checkVideoResource",
        data: {  }
      }).then(res => {
        if(res.success){
          fun();
        }
      });
    },

    monitorAdVideoEv(){
      this.post({
        url: "/salter/ad/monitorAdVideoEv",
        data: {  userId: this.globalData.user.id }
      }).then(res => {
      });
    },
    monitorAdVideo() {
      this.post({
        url: "/salter/ad/monitorAdVideo",
        data: { path: this.globalData.path, userId: this.globalData.user.id,activeId:this.globalData.active.id }
      }).then(res => {
      });
    },
    lookVideoReward(fun) {
      this.post({
        url: "/salter/ad/lookVideoReward",
        data: { userId: this.globalData.user.id }
      }).then(res => {
        fun()
        console.log(res)
      });
    },
    //001 获取路由参数
    newroot() {
      return this.$root.$mp;
    },
    //002保留当前页面，跳转到应用内的某个页面
    navigateTo(url) {
      wx.navigateTo({ url: url });
    },
    //003关闭当前页面，跳转到应用内的某个页面
    redirectTo(url) {
      wx.redirectTo({ url: url });
    },
    reLaunch(url) {
      wx.reLaunch({ url: url });
    },
    gotoPage(page) {
      wx.navigateTo({
        url: page
      });
    },
    //004弹出框
    alert(msg, fn) {
      wx.showModal({
        title: "提示",
        showCancel: false,
        content: msg,
        getUserAfter: null,
        success(res) {
          if (fn != null) {
            fn();
          }
        }
      });
    },
    //005 loading
    showLoading() {
      wx.showLoading({
        title: "加载中...",
        mask: true
      });
    },
    //006取消loading
    hideLoading() {
      wx.hideLoading();
    },
    //007确认框
    confirm(msg, sucessFn, errorFn) {
      wx.showModal({
        title: "提示",
        content: msg,
        success(res) {
          if (res.confirm) {
            sucessFn();
          } else if (res.cancel) {
            if (errorFn != null) {
              errorFn();
            }
          }
        }
      });
    },
    //008 post请求，携带loading
    post(obj) {
      this.showLoading();
      var this_ = this;
      return new Promise((resolve, reject) => {
        wx.request({
          url: this.projectUrl + obj.url,
          method: "POST",
          data: obj.data,
          headers: {
            "content-type": "application/x-www-form-urlencoded" // 默认值
          },
          success: function(res) {
            this_.hideLoading();
            resolve(res.data);
          },
          fail: function(res) {
            this_.hideLoading();
          },
          complete: function() {
            this_.hideLoading();
          }
        });
      });
    },
    //009 post2请求，不携带loading
    post2(obj) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: this.projectUrl + obj.url,
          method: "POST",
          data: obj.data,
          headers: {
            "content-type": "application/x-www-form-urlencoded" // 默认值
          },
          success: function(res) {
            resolve(res.data);
          },
          fail: function(res) {
          },
          complete: function() {
          }
        });
      });
    },

    //010 通过openid登录
    openIdLogin(fn) {
      this.getUserAfter = null;
      //设置获取用户成功后的方法
      this.getUserAfter = fn;
      //登录
      this.refreshOpenId(this.getUser);
    },
    //011 保存formId
    saveFormId(e) {
      var formId = e.mp.detail.formId;
      this.post2({
        url: "/wx_app/form_id/save",
        data: {
          appid: this.globalData.appid,
          formId: formId,
          openid: this.globalData.openid
        }
      }).then(data => {
      });
    },
    //012
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
    //013 刷新openid
    refreshOpenId(fn) {
      var _this = this;
      wx.login({
        success(res) {
          _this
            .post({
              url: "/wx_app/wx_user/get_open_id",
              data: { code: res.code, appEnName: _this.appEnName }
            })
            .then(data => {
              _this.globalData.openid = data.openid;

              _this.globalData.appid = data.appid;
              _this.globalData.unionid = data.unionid;
              _this.globalData.sessionKey = data.session_key;
              if (fn != null) {
                fn();
              }
            });
        }
      });
    },
    //获取用户
    getUser() {
      this.post({
        url: "/wx_app/wx_user/save",
        data: {
          iv :this.globalData.iv,
          sessionKey :this.globalData.sessionKey,
          encryptedData :this.globalData.encryptedData,
          openid: this.globalData.openid,
          appid: this.globalData.appid,
          unionid: this.globalData.unionid,
          source: this.globalData.source,
          shareUserId: this.globalData.shareUserId,
          mediaCp: this.newroot().query.media_cp,
          mediaPl: this.newroot().query.media_pl,
          mediaMd: this.newroot().query.media_md,
          wxAppActiveId: this.globalData.activeId
        }
      }).then(data => {
        if (data.success) {
          this.globalData.user = data.user;
          if (this.getUserAfter != null) {
            this.getUserAfter(data.user);
          }
        } else {
          this.alert(data.msg);
        }
      });
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
      }).then(data => {
      });
    },
    //保存操作日志
    saveOperationLog(log) {
      log.appid = this.globalData.appid;
      log.openid = this.globalData.openid;
      log.activeId = this.globalData.activeId;

      this.post2({
        url: "/wx_app/operation_log/save",
        data: log
      }).then(data => {
      });
    },
    isIphoneX() {
      try {
        const res = wx.getSystemInfoSync();
        if (res.model == "iPhone X") {
          return true;
        }
      } catch (error) {
      }

      return false;
    },
    getButtonBottom() {
      if (this.isIphoneX()) {
        return "12%";
      }

      const res = wx.getSystemInfoSync();
      var height = res.windowHeight;
      var width = res.windowWidth;
      var hw = height / width;
      if (hw < 1.6) {
        console.log("=============1");
        return "6.5%";
      }
      return "9%";
      // if (height < 800 && height > 750) {
      //   console.log("=============2");
      //   return "9%";
      // }
      // if (height > 800) {
      //   console.log("=============3");
      //   return "10%";
      // }
      console.log("=============4");
      return "6.5%";
    }
  },

  created() {
  }
});

const app = new Vue(App);
app.$mount();

Vue.prototype.globalData = getApp().globalData;

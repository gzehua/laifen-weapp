<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      model:{}
    };
  },
  methods: {
    getUserInfo() {
      var _this = this;
      wx.getSetting({
        success(res) {
          var getUserFlag = res.authSetting["scope.userInfo"];
          if (!getUserFlag) {
            _this.openIdLogin(_this.loginSuccessAfter);
            // _this.alert("需要获取您的信息才可参加活动");
          } else {
            _this.getUserInfoBegin();
          }
        }
      });
    },
    getUserInfoBegin() {
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
              wx.getUserInfo({
                success(res) {
                  _this.getWxUserAfter(res);
                },
                fail(res) {
                  _this.getWxUserAfter(null);
                }
              });
            });
        }
      });
    },
    getWxUserAfter(res) {
      if (res == null) {
        this.alert("获取用户信息失败");
      } else {
        console.log(res)
        this.globalData.iv =res.iv;
        this.globalData.encryptedData =res.encryptedData;
        this.loginSuccessAfter();
        this.getUser();
      }
    },
    loginSuccessAfter(user) {
      this.post({
        url: "/wx_app/active/get_by_id",
        data: { id: this.globalData.activeId }
      }).then(data => {
        //this.saveWxAPPOpenLog();
        if (data.success) {
          this.globalData.active = data.data;
          this.redirectTo("/pages/index/main");
        } else {
          this.alert("活动信息加载失败，失败原因：" + data.data);
        }
      });
    }
  },

  mounted() {
	this.globalData.enable = 0;
    if (!this.isNull(this.newroot().query.scene)) {
      this.redirectTo(
        "/pages/home/main?" + unescape(this.newroot().query.scene)
      );
      return;
    }
    if (this.isNull(this.newroot().query.u)) {
      this.globalData.isShare = 0;
      this.globalData.source = this.newroot().query.source;
      this.globalData.activeId = this.newroot().query.active_id;
    } else {
      this.newroot().query.active_id = this.newroot().query.a;
      this.globalData.shareUserId = this.newroot().query.u;
      this.globalData.isShare = 1;
      this.globalData.source = "share";
      this.globalData.activeId = this.newroot().query.a;
    }
    if (this.isNull(this.newroot().query.a)) {
      this.globalData.activeId = 1;
    }
    if (this.isNull(this.globalData.activeId)) {
      this.globalData.activeId = 1;
    }

    this.openIdLogin(this.loginSuccessAfter);
  }
};
</script>


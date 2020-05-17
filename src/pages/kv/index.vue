<template>
  <div style="width:100%;height:100%;" :style="{'background-color':active.color1}">
    <div style="width:100%;height:100%;postion:fixed;">
      <img
        :src="active.homeImg"
        style="width:100%;position:absolute;height:100%;"
        mode="aspectFit"
      >

      <div
        style="text-align: center;position:fixed;width:100%;border:0px;"

      >
        <!--<button-->
          <!--open-type="getUserInfo"-->
          <!--style="width:50%;padding:0;line-height:0;background-color:transparent;border:none;"-->
          <!--plain="true;"-->
          <!--@getuserinfo="getUserInfo"-->
        <!--&gt;-->
          <!--<img-->
            <!--src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/kv_button.png"-->
            <!--style="width:100%;"-->
            <!--mode="widthFix"-->
          <!--&gt;-->
        <!--</button>-->

        <button
          style="width:50%;padding:0;line-height:0;background-color:transparent;border:none;"
          plain="true;"
          @click="apply"
        >
          <img
            src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/tvc618/app/product_detail_button.png"
            style="width:100%;"
            mode="widthFix"
            lazy-load="true"
          />

        </button>
      </div>
    </div>
  </div>
</template>
<style>
page {
  height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      active: {},
      model: {},
      phone: "",
      buttonBottom: "5px"
    };
  },

  components: {},

  methods: {
    getLog() {
      return { pageName: "520引导页", operation: "页面加载完成" };
    },
    apply(){
      this.redirectTo("/pages/apply_info/main");
    },
    getWxUserAfter(userInfo) {
      if (userInfo == null) {
        this.alert("获取用户信息失败");
      } else {
        this.model.id = this.globalData.user.id;
        this.model.userName = userInfo.nickName;
        this.globalData.user.userName = userInfo.nickName;
        this.post({
          url: "/wx_app/wx_user/enable_user_by_name",
          data: this.model
        }).then(data => {
          if (data.success) {
            this.phone = data.data;
            this.redirectTo("/pages/dt1520_label1/main");
          } else {
            this.alert(data.data);
          }
        });
      }
    },
    getUserInfoBegin() {
      var _this = this;
      wx.getUserInfo({
        success(res) {
          const userInfo = res.userInfo;
          _this.globalData.wxUser = userInfo;
          _this.getWxUserAfter(userInfo);
        },
        fail(res) {
          _this.getWxUserAfter(null);
        }
      });
    },
    getUserInfo() {
      var _this = this;
      wx.getSetting({
        success(res) {
          var getUserFlag = res.authSetting["scope.userInfo"];
          if (!getUserFlag) {
            // _this.alert("需要获取您的信息才可参加活动");
            _this.redirectTo("/pages/dt1520_label1/main");
          } else {
            _this.getUserInfoBegin();
          }
        }
      });
    }
  },
  mounted() {
    var log = this.getLog();
    this.saveOperationLog(log);
  },
  onShow() {
    this.active = this.globalData.active;
    if (this.isIphoneX()) {
      this.buttonBottom = "50px";
    }
  }
};
</script>


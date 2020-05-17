<template>
  <div>
    <img
      :src="'https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/'+bgColor+'_bg.png'"
      style="position:fixed;z-index:-10;width:100%;height:100%;"
    >
    <div style="position:absolute;width:100%;height:100%;">
      <!--form文字图片-->
      <img
        src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/from_.png"
        style="width:65%;position:fixed;top:10%;left:13%;"
        mode="widthFix"
      >
      <!--To文字图片-->
      <img
        src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/to_.png"
        style="width:65%;position:fixed;top:26%;left:13%;"
        mode="widthFix"
      >
      <input
        type="text"
        v-model="fromName"
        placeholder="输入用户名"
        class="inputBig"
        style="position:fixed;top:14%;left:33%;"
      >

      <input
        type="text"
        v-model="toName"
        placeholder="送达对象名"
        class="inputBig"
        style="position:fixed;top:31%;left:33%;"
      >
      <!--拍照上传-->
      <img
        src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/photograph.png"
        style="width:26%;position:fixed;top:45%;left:15%;"
        mode="widthFix"
        @click="camera()"
      >
      <!--相册上传-->
      <img
        src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/photo_album.png"
        style="width:26%;position:fixed;top:50%;left:55%;"
        mode="widthFix"
        @click="album()"
      >
    </div>
  </div>
</template>

<style>
.inputBig {
  font-size: 17px;
  letter-spacing: 2px;
  font-weight: 700;
  height: 8%;
  line-height: 8%;
  width: 40%;
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      shareImg: "",
      param: {},
      filePath: "",
      fileBase: "",
      haibao: "",
      lableNum: 0,
      zipai: "",
      mergefaceAfter: "",
      miniqrQr: "",
      facePhoto: "",
      poster_top_img: "",
      poster_person_img: "",
      poster_bottom_img: "",
      isMergeface: false,
      fromName: "",
      toNameTag: "",
      selectId: null,
      bgColor: "blue",
      posterUrl: ""
    };
  },
  methods: {
    //==========日志监测begin
    getLog() {
      return { pageName: "制作海报页", operation: "页面加载完成" };
    },
    //==========日志监测end
    camera() {
      if (this.isNull(this.fromName)) {
        this.alert("请输入您的名称");
        return;
      }
      this.updateName();
      //==========日志监测begin
      var log = this.getLog();
      log.operation = "点击拍照";
      this.saveOperationLog(log);
      //==========日志监测end
      const that = this;
      wx.chooseImage({
        sizeType: ["compressed"],
        count: 1,
        sourceType: ["camera"],
        success: res => {
          that.facePhoto = res.tempFilePaths[0];
          that.getPosterAndMiniQr();
        }
      });
    },
    updateName() {
      var model = {};
      model.id = this.globalData.user.id;
      model.userName = this.fromName;
      this.globalData.user.userName = this.fromName;
      this.post2({
        url: "/wx_app/wx_user/enable_user_by_name",
        data: model
      }).then(data => {});
    },
    album() {
      //==========日志监测begin
      var log = this.getLog();
      log.operation = "相册选取照片";
      this.saveOperationLog(log);
      //==========日志监测end
      if (this.isNull(this.fromName)) {
        this.alert("请输入您的名称");
        return;
      }

      this.updateName();
      const that = this;
      wx.chooseImage({
        sizeType: ["compressed"],
        count: 1,
        sourceType: ["album"],
        success: res => {
          that.facePhoto = res.tempFilePaths[0];
          that.getPosterAndMiniQr();
        }
      });
    },
    //请求第三方接口 进行人脸融合
    requestMergeface() {
      var log = this.getLog();
      log.operation = "请求人脸融合";
      console.log(this.newroot().query.face_key);
      console.log(this.newroot().query.face_secret);
      console.log(this.newroot().query.merge_rate);
      var fileSystem = wx.getFileSystemManager();
      const that = this;
      that.param.template_url = that.posterUrl;
      that.param.api_key = this.newroot().query.face_key;
      that.param.api_secret = this.newroot().query.face_secret;
      that.param.merge_rate = this.newroot().query.merge_rate;
      wx.uploadFile({
        filePath: that.facePhoto,
        name: "merge_file",
        url: "https://api-cn.faceplusplus.com/imagepp/v1/mergeface",
        formData: that.param,
        success: function(res) {
          const data = JSON.parse(res.data);
          if (that.isNull(data.result)) {
            that.alert("请重新上传照片");
            //----------log begin
            log.remark = "人脸融合参数有误";
            log.remark1=  that.param;
            log.remark2= data.error_message;
            that.saveOperationLog(log);
            //----------log end
            wx.hideLoading();
            return false;
          }
          that.haibao = "data:image/jpg/png;base64," + data.result;
          fileSystem.writeFile({
            filePath: wx.env.USER_DATA_PATH + "/mergefaceAfter.png",
            data: data.result,
            encoding: "base64",
            success: res => {
              //----------log begin
              log.remark = "海报生成成功";
              log.remark1=  that.param;
              that.saveOperationLog(log);
              //----------log end
              //跳转页面
              console.log(wx.env.USER_DATA_PATH + "/mergefaceAfter.png");
              that.navigateTo(
                "/pages/poster_save/main?posterImgPath=" +
                  wx.env.USER_DATA_PATH +
                  "/mergefaceAfter.png"
              );
              console.log(res);
            },
            fail: err => {
              //----------log begin
              log.remark = "海报保存临时文件失败";
              log.remark1=  that.param;
              that.saveOperationLog(log);
              //----------log end
              console.log(err);
            }
          });
          wx.hideLoading();
        },
        fail: function(res) {
          //----------log begin
          log.remark = "人脸融合请求失败";
          log.remark1=  that.param;
          that.saveOperationLog(log);
          //----------log end

        },
        complete: function() {}
      });
    },

    //获取海报模板和小程序码并合并制作海报
    getPosterAndMiniQr() {
      wx.showLoading({
        title: "海报拼命制作中，请稍等...",
        mask: true
      });
      const that = this;
      console.log(this.toName)
      if (this.isNull(this.toName)) {
        console.log("toname空"+this.toName)
        this.toName = this.toNameTag;
      }
      this.post2({
        url: "/dt1520/createPoster",
        data: {
          lableNum: that.newroot().query.lableNum,
          is_share: this.globalData.isShare,
          share_user_id: this.globalData.shareUserId,
          active_id: this.globalData.active.id,
          user_id: this.globalData.user.id,
          poster_record_id: that.newroot().query.poster_record_id,
          fromName: this.fromName,
          toName: this.toName
        }
      }).then(res => {
        if (res.success) {
          that.posterUrl = res.data;
          that.requestMergeface();
          return false;
        }
        this.alert(res.msg, this.test1);
      });
    },
    mergeface() {}
  },

  mounted() {
    this.toName=null;
    this.fromName = this.globalData.user.userName;
    this.toNameTag = this.newroot().query.toName;
    console.log(this.toNameTag);
    //==========日志监测
    var log = this.getLog();
    this.saveOperationLog(log);
    //==========日志监测
  }
};
</script>


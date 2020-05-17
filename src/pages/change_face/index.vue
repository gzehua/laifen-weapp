<template>
  <div>


    <div style="color: #7d5256;text-align: center;margin-top: 5px;">忽悠证制作/预览区域</div>
    <div style="width:100%;height:300px;text-align: -webkit-center;margin-top: 10px;">

    <div style="width:85%;height: 90%;background-color:white;padding:10px;">
      <img mode="aspectFit" :src="haibao" style="width: 100%;height: 80%">
      <img @click="savePoster" :style="'width: 30%;display:'+showSave" mode="widthFix" src="http://star.peyesight.cn/images/saveposter.png"/>
    </div>


    </div>

    <!--<div style="border-top: 1px solid #6b4d55;height:1px;margin-left: 10px;margin-right: 10px;"></div>-->
    <div style="font-size: 14px;color:#6b4d55;display: flex;padding: 10px;margin-top: 1px;background-color: white">
      <!--<image style="width: 20px;height: 20px;" :src=" icon.warn"/>-->
      <span style="margin-left: 8px;">换脸制作忽悠证玩法</span>
    </div>
    <!--<div style="border-top: 1px solid #6b4d55;height:1px;margin-left: 10px;margin-right: 10px;"></div>-->
    <div class="prop" style=" width:100%;height:100%; background-color: white;margin-top: 1px;padding: 10px 10px 10px 0px;">
      <p>
        <span style="font-size: 12px;color:#6b4d55 ">一丶上传您的正脸美照，与主播人脸融合，不能有遮挡哦~</span>
      </p>
      <p>
        <span style="font-size: 12px;color:#6b4d55 ">二丶忽悠证制作完成后，可以保存到本地</span>
      </p>
      <p>
        <!--<span style="font-size: 12px;color:#6b4d55 ">三丶分享到朋友圈，每扫码或识别加入一个新人，会获取一定的来粉币奖励~</span>-->
      </p>
      <!--<p><span style="font-size: 14px;color:#6b4d55 ">2.请将小票摆放平整后拍照，确保拍照清晰</span></p>-->

    </div>

    <div style="width:100%;height:100%;position: fixed;background-color: white;margin-top: 2px;padding-top: 10%">
      <!--拍照上传-->
      <img
        src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/photograph.png"
        style="width:26%;margin-left: 10%"
        mode="widthFix"
        @click="camera()"
      >
      <!--相册上传-->
      <img
        src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/photo_album.png"
        style="width:26%;float: right;margin-right: 10%"
        mode="widthFix"
        @click="album()"
      >
    </div>

  </div>
</template>
<style>
  page {
    background: #efefef;
  }

</style>
<script>
export default {
  data() {
    return {
      facePhoto:"",
      haibao:"http://star.peyesight.cn/images/changefacemodal-1.jpg",
      param:{},
      posterImgPath:"",
      showSave:"none"
    };
  },
  methods: {
    getLog: function() {
      return { pageName: "海报制作页", operation: "页面加载完成" };
    },
    camera() {
      const that = this;
      wx.chooseImage({
        sizeType: ["compressed"],
        count: 1,
        sourceType: ["camera"],
        success: res => {
          that.facePhoto = res.tempFilePaths[0];
          that.getPoster();
        }
      });
    },
    album() {
      const that = this;
      wx.chooseImage({
        sizeType: ["compressed"],
        count: 1,
        sourceType: ["album"],
        success: res => {
          console.log(res)
          that.facePhoto = res.tempFilePaths[0];
          that.getPoster();
        }
      });
    },
    getPoster(){
      wx.showLoading({
        title: "海报拼命制作中，请稍等...",
        mask: true
      });
      const that = this;
      this.post({
        url: "/salter/change_face/start",
        data: {userId:this.globalData.user.id,activeId:this.globalData.active.id}
      }).then(res => {
        console.log(res)
        that.param.template_url =res.data.posterUrl;
        that.param.api_key =res.data.face_key;
        that.param.api_secret = res.data.face_secret;
        that.param.merge_rate =res.data. merge_rate;
        this.changeFace();
      });
    },
    changeFace(){
      wx.showLoading({
        title: "拼命制证中，请稍等...",
        mask: true
      });
      var fileSystem = wx.getFileSystemManager();
      const that = this;
      console.log( that.param)
      wx.uploadFile({
        filePath: that.facePhoto,
        name: "merge_file",
        url: "https://api-cn.faceplusplus.com/imagepp/v1/mergeface",
        formData: that.param,
        success: function(res) {
          const data = JSON.parse(res.data);
          if (that.isNull(data.result)) {
            that.alert("请重新上传照片");
            wx.hideLoading();
            return false;
          }
          that.haibao = "data:image/jpg/png;base64," + data.result;
          fileSystem.writeFile({
            filePath: wx.env.USER_DATA_PATH + "/mergefaceAfter.png",
            data: data.result,
            encoding: "base64",
            success: res => {
              that.showSave="block";
              that.posterImgPath= wx.env.USER_DATA_PATH +"/mergefaceAfter.png"
            },
            fail: err => {

            }
          });
          wx.hideLoading();
        },
        fail: function(res) {

        },
        complete: function() {}
      });
    },
    savePoster(e) {
      //==========日志监测begin
      var log = this.getLog();
      log.operation = "保存相册";
      this.saveOperationLog(log);
      //==========日志监测end
      this.saveFormId(e);
      const that = this;
      wx.authorize({
        scope: "scope.writePhotosAlbum",
        success() {
          wx.saveImageToPhotosAlbum({
            filePath: that.posterImgPath,
            success: function(res) {
              wx.showToast({
                title: "保存成功"
              });
            },
            fail: function(err) {
              console.log(err);
            }
          });
        }, fail() {
          that.alert("请先打开相册授权", that.sss);
        }
      });

    }

  },

  mounted() {
    console.log("==================demo2");
    console.log(this.newroot().query.id);
  }
};
</script>


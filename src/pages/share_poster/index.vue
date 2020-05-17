<template>
  <div>


    <!--<div style="color: #7d5256;text-align: center;margin-top: 5px;">忽悠证制作/预览区域</div>-->
    <div style="width:100%;height:400px;text-align: -webkit-center;margin-top: 10px;">
      <img mode="aspectFit" :src="haibao" style="width: 100%;height: 100%">
      <img @click="savePoster" style="width: 30%;" mode="widthFix" src="http://star.peyesight.cn/images/saveposter.png"/>
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
      haibao:"http://star.peyesight.cn/images/share_poster.jpg",
      param:{},
      posterImgPath:"",
      showSave:"none"
    };
  },
  methods: {
    wxToPromise(method, opt) {
      return new Promise((resolve, reject) => {
        wx[method]({
          ...opt,
          success(res) {
            opt.success && opt.success();
            resolve(res)
          },
          fail(err) {
            opt.fail && opt.fail();
            reject(err)
          }
        })
      });
    },
    createPoster(){
      this.post({
        url: "/salter/sharePoster/create",
        data: {userId:this.globalData.user.id,activeId:this.globalData.active.id}
      }).then(res => {
       console.log(res)
        this.haibao=res.data;
      });
    },
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

    savePoster() {
      const  _this=this;
      wx.getSetting({
        success(res) {
          wx.downloadFile({
            url: _this.haibao,
            success: function(res) {
              console.log(res);
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function(data) {
                  wx.showToast({
                    title: "保存成功",
                    icon: "success",
                    duration: 2000
                  });
                },
                fail: function(err) {
                  console.log(err);
                },
                complete(res) {
                  console.log(res);
                }
              });
            }
          });
        }
      });




    }

  },

  mounted() {
    this.createPoster();
    console.log("==================demo2");
    console.log(this.newroot().query.id);
  }
};
</script>


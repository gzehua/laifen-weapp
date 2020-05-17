<template>
  <div>

    <img
      src="http://star.peyesight.cn/images/choujiangbg.png"
      style="position:fixed;z-index:-10;width:100%;height:100%;"
    >
    <div style="position:absolute;width:100%;height:100%;text-align: -webkit-center;margin-top: 20px;">
    <div style="width: 60%;height: 80%;background-color:white;padding:10px;">
      <img mode="aspectFit" :src="posterImgPath" style="width: 100%;height: 100%">
    </div>
      <form @submit="savePoster" report-submit="true">
        <button
          class="share-img-button"
          style=""
          form-type="submit">
          <img style="width: 30%" mode="widthFix" src="http://star.peyesight.cn/images/saveposter.png"/>
        </button>
      </form>
      <form @submit="savePoster" report-submit="true">
        <button
          class="share-img-button"
          style="height:6%;width:46%;position:fixed;bottom:5.4%;right:15%;"
          form-type="submit"
        ></button>
      </form>
    </div>
  </div>
</template>
<style>
  .share-img-button {
    background-color: rgba(255, 255, 255, 0);
    display: block;
    border: none;
  }

  .share-img-button::after {
    border: none;
  }
</style>

<script>
  export default {
    data() {
      return {
        posterImgPath:
          "http://alcon-test-bucket.oss-cn-beijing.aliyuncs.com/%E9%A3%8E%E8%B6%A3%E5%B9%BD%E9%BB%98.jpg"
      };
    },
    methods: {
      getLog: function() {
        return { pageName: "海报制作成功页", operation: "页面加载完成" };
      },
      replay(e) {
        //==========日志监测begin
        var log = this.getLog();
        log.operation = "重新选择标签";
        this.saveOperationLog(log);
        //==========日志监测end
        this.saveFormId(e);
        this.reLaunch("/pages/dt1520_label1/main");
      },
      rephotograph() {
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
      this.posterImgPath = this.newroot().query.posterImgPath;
      console.log(this.newroot().query.posterImgPath);
      //==========日志监测
      var log = this.getLog();
      this.saveOperationLog(log);
      //==========日志监测
    }
  };
</script>


<template>
  <div class="bg" :style="'background-image: url(http://star.peyesight.cn/images/fruiter_'+imageIndex+'.png)'">
    <div style="position: fixed;bottom: 12%;width: 100%;text-align: -webkit-center">




      <div  style="width: 60%;position: absolute;margin-left: 20%">
        <div style=" background-image: repeating-linear-gradient(to right, rgba(255, 255, 255, 0),rgba(249, 249, 249, 0) 9%,#00ff0e 9% ,#000000 10%);height: 8px;"></div>

      </div>
      <van-progress
        :percentage="wateringNum"
        pivot-color="#99EDFF"
        color="linear-gradient(to top, #0264FF,#02FFFF )"
        custom-class="test"
        :show-pivot="false"
      />

      <div v-if="wateringNum<100" style="color: white; opacity: 0.9;font-size: 14px;margin-top: 3px;">在浇水{{hasWateringNum}}%，超甜果冻橙送到家</div>
      <div v-else style="color: white; opacity: 0.9;font-size: 14px;margin-top: 3px;">果实已经成熟，请联系客服发货~</div>
      <div style="color: whitesmoke">可浇水 <span style="color: #7d5256">{{isWatering}}</span> 次</div>
    </div>
    <div @click="watering" style="position: fixed;bottom: 30%;width: 100%">
      <image  style="width: 75px;float: right;margin-right: 25px;" src="http://star.peyesight.cn/images/shuihu.png" mode="widthFix"></image>

    </div>


    <div  style="position: fixed;bottom: 0%;width: 100%">
      <div class="tui-table-div"  style="background-color: white;margin-top: 10px;border-radius: 5px;padding-top: 10px;">
        <div  class="tui-col-3 " style="text-align: -webkit-center;" >
          <div  class="center" style="width: 35px;border-radius: 60px;">
            <button
              style="padding:0;line-height:0;background-color:transparent;border:none;"
              plain="true"
              open-type="share"
            >
              <image  src="http://star.peyesight.cn/images/fenxiang.png" style="width: 25px;" mode="widthFix"/>
            </button>

          </div>
          <span style="font-size: 0.8rem;color: #636881">分享好友</span>
        </div>
        <div  class="tui-col-3" style="text-align: -webkit-center;"  @click="showRuleDialog">
          <div  class="center" style="width: 35px;border-radius: 60px;">
            <image  src="http://star.peyesight.cn/images/wanfa.png" style="width: 25px;" mode="widthFix"/>
          </div>
          <span style="font-size: 0.8rem;color: #636881">玩法说明</span>
        </div>
        <div  class="tui-col-3" style="text-align: -webkit-center;"  >
          <div  class="center" style="width: 35px;border-radius: 60px;">
            <button
              style="padding:0;line-height:0;background-color:transparent;border:none;"
              plain="true"
              open-type="contact"
            >
              <image  src="http://star.peyesight.cn/images/kefu.png" style="width: 25px;" mode="widthFix"/>
            </button>

          </div>
          <span style="font-size: 0.8rem;color: #636881">联系客服</span>
        </div>
      </div>


    </div>

    <van-dialog style="text-align: center;" use-slot :show="isLookVideo" title=" " confirmButtonText="获取浇水机会"
                :confirmButtonColor="confirmButtonColor" @confirm="goLookVideo" @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>每天可以免费浇水一次，可观看完整视频再次获取浇水机会</div>
      </div>
    </van-dialog>


    <van-dialog custom-style="margin-top: 20%"  :show="isShowRuleDialog"   @close="close"  use-slot :confirmButtonText="confirmButtonText"  >
      <div style="color: #814552;font-size: 14px;margin-top: 10px;" >
        <div style="text-align: center">果树养成说明</div>
      </div>
      <div style="color: black;font-size: 12px;padding: 10px;" >
        <div style="text-align: center">
          <div style="text-align: left !important; color:#5f5f5f;   padding: 10px;">
            <p style="margin: 5px;">每天可获取免费浇水一次</p>
            <p style="margin: 5px;">果树成熟后(浇水进度条100%)，联系客服，超甜果冻橙包邮送到家哦</p>
            <p style="margin: 5px;">如没有浇水机会，可以观看完整视频获取哦~</p>
          </div>
        </div>
      </div>
    </van-dialog>


  </div>
</template>
<style>
  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;

  }

  .van-progress {
    height: 12px !important;
    background-color: #4D590D !important;
    opacity: 0.9;
    width: 60% !important;
  }


</style>
<script>
  let videoAd = null;
  export default {
    data() {
      return {
        confirmButtonText:"知道啦",
        isShowRuleDialog:false,
        canWateringNum:0,
        isLookVideo:false,
        wateringNum: 0,
        imageIndex: 0,
        hasWateringNum: 0,
        isCheck: false,
        isOpenFun:0,
        isWatering:0,
        flag:true
      };
    },
    methods: {
      showRuleDialog(){
        this.isShowRuleDialog=true;
      },
      close() {
        this.isLookVideo = false;
        this.isShowRuleDialog = false;
      },
      goLookVideo() {
        if(!this.isOpenFun) {
          this.alert("来粉赚测试结束，筹备发布公测版本，暂停视频观看");
          return;
        };
        this.checkVideoResource();
      },
      checkVideoResource(){
        this.post({
          url: "/salter/ad/checkVideoResource",
          data: {  }
        }).then(res => {
          if(res.success){
            this.lookVideo()
          }else{
            this.alert("视频资源筹备中,请稍等一会再来");
          }
        });
      },
      lookVideo(){
        // 用户触发广告后，显示激励视频广告
        if (videoAd) {
          this.globalData.scene=""
          this.globalData.path=""
          console.log("准备播放");
          videoAd.show().catch(() => {
            // 失败重试
            videoAd.load()
              .then(() =>{
                videoAd.show();
              })
              .catch(err => {
                console.log("激励视频 广告显示失败");
              });
          });
        }
      },
      kefu(e){
        console.log(e.detail.path)
        console.log(e.detail.query)
      },
      watering() {
        if(!this.isWatering){
          this.isLookVideo=true
          return;
        }
        this.post({
          url: "/salter/fruiter/lookVideoWatering",
          data: { userId: this.globalData.user.id }
        }).then(res => {
          if (res.success) {
            this.globalData.user.isWatering=0
            this.isWatering=0
            this.flushGameNum();
            this.searchProgress();
            this.alert("浇水成功，获取"+res.data+"个来粉币奖励");
          } else {
            this.alert(res.msg);
          }
        });
      },
      searchProgress() {
        this.post({
          url: "/salter/fruiter/search",
          data: { userId: this.globalData.user.id }
        }).then(res => {
          this.wateringNum =res.data*100;
          this.hasWateringNum =Math.floor((100-res.data*100)*100)/100;
          this.imageIndex = parseInt(res.data*10);
          console.log( this.imageIndex)
        });
      }

    },
    onShareAppMessage(res) {
      return {
        title: '浇水领水果啦~~',
        path: '/pages/home/main?a='+this.globalData.active.id+"&u="+this.globalData.user.id
      }},
    mounted() {
      let _this = this;
      this.isOpenFun=  this.globalData.active.isOpenFun;
      this.isWatering=  this.globalData.user.isWatering;
      this.searchProgress();
      // 在页面onLoad回调事件中创建激励视频广告实例
      if (wx.createRewardedVideoAd) {
        console.log("加载视频");
        videoAd = wx.createRewardedVideoAd({
          adUnitId: "adunit-b6ca3da3ae02d9a9"
        });
        videoAd.onLoad(() => {
          console.log("加载成功");

        });
        videoAd.onError((err) => {
        });
        videoAd.onClose((res) => {
          this.monitorAdVideoEv();
          if (res && res.isEnded) {
            this.globalData.user.isWatering=1
            this.isWatering=1
            this.flushGameNum();
          } else {
            if (!this.isNull(this.globalData.scene)  ){
              this.monitorAdVideo();
            }
            if(_this.flag){
              _this.flag=false
              this.lookVideoReward(function() {
                _this.flag=true
              });
            }
            //this.savePuzzleLog("答题失败！视频观看没有看完", false);
            console.log("没有看完");
          }
        });
      }


    }
  };
</script>
<style lang="less">
  @import "../../../static/css/home.less";

  .center {
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .van-cell {
    background-color: transparent !important;
  }

  page {
    background: @background;
  }

  .me-box-1 {
    background: @me-box-1;
    background-size: 100% 100%;
  }

  .grid_img {
    width: 50px;
  }

  .grid_img_big {
    width: 60px;
  }

  .grid_img_small {
    width: 35px;
  }

  .grid {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tui-table-div {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }

  .tui-col-2 {
    flex: 0 0 auto;
    width: 49%;
    text-align: center;
    color: #797979;
    padding: 40 rpx 0;
    font-size: 30 rpx;
  }

  .tui-col-3 {
    flex: 0 0 auto;
    width: 33.33333333%;
    text-align: center;
    color: #797979;
    padding: 40 rpx 0;
    font-size: 30 rpx;
  }

  .tui-col-4 {
    flex: 0 0 auto;
    width: 25%;
    text-align: center;
    color: #797979;
    padding: 40 rpx 0;
    font-size: 30 rpx;
  }

  .tui-col-5 {
    flex: 0 0 auto;
    width: 20%;
    text-align: center;
    color: #797979;
    padding: 40 rpx 0;
    font-size: 30 rpx;
  }

  .tui-col-6 {
    height: 100%;
    line-height: 50px;
    width: 25%;
    float: left;
  }

  .box-1 {
    background: @box-background1;
    background-size: 100% 100%;
  }

  .box-2 {
    background: @box-background2;
    background-size: 100% 100%;
  }

  .box-3 {
    background: @box-background3;
    background-size: 100% 100%;
  }

  .box-4 {
    background: @box-background4;
    background-size: 100% 100%;
  }

  .me-header-box-2 {
    background: @box-background5;
    background-size: 100% 100%;
  }

  .footer {
    margin-top: 25px;
  }

  .left {
    margin-top: 15px;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    color: white;
    float: left;
    width: 40%;
    text-align: center;
    margin-left: 5%;
  }

  .right {
    margin-top: 15px;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    color: white;
    float: right;
    width: 40%;
    text-align: center;
    margin-right: 5%;
  }

</style>

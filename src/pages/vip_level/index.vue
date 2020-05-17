<template>
  <div style="background-color:#f7f7f7">

    <div>
      <img src="http://star.peyesight.cn/images/vip_level.png" mode="widthFix" style="width: 100%"/>

    </div>


    <div class="prop" style=" width:100%;height:100%; background-color: white;margin-top: 1px;padding-left: 10px;text-align: center">
      <van-row>
        <van-col span="4">
          <span style="font-size: 12px;color:#6b4d55 ">VIP等级</span>
        </van-col>
        <van-col span="4">
          <span style="font-size: 12px;color:#6b4d55 ">成长值</span>
        </van-col>
        <van-col span="16">
          <span style="font-size: 12px;color:#6b4d55 ">特权</span>
        </van-col>
      </van-row>


      <van-row v-for="item in vipLevels">
        <van-col span="4">
          <span style="font-size: 12px;color:#6b4d55 ">{{item.name}}</span>
        </van-col>
        <van-col span="4">
          <span style="font-size: 12px;color:#6b4d55 ">{{item.starExp}}+</span>
        </van-col>
        <van-col span="16">
          <span style="font-size: 12px;color:#6b4d55 ">{{item.describe}}</span>
        </van-col>
      </van-row>

      <p>

      </p>
      <p>
        <span style="font-size: 12px;color:#6b4d55 ">  </span>
      </p>
      <p>

      </p>


    </div>


    <!--<div style="font-size: 14px;color:#6b4d55;display: flex;padding: 10px;margin-top: 1px;align-items: center">-->
      <!--<image  src="http://star.peyesight.cn/images/paihang.png" style="width: 100%" mode="widthFix"></image>-->
    <!--</div>-->


       <!--<div calss="ranking"-->
            <!--style="margin-top: 5px;background: url('https://alcon-star.oss-cn-beijing.aliyuncs.com/se/top.png');background-size: 100% 100%;height:180px;">-->
         <!--<div v-for="item in ranks" style=" width: 33.3%;    float:left; height:100%;">-->
           <!--<div style="height:40px;"></div>-->
           <!--<div class="tui-table-div">-->
             <!--<div class="grid" style="width:100%;">-->
               <!--<image class="grid2_img"  mode="widthFix" :src="'http://star.peyesight.cn/images/rank'+item.rank+'.png'"></image>-->
             <!--</div>-->
           <!--</div>-->
           <!--<div class="font_css" style="">第{{item.rank}}名</div>-->
           <!--<div class="font_css" style="font-size: 12px;color: #6A6A6A">{{item.user_name}}</div>-->
           <!--<div class="font_css" style=" color:#feb21f;font-weight: 700;font-size: 20px;">{{item.score}}</div>-->
         <!--</div>-->
       <!--</div>-->

       <!--<van-cell style="width: 100%">-->
         <!--<div slot="title" style="align-items: center;display: flex;height: 100%">-->
           <!--<image class="grid_img" mode="widthFix" src="http://star.peyesight.cn/images/pidanphoto.jpg"></image>-->
           <!--<div style=" margin-left: 20px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{user.userName}}</div>-->
           <!--<div style="margin-left: 20px;color:#feb21f;font-weight: 700;font-size: 20px;">{{currentScore}}</div>-->
         <!--</div>-->
         <!--<div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">-->
           <!--<span style="color: #EE722D;font-family: 华文隶书">NO.{{currentRank}}</span>-->
         <!--</div>-->

       <!--</van-cell>-->

    <van-dialog style="text-align: center;" use-slot :show="isShowRewardDialog" title="打赏主播" confirmButtonText="确认"
                 @confirm="reward"   @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>您确认花费5来粉币打赏主播吗?</div>
      </div>
    </van-dialog>


    <div v-show="show"  class="center">
      <div style="width: 300px;">
        <ad  unit-id="adunit-7dff38f9301dc30f" ad-intervals="30" ></ad>
      </div>
    </div>


     </div>


</template>
<style lang="less">

  .header_photo{
    border-radius: 50px;
    width: 95%;
    height: 90px;
    background-image: url("http://star.peyesight.cn/images/qinmidubg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .center {
    align-items: center;
    justify-content: center;
    display: flex;
  }
   .grid_img {
    width: 85px;
     border-radius: 50px;
   }


</style>

<script>
  let videoAd = null;
export default {
  data() {
    return {
      currIntimacy:0,
      anchorTeamId:"",
      photo:"",
      name:"",
      isShowRewardDialog:false,
      user:{},
      vipLevels:[],
      show:false,
    };
  },
  methods: {
    skipToRankIntimacy(){
      this.navigateTo("/pages/rank_intimacy/main?anchorId="+this.anchorTeamId);
    },
    close(){
      this.isShowRewardDialog=false;
    },
    showRewardDialog(){
      this.isShowRewardDialog=true;
    },
    reward(){
      this.post({
        url: "/salter/user/reward",
        data: {
          userId: this.globalData.user.id,anchorId:this.anchorTeamId
        }
      }).then(res => {
        if(res.success){
          this.flushUserData();
          this.flushIntimacy();
        }else{
          this.alert(res.msg)
        }
      });
    },
    flushIntimacy(){
      this.post({
        url: "/salter/user/currIntimacy",
        data: {
          userId: this.globalData.user.id,anchorId:this.anchorTeamId
        }
      }).then(res => {
        this.currIntimacy=res.data.intimacy
      });
    },
    // reward(){
    //   this.post({
    //     url: "/salter/user/isReward",
    //     data: {
    //       userId: this.globalData.user.id
    //     }
    //   }).then(res => {
    //     if(res.success){
    //       // 用户触发广告后，显示激励视频广告
    //       if (videoAd) {
    //         console.log("准备播放")
    //         videoAd.show().catch(() => {
    //           // 失败重试
    //           videoAd.load()
    //             .then(() => videoAd.show())
    //             .catch(err => {
    //               console.log('激励视频 广告显示失败')
    //             })
    //         })
    //       }
    //     }else{
    //       this.alert(res.msg)
    //     }
    //   });
    //
    //
    // },
    flushUserData() {
      this.post({
        url: "/wx_app/wx_user/save",
        data: {
          openid: this.globalData.openid,
          appid: this.globalData.appid,
          unionid: this.globalData.unionid,
          source: this.globalData.source,
          wxAppActiveId: this.globalData.activeId
        }
      }).then(res => {
        this.user=res.user
      });
    },
  },
  mounted() {
    let _this = this;

// 在页面onLoad回调事件中创建激励视频广告实例
      if (wx.createRewardedVideoAd) {
      console.log("加载视频")
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-b6ca3da3ae02d9a9'
      })
      videoAd.onLoad(() => {
        console.log("加载成功")

      })
      videoAd.onError((err) => {})
      videoAd.onClose((res) => {
        if (res && res.isEnded) {
          this.post({
            url: "/salter/user/lookVideo",
            data: { userId: _this.globalData.user.id }
          }).then(res => {
            _this.alert("恭喜您获取与主播亲密度+1");
            _this.flushUserData();
          });
        } else {
          console.log("没有看完")
        }
      })
    }
  },
  onShow() {
    let _this = this;
    _this.show = false;
    this.checkBannerResource(function() {
      _this.show = true;
    });
    this.post({
      url: "/salter/vip_level/searchList",
      data: {}
    }).then(res => {
      this.vipLevels=res.data
    });

  }
};
</script>


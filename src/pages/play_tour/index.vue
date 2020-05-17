<template>
  <div style="background-color:#f7f7f7">


    <div style="width: 100%;text-align: -webkit-center">
      <div v-show="show" style="width: 90%">
        <ad unit-id="adunit-7dff38f9301dc30f" ad-intervals="30" ></ad>
      </div>
    </div>


    <div style="width: 100%;text-align: -webkit-center;background-color: white">

    <div class="header_photo" style="line-height: 100px;">
      <div style="font-size:0.8rem;color: #FF71AD;height: 0px;">{{currIntimacy}}</div>
      <div style="align-items: center;display: flex;height: 90px;align-items: center; float: left; ">
        <image class="grid_img" style="margin-left: 4px; " mode="widthFix" src="http://star.peyesight.cn/images/pidanphoto.jpg"></image>
      </div>

      <div style="align-items: center;display: flex;height: 100px;align-items: center;float: right; ">
        <image class="grid_img" style="margin-right: 4px;" mode="widthFix" :src="photo"></image>
      </div>

    </div>
    <div style="padding: 10px;">

      <van-row>
        <van-col span="8">
          <div style="font-size: 0.8rem;">{{user.userName}}</div>
        </van-col>
        <van-col span="8">
          <div style="font-size: 0.8rem;font-family: 华文隶书;color: #EE722D;">亲密度</div>
        </van-col>
        <van-col span="8">
          <div style="font-size: 0.8rem;">{{name}}</div>
        </van-col>
      </van-row>


    </div>

    </div>

    <div style="font-size: 14px;color:#6b4d55;display: flex;padding: 10px;margin-top: 2px;background-color: white;align-items: center;">
      <!--<image style="width: 20px;height: 20px;" :src=" icon.warn"/>-->
      <span style="margin-left: 8px;width: 80%">当前来粉币余额：{{user.score}}</span>
        <van-button @click="showRewardDialog"  style="float: right;" icon="http://star.peyesight.cn/images/xin.png"  size="small"type="warning" round >打赏</van-button>

    </div>


    <div @click="skipToRankIntimacy" style="font-size: 14px;color:#6b4d55;padding: 10px;margin-top: 1px;background-color: white">
    <div class="center">亲密度排行 <image  src="http://star.peyesight.cn/images/user_paihang.png" style="width: 25px;margin-left: 5px;" mode="widthFix"/></div>

    </div>
    <!--<div style="border-top: 1px solid #6b4d55;height:1px;margin-left: 10px;margin-right: 10px;"></div>-->
    <div style="font-size: 14px;color:#6b4d55;padding: 10px;margin-top: 1px;background-color: white">
      <!--<image style="width: 20px;height: 20px;" :src=" icon.warn"/>-->
      <span style="margin-left: 8px;">亲密度等级权益</span>
    </div>
    <!--<div style="border-top: 1px solid #6b4d55;height:1px;margin-left: 10px;margin-right: 10px;"></div>-->
    <div class="prop" style=" width:100%;height:100%; background-color: white;margin-top: 1px;padding-left: 10px;text-align: center">
      <van-row>
        <van-col span="4">
          <span style="font-size: 12px;color:#6b4d55 ">亲密度称号</span>
        </van-col>
        <van-col span="4">
          <span style="font-size: 12px;color:#6b4d55 ">亲密度值</span>
        </van-col>
        <van-col span="16">
          <span style="font-size: 12px;color:#6b4d55 ">权益</span>
        </van-col>
      </van-row>


      <van-row v-for="item in intimacyLevels">
        <van-col span="4">
          <span style="font-size: 12px;color:#6b4d55 ">{{item.name}}</span>
        </van-col>
        <van-col span="4">
          <span style="font-size: 12px;color:#6b4d55 ">{{item.starIntimacy}}+</span>
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

    <van-dialog style="text-align: center;" use-slot :show="isShowRewardDialog" title="打赏主播" confirmButtonText="观看视频打赏"
                 @confirm="reward"   @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>观看视频即可打赏主播获取奖励哦</div>
      </div>
    </van-dialog>

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
      intimacyLevels:[],
      isCheck:false,
      show: false,
      isOpenFun:0,
      flag:true
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
    // reward(){
    //   this.post({
    //     url: "/salter/user/reward",
    //     data: {
    //       userId: this.globalData.user.id,anchorId:this.anchorTeamId
    //     }
    //   }).then(res => {
    //     if(res.success){
    //       this.flushUserData();
    //       this.flushIntimacy();
    //     }else{
    //       this.alert(res.msg)
    //     }
    //   });
    // },
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
    checkVideoResource(){
      this.post({
        url: "/salter/ad/checkVideoResource",
        data: {  }
      }).then(res => {
        if(res.success){
          // 用户触发广告后，显示激励视频广告
          if (videoAd) {
            this.globalData.scene=""
            this.globalData.path=""
            console.log("准备播放")
            videoAd.show().catch(() => {
              // 失败重试
              videoAd.load()
                .then(() => videoAd.show())
                .catch(err => {
                  console.log('激励视频 广告显示失败')
                })
            })
          }
        }else{
          this.alert("视频资源筹备中,请稍等一会再来");
        }
      });
    },
    reward(){
      this.post({
        url: "/salter/user/isReward",
        data: {
          userId: this.globalData.user.id
        }
      }).then(res => {
        if(res.success){
          if(!this.isOpenFun) {
          this.alert("来粉赚测试结束，筹备发布公测版本，暂停视频观看");
          return;
        };
         this.checkVideoResource();
        }else{
          this.alert(res.msg)
        }
      });


    },
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
    this.isOpenFun=  this.globalData.active.isOpenFun;
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
        this.monitorAdVideoEv();

        if (res && res.isEnded) {
          this.post({
            url: "/salter/user/lookVideo",
            data: { userId: _this.globalData.user.id,anchorId:_this.anchorTeamId }
          }).then(res => {
            _this.alert("感谢您的打赏，获取与主播亲密度+1和来粉币+1奖励");
            _this.currIntimacy=res.data.intimacy
            _this.flushUserData();
          });
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
    this.currIntimacy=0
    this.flushUserData();
    this.anchorTeamId=this.$root.$mp.query.anchorTeamId
    this.photo=this.$root.$mp.query.photo
    this.name=this.$root.$mp.query.name
    this.flushIntimacy();
    this.post({
      url: "/salter/intimacy/searchList",
      data: {anchorTeamId:this.anchorTeamId}
    }).then(res => {
      this.intimacyLevels=res.data
    });

  }
};
</script>


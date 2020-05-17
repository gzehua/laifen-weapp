<template>
  <div style="height: 100%;width: 100%;background-color: #E9E6EA;text-align: -webkit-center">
    <!--<div :class="user.enable?'':'mask-layer'"></div>-->
    <div class="center" style="margin-top: 10px;">
      <div style="background-color: #FFF9F6;width: 90%;height: fit-content;border-radius: 20px;padding: 10px;">


        <div
          style="background: url('http://star.peyesight.cn/images/clock_title.png') no-repeat;background-size: 100%;height: 60px">
          <div style="margin-left:10%;padding-top: 2%;color: white;font-size: 26px">连续打卡{{continuousClockNum}}天</div>
        </div>

        <div style="color: #9B9793;font-size: 14px;">
          连续打卡365天可获取1000元
        </div>
        <div class="tui-table-div" style="margin-top: 10px;">
          <div v-for="(item,index) in clocks" class="tui-col-7" style="text-align: -webkit-center">

            <div  class="center" style="background-color: #F8E7DF;width: 35px;height: 35px;border-radius: 60px;">
              <image v-if="index<clockNum" src="http://star.peyesight.cn/images/SB.png" style="width: 35px;" mode="widthFix"/>
              <span v-else style="color: #D68567;font-size: 14px;">+{{item.score}}</span>
            </div>
            <span style="font-size: 14px;color: #D68567">{{item.name}}</span>
          </div>
        </div>

        <div class="center" :class="enable===2?'':'mask-layer-clock animation circle_bottom'" style="background-color: #FAE6E1;width: 55%;height: 35px;border-radius: 40px;margin-top: 10px;" @click="clock">
            <span style="font-size: 14px;color: #D68567">
              <div v-if="clockStatus==0">签到领取奖励</div>
              <div v-else>今日已打卡</div>
            </span>
        </div>
        <div class="center" style="background-color: #FAE6E1;width: 70%;height: 35px;border-radius: 40px;margin-top: 10px;" @click="clock">
            <span class="center"  style="font-size: 14px;color: #D68567">
              邀请好友打卡获取红包钥匙
              <button open-type='share' size="mini" plain="true" id='btnShare0'   style="padding:0;line-height:0;background-color:transparent;border:none;"></button>
            </span>
        </div>
        <div style="font-size: 12px;color:#9B9793;float: right">
          当前来粉币:{{score}}
        </div>
      </div>
    </div>

<div style="height:100% ;background-color: white;width: 90%;border-radius: 10px;margin-top: 10px">
  <div  v-for="item in tasks" style="display: flex;">
    <div style="flex-grow: 1;text-align: left;padding: 10px">
      <div style="font-size: 14px;">
        {{item.describe}}
      </div>
      <div style="font-size: 12px;color: #DEA498;">{{item.rewardContent}}</div>
    </div>
    <div v-if="!item.path" style="width: 20%" class="center"  >
      <div style="background-color: #c0c0c0;font-size: 14px;padding:4px  10px 4px 10px;border-radius: 20px;color: white">未达成</div>
    </div>
    <div v-else style="width: 20%" class="center"  >
      <button v-if="item.type==='mini'"
              @click="clickSkipOthorMini(item)"
        style="line-height:1;background-color:transparent;border:none;background-color: #c09787;font-size: 14px;padding:4px  10px 4px 10px;border-radius: 20px;color: white"
        plain="true"
        open-type="getUserInfo"
        @getuserinfo="getUserInfo"
      >
      去完成
      </button>
        <div v-else style="background-color: #c09787;font-size: 14px;padding:4px  10px 4px 10px;border-radius: 20px;color: white" @click="skipToPath(item)">去完成</div>
    </div>
  </div>
  <div v-show="show" style="width: 100%;;border-radius: 10px;z-index: 1" class="center">
    <div style="width: 300px;">
      <ad  unit-id="adunit-7dff38f9301dc30f" ad-intervals="30" ></ad>
    </div>
  </div>
</div>




    <van-dialog style="text-align: center;" use-slot :show="isLookVideo" title=" " confirmButtonText="双倍奖励" cancelButtonText="普通奖励"
                :confirmButtonColor="confirmButtonColor" @confirm="doubleReward" @cancel="plainReward"  @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>观看视频可以获取双倍来粉币奖励哦~</div>
      </div>
    </van-dialog>
  </div>
</template>
<style>
@keyframes twinkling {
    0% {
      opacity:0.8;
      filter:alpha(opacity=20);
      -webkit-transform:scale(1);
    }
    50% {
      opacity:1;
      filter:alpha(opacity=50);
      -webkit-transform:scale(1.12);
    }
    100% {
      opacity:0.8;
      filter:alpha(opacity=20);
      -webkit-transform:scale(1);
    }
  }
  .mask-layer-clock {
    position : relative;
    z-index: 3;
  }
  .circle_bottom {
    border-radius:100%;
    filter:alpha(opacity=40);
    margin-left:9px;
  }
  .animation {
    -webkit-animation:twinkling 2.1s infinite;
    animation:twinkling 2.1s infinite ;
    -webkit-animation-fill-mode:both;
    animation-fill-mode:both;
  }
.mask-layer {
    background-color:rgba(16, 14, 14, 0.56);
    color:rgba(16, 14, 14, 0.56);
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  .center {
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .grid {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grid_img {
    width: 40px;
  }

  .tui-table-div {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }

  .tui-col-7 {
    flex: 0 0 auto;
    width: 14%;
    text-align: center;
    color: #797979;
    padding: 40 rpx 0;
    font-size: 30 rpx;
  }

</style>
<script>
  let videoAd = null;
  export default {
    data() {
      return {
        continuousClockNum:"",
        score:"",
        isLookVideo:false,
        award:0,
        clockStatus:0,
        clockNum:0,
        clocks: [],
        isDouble:1,
        user: {},
        enable: 0,
        confirmButtonColor: "#814552",
        isCheck: false,
        show: false,
        isOpenFun:0,
        flag:true,
        tasks:[],
        skipItem:{},
        isSkipToOtherMini:false
      };
    },
    methods: {
      getUserInfo() {
        var _this = this;
        wx.getSetting({
          success(res) {
            var getUserFlag = res.authSetting["scope.userInfo"];
            if (!getUserFlag) {
            } else {
              _this.skipToPath(_this.skipItem);
              console.log(_this.globalData.user.unionid)
              if(null==_this.globalData.user.unionid){
                _this.getUserInfoBegin();
              }
            }
          }
        });
      },
      getUserInfoBegin() {
        var _this = this;
        wx.getUserInfo({
          success(res) {
            _this.getWxUserAfter(res);
          },
          fail(res) {
            _this.getWxUserAfter(null);
          }
        });
      },
      getWxUserAfter(res) {
        if (res == null) {
          this.alert("获取用户信息失败");
        } else {
          console.log(res)
          this.model.iv =res.iv;
          this.model.sessionKey =this.globalData.sessionKey;
          this.model.encryptedData =res.encryptedData;
          this.model.rawData =res.userInfo;
          this.model.userId=this.globalData.user.id;
          this.post({
            url: "/wx_app/system/enable_user",
            data: this.model
          }).then(data => {
            this.globalData.user=data.data
            console.log(data)
            if (data.success&&this.isSkipToOtherMini) {
              this.skipToPath(this.skipItem)
            } else {
              this.alert(data.data);
            }
          });
        }
      },
      clickSkipOthorMini(item){
        this.skipItem=item;
        this.isSkipToOtherMini=true;
      },
      skipToPath(task){
        if(task.type==="mini"){
          wx.navigateToMiniProgram({
            appId: task.appid,
            path: "pages/home/main?path="+task.path,
            success(res) {
            }
          })
        }
        if(task.type==="page"){
            this.navigateTo(task.path);
        }

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
      nextPage() {
        this.navigateTo("/pages/index/main");
      },
      close(){
        this.isLookVideo=false;
        if(!this.user.enable) {
          this.globalData.enable = 2;
        }
      },
      plainReward(){
        this.clockApi();
      },
      doubleReward(){
        if(!this.isOpenFun) {
          this.alert("来粉赚测试结束，筹备发布公测版本，暂停视频观看");
          return;
        };
         this.checkVideoResource();
      },
      clock(){
        if(this.clockStatus==1){
          console.log("今天已经打过卡了")
          return false;
        }
        this.isLookVideo=true;
      },
      searchTasks(){
        this.post({
          url: "/salter/task/search",
          data: {userId:this.globalData.user.id,activeId:this.globalData.active.id}
        }).then(res => {
          if(res.success){
            this.tasks=res.data
          }else{

          }
        });
      },
      clockApi(){
        this.post({
          url: "/salter/user/clock",
          data: {userId:this.globalData.user.id,isDouble:this.isDouble }
        }).then(res => {
          if(res.success){
            this.alert(res.data)
            this.getUserClockStatus();
            this.flushUserData();

          }else{
            this.alert(res.msg,this.nextPage);
          }
        });
      },
      getUserClockStatus(){
        this.post({
          url: "/salter/clock/getUserClockStatus",
          data: { userId:this.globalData.user.id }
        }).then(res => {
          if(res.success){
            this.clockStatus=res.data.clockStatus
            this.clockNum=res.data.clockNum
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
          this.score = res.user.score;
          this.continuousClockNum=res.user.clockNum
        });
      },
    },
    onShow(){
      let _this = this;
      _this.show = false;
      this.getUserClockStatus();
      this.flushUserData();
      this.searchTasks();
      this.checkBannerResource(function() {
        _this.show = true;
      });
    },
    onShareAppMessage(res) {
      return {
        title: '玩烧脑小游戏获取积分，积分可兑换现金红包！~',
        path: '/pages/home/main?a='+this.globalData.active.id+"&u="+this.globalData.user.id,
        imageUrl:"http://star.peyesight.cn/images/share.png"
      }},
    mounted() {
      let _this = this;
      this.isOpenFun=  this.globalData.active.isOpenFun;
      _this.user = this.globalData.user;
      if(!_this.user.enable) {
        this.globalData.enable = 1;
        this.enable = 1;
      }else {
        this.enable = 0;
      }
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
            _this.isDouble=2;
            _this.clockApi();
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
      this.post({
        url: "/salter/clock/getClockSetting",
        data: {activeId:this.globalData.active.id  }
      }).then(res => {
        this.clocks=res.data
        this.award=res.data[6].score
      });

    }
  };
</script>


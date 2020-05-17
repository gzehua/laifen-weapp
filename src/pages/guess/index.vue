<template>
  <div style="background-color: #1C9EBB;width: 100%;height: 100%;position: fixed;text-align: -webkit-center">
    <div v-show="show" style="width: 300px;" >
      <ad  unit-id="adunit-7dff38f9301dc30f" ad-intervals="30" ></ad>
    </div>
    <div v-if="guess!=null" style="color: #B0E5B7;font-size: 16px; text-align: center;margin-top: 10px;"> 还有
      {{waitDate.mm}}分{{waitDate.ss}}秒公布结果
    </div>
    <div v-else style="color: #B0E5B7;font-size: 16px; text-align: center;margin-top: 10px;">
      猜大小开放时间为每天 早8-9 中12-13 晚16-17
    </div>
    <div style="width: 100%;margin-top: 20px;justify-content: center;justify-items: center">
      <div style="width: 80%;background-color: #0C6877;color: white;padding: 10px;margin-left: 5%">
        <van-field
          :value="guessScore"
          clearable
          label="竞猜数量"
          placeholder="请输入竞猜数量"
          bind:click-icon="onClickIcon"
          @change="guessScoreChange"
          type="number"
        />
      </div>
    </div>
    <div style="width: 100%;margin-top: 20px;">
      <van-row>
        <van-col span="8" >
          <div @click="selectStake('大')"
               style="width: 100px;border-radius:30px;background-color: #EED2E0;  display: flex;flex-direction: row;justify-content: center;align-items: center;padding: 5px;">
            <span style="color: #CE1660;font-size: 20px;font-weight: 600">大</span>
          </div>
        </van-col>
        <van-col span=8>
          <div @click="selectStake('小')"
               style="width: 100px;border-radius:30px;background-color: #EED2E0;  display: flex;flex-direction: row;justify-content: center;align-items: center;;padding: 5px;">
            <span style="color: #CE1660;font-size: 20px;font-weight: 600">小</span>
          </div>
        </van-col>
        <van-col span=8>
          <div @click="historyGuess"
               style="width: 100px;border-radius:30px;background-color: #EED2E0;  display: flex;flex-direction: row;justify-content: center;align-items: center;;padding: 5px;">
            <span style="color: #CE1660;font-size: 20px;font-weight: 600">往期回顾</span>
          </div>
        </van-col>
      </van-row>

    </div>
    <div style="width: 100%;text-align: center;margin-top: 20px;">
      <span style="color: #B0E5B7;font-size: 16px;">当前来粉币：{{score}}</span>
    </div>
    <div class="center" style="width: 100%">
      <div class="center" style="background-color: #FAE6E1;width: 55%;height: 35px;border-radius: 40px;margin-top: 10px;" @click="clock">
            <span style="font-size: 14px;color: #D68567">
              邀请好友获取一个红包钥匙
              <button open-type='share' size="mini" plain="true" id='btnShare0'   style="padding:0;line-height:0;background-color:transparent;border:none;"></button>
            </span>
      </div>
    </div>
    <van-dialog style="text-align: center;" use-slot :show="isShowGuess" title=" " confirmButtonText="确认"
                 @confirm="starStake" @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>您确认竞猜吗?</div>
      </div>
    </van-dialog>


    <van-dialog style="text-align: center;" use-slot :show="isLookVideo" title=" " confirmButtonText="获取竞猜机会"
                :confirmButtonColor="confirmButtonColor" @confirm="goLookVideo" @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>您当天的竞猜次数已用完，可观看视频重新获取竞猜机会</div>
      </div>
    </van-dialog>

  </div>


</template>
<style>
  .center {
    align-items: center;
    justify-content: center;
    display: flex;
  }


</style>
<script>
  let videoAd = null;
  export default {
    data() {
      return {
        isShowGuess:false,
        isLookVideo:false,
        stake: "",
        guess: {},
        waitDate: "",
        select: "",
        score: "",
        guessScore: "",
        sleepIndex: null,
        intervalid: null,
        result: "max",
        confirmButtonColor: "#814552",
        isCheck: false,
        show: false,
        isOpenFun:0,
        flag:true
      };
    },
    methods: {
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
      historyGuess(){
        this.navigateTo("/pages/guess_record/main");
      },
      close() {
        this.isLookVideo = false;
        this.isShowGuess=false;
      },
      goLookVideo() {
        if(!this.isOpenFun) {
          this.alert("来粉赚测试结束，筹备发布公测版本，暂停视频观看");
          return;
        };
         this.checkVideoResource();
      },
      guessScoreChange(e) {
        this.guessScore = e.mp.detail;
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
        });
      },
      selectStake(stake) {
        if(!this.globalData.user.isGuess){
          this.isLookVideo=true
          return;
        }
        if (this.isNull(this.guessScore)) {
          this.alert("请选择本次投入来粉币");
          return;
        }
        if(this.guessScore>this.score){
          this.alert("竞猜数量不能大于当前已有来粉币数量")
          return
        }
        this.isShowGuess=true;
        this.stake = stake;
      },
      starStake() {
        this.post({
          url: "/salter/guess/stake",
          data: {
            userId: this.globalData.user.id,
            score: this.guessScore,
            guessId: this.guess.id,
            stake: this.stake
          }
        }).then(res => {
          if (res.success) {
            this.flushUserData();
            this.globalData.user.isGuess=0
            this.flushGameNum();
            this.alert("请等待公布竞猜结果");
          } else {
            this.alert(res.msg);
          }
        });
      },
      scoreChange(e) {
        this.guessScore = e.mp.detail;
      },
      kaijiang() {
        if (this.guessScore == 0) {
          return;
        }
        if (this.select == this.result) {
          this.post({
            url: "/salter/guess/doubleScore",
            data: { userId: this.globalData.user.id, score: this.guessScore }
          }).then(res => {
            this.alert("恭喜您猜对了，获得" + this.guessScore * 2 + "来粉币");
            this.guessScore = 0;
            this.select = "";
          });
          return false;
        }
        this.alert("很遗憾您猜错了");
        this.guessScore = 0;
        this.select = "";
      },
      getFormat(msec) {
        let ss = parseInt(msec / 1000);
        let ms = parseInt(msec % 1000);
        let mm = 0;
        if (ss > 60) {
          mm = parseInt(ss / 60);
          ss = parseInt(ss % 60);
          if (mm > 60) {
            mm = parseInt(mm % 60);
          }
        }
        ss = ss > 9 ? ss : `0${ss}`;
        mm = mm > 9 ? mm : `0${mm}`;
        return { ms, ss, mm };
      },
      flushWaitDate() {
        var _this = this;
        this.intervalid = setInterval(() => {
          if (this.guess.waitDate - 1000 < 0) {
            return;
          }
          this.guess.waitDate = this.guess.waitDate - 1000;
          this.waitDate = this.getFormat(this.guess.waitDate - 1000);
          console.log(this.waitDate);
          if (this.waitDate.ss <= 0) {
            setTimeout(function() {
              _this.getPrevGuess();
              _this.getCurrentGuess();
            }, 1200);
          }
        }, 1000);
      },
      getPrevGuess() {
        this.post2({
          url: "/salter/guess/getPrevGuess",
          data: { guessId: this.guess.id, userId: this.globalData.user.id }
        }).then(res => {
          if (res.success) {
            this.flushUserData();
            this.alert("恭喜您猜对了，获取" + res.data + "来粉币");
          } else {
            if ("不弹框" == res.msg) {
              return false;
            }
            this.alert(res.msg);
          }
        });
      },
      getCurrentGuess() {
        this.post2({
          url: "/salter/guess/getCurrentGuess",
          data: {}
        }).then(res => {
          this.guess = res.data;
          this.waitDate = this.getFormat(this.guess.waitDate);
        });
      }
    },
    onShow() {
      let _this = this;
      _this.show = false;
      clearInterval(this.intervalid);
      this.getCurrentGuess();
      this.flushWaitDate();
      this.checkBannerResource(function() {
        _this.show = true;
      });
    },
    onShareAppMessage(res) {
      return {
        title: '玩烧脑小游戏获取积分，积分可兑换现金红包！~',
        path: '/pages/home/main?a='+this.globalData.active.id+"&u="+this.globalData.user.id
      }},
    mounted() {
       let _this = this;
      this.isOpenFun=  this.globalData.active.isOpenFun;
      this.flushUserData();
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
            this.globalData.user.isGuess=1
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
            console.log("没有看完");
          }
        });
      }

    }
  };
</script>


<template>
  <div>

    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/labe_bg_2.png"
      style="position:fixed;z-index:-10;width:100%;height:100%;"
    >
    <!--==================下一步按钮============================-->
    <div
      style="width:100%;text-align:center;position:fixed;z-index:10;"
      :style="{'bottom':buttonBottom}"
    >
      <form @submit="nextPage" report-submit="true">
        <button
          style="width:32%;padding:0;line-height:0;background-color:transparent;border:none;"
          plain="true"
          form-type="submit"
        >
          <img
            src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/next_button.png"
            style="width:100%;margin-top:10px;"
            mode="widthFix"
          >
        </button>
      </form>
    </div>

    <div v-show="show" class="center" style=" width:100%;position: fixed;bottom: 22%;">
      <div style="width: 300px;">
        <ad  unit-id="adunit-7dff38f9301dc30f" ad-intervals="30" ></ad>
      </div>

    </div>

    <!--==================下一步按钮============================-->
    <div style="position:fixed;width:100%;height:100%;">
      <!--下面img为标题-->
      <div class="title" style="width: 100%;height:120px">
        <div style="font-size: 14px;color: white;font-weight: 600;width: 60%;text-align: center;word-wrap:break-word ">
          {{puzzle.question}}
        </div>
      </div>
      <div style="width:90%;margin-left:5%;">
        <div style="width:65%;text-align:left;float:left;margin-left:30%;position:relative;">
          <!--==============女性三个标签begin===============-->
          <template v-for="item in puzzleDetails">
            <div class="puzzle" style="width: 70%;height: 30px;background-color: white" @click="seleceLabel(item)">
              <div style="font-size: 16px;color:black;font-weight: 600">{{item.answerName}}</div>
            </div>
            <div
              :style="item.id==selectAnswer.id?{'display':'block'}:{'display':'none'}"
              style="position:relative;"
            >
              <img
                src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/select.png"
                style="width:10%;position: absolute;top: 50%;transform: translateY(-100%);transform: translateY(-150%);right:30%;"
                mode="widthFix"
              >
            </div>
            <img
              src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_label_under.png"
              style="width:70%;display:block;"
              mode="widthFix"
            >
          </template>
          <!--==============女性三个标签end===============-->
        </div>
      </div>
      <div class="center" style="width: 100%">
        <div class="center" style="background-color: #FAE6E1;width: 55%;height: 35px;border-radius: 40px;margin-top: 10px;" >
            <span style="font-size: 14px;color: #D68567">
              邀请好友获取一个红包钥匙
              <button open-type='share' size="mini" plain="true" id='btnShare0'   style="padding:0;line-height:0;background-color:transparent;border:none;"></button>
            </span>
        </div>

      </div>
    </div>


    <van-dialog style="text-align: center;" use-slot :show="isLookVideo" title=" " confirmButtonText="获取答题机会"
                :confirmButtonColor="confirmButtonColor" @confirm="goLookVideo" @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>{{msg}}</div>
      </div>
    </van-dialog>

    <van-dialog style="text-align: center;" use-slot :show="isLookVideo2" title=" " confirmButtonText="十倍奖励"
                cancelButtonText="普通奖励"
                :confirmButtonColor="confirmButtonColor" @confirm="doubleReward" @cancel="plainReward" @close="close"
                show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>恭喜您回答正确，观看视频可以获取十倍来粉币奖励哦~</div>
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
  .title {
    align-items: center;
    justify-content: center;
    display: flex;
    background: url("http://star.peyesight.cn/images/studio.png");
    background-size: 100% 100%;
  }

  .puzzle {
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .big_bg {
    width: 100%;
    height: 100%;
  }

  .problem {
    width: 100%;
    height: 30px;
    background-color: white;
    color: white;
    margin-top: 30px;
  }
</style>

<script>
  // 在页面中定义激励视频广告
  let videoAd = null;
  export default {
    data() {
      return {
        isLoad:false,
        puzzle: {},
        puzzleDetails: [],
        buttonBottom: "6.5%",
        selectAnswer: {},
        answerId: null,
        nextIndex: 0,
        puzzleId: null,
        isLookVideo: false,
        isLookVideo1: false,
        isLookVideo2: false,
        confirmButtonColor: "#814552",
        isDouble: 1,
        videoType: "revive",
        isAnswer: true,
        msg: "回答错误，观看完整视频后，可重新获取答题机会",
        isCheck: false,
        show:false,
        isOpenFun:0,
        flag:true,
        isTimes:false
      };
    },

    components: {},

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
      doubleReward() {
        this.videoType = "reward";
        this.goLookVideo();
      },
      plainReward() {
        this.dailyAnswer();
      },
      savePuzzleLog(logMessage, correct) {
        this.post({
          url: "/salter/wx_app_puzzle_log/save",
          data: { userId: this.globalData.user.id, logMessage: logMessage, puzzleId: this.puzzle.id, correct: correct }//
        }).then(res => {
        });
      },
      nextPageHome() {
        this.redirectTo("/pages/home/main");
      },
      getPuzzle() {
        this.post({
          url: "/salter/puzzle/search",
          data: { userId: this.globalData.user.id }
        }).then(res => {
          let puzzle = res.data;
          this.puzzle = puzzle;
          this.puzzleDetails = puzzle.puzzleDetail;
        });

      },
      closeLookVideo1() {
        this.isLookVideo1 = false;
        this.isLookVideo = false;
        this.navigateTo("/pages/home/main");
      },
      close() {
        this.isLookVideo2 = false;
        this.isLookVideo = false;
      },
      seleceLabel(item) {
        this.selectAnswer = item;
      },
      dailyAnswer() {
        this.post({
          url: "/salter/puzzle/dailyAnswer",
          data: { userId: this.globalData.user.id, isTimes: this.isTimes }
        }).then(res => {
          this.savePuzzleLog("答题成功！", true);
          this.isTimes=false;
          this.videoType="revive";
          this.alert(res.data);
          return;
        });
      },
      nextPage(e) {
        if (this.isNull(this.selectAnswer.id)) {
          this.alert("请选择答案！");
          return;
        }
        if (! this.globalData.user.isAnswer) {
          this.isLookVideo = true;
          this.msg = "您的答题机会已用完，可观看视频重新获取";
          return;
        }
        if (this.selectAnswer.isRightKey == 1) {
          this.getPuzzle();
          this.savePuzzleLog("答题成功！", false);
          this.isLookVideo2 = true;
        } else {
          this.savePuzzleLog("答题错误！", false);
          this.isLookVideo = true;
          this.globalData.user.isAnswer=0
          this.flushGameNum();
        }
        this.selectAnswer = {};
        this.isDouble = 1;
      },
      goLookVideo() {
        if(!this.isOpenFun) {
          this.alert("来粉赚测试结束，筹备发布公测版本，暂停视频观看");
          return;
        }
         this.checkVideoResource();
      }
    },
    onShareAppMessage(res) {
      return {
        title: '玩烧脑小游戏获取积分，积分可兑换现金红包~',
        path: '/pages/home/main?a='+this.globalData.active.id+"&u="+this.globalData.user.id,
        imageUrl:"http://star.peyesight.cn/images/share.png"
      }},
    mounted() {
      let _this = this;
      _this.puzzle = {};
      _this.puzzleDetails = [];
      _this.selectId = null;
      _this.isLookVideo1 = false;
      _this.isLookVideo = false;
      _this.nextIndex = 0;
      _this.selectId = null;
      _this.answerId = null;
      _this.score = null;
      _this.puzzleId = null;
      _this.getPuzzle();
      this.isOpenFun=  this.globalData.active.isOpenFun;
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
            console.log(this.videoType);
            if (this.videoType == "revive") {
              this.savePuzzleLog("答题失败！视频观看看完", false);
              this.globalData.user.isAnswer=1
              this.flushGameNum();
              this.msg="回答错误，观看完整视频后，可重新获取答题机会"
              this.getPuzzle();
              this.alert("恭喜您获取一次答题机会");
              return false;
            }
            if (this.videoType = "reward") {
              this.isTimes=true;
              this.dailyAnswer();
              return false;
            }
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
            this.getPuzzle();
            this.videoType = "revive"
            this.savePuzzleLog("答题失败！视频观看没有看完", false);
            console.log("没有看完");
          }
        });
      }
    },
    onShow() {
      let _this = this;
      _this.show = false;
      this.checkBannerResource(function() {
        _this.show = true;
      });
    }
  };
</script>


<template>
  <div class="color-container">
    <div v-show="show" style="width: 300px;">
      <ad  unit-id="adunit-7dff38f9301dc30f" ad-intervals="30" ></ad>
    </div>

    <!--<div class="size-wrap">-->
      <!--<div>选择关卡</div>-->
      <!--<div @click="selectSize(size * 10)" :class="'size-' + (size + 1)" v-for="size in 5" :key="size">{{size + 1}}</div>-->
    <!--</div>-->
    <div class="step-wrap">
      <div>当前关卡</div>
      <div class="step">{{blockCount/nextAddNum}}</div>
      <div>剩余步数</div>
      <div class="step">{{step}}</div>
    </div>

    <div class="game-panel">
      <div v-for="(index, col) in (blockCount * blockCount)" :key="col" :style="'width: ' + blockSize + '; height: ' + blockSize + ';'">
        <div class="col-item" :class="blockColors[index]"></div>
      </div>
    </div>
    <div class="color-btn-wrap">
      <div v-for="color in colors" :key="color" class="color-btn" :class="color" @click="clearBlock(color)"></div>
    </div>
    <div class="center" style="width: 100%">
      <div class="center" style="background-color: #FAE6E1;width: 55%;height: 35px;border-radius: 40px;margin-top: 10px;" @click="clock">
            <span style="font-size: 14px;color: #D68567">
              邀请好友获取一个红包钥匙
              <button open-type='share' size="mini" plain="true" id='btnShare0'   style="padding:0;line-height:0;background-color:transparent;border:none;"></button>
            </span>
      </div>

    </div>


    <div class="rule-wrap">
      <div>游戏规则：</div>
      <div>点击下方色块，以左上角为原点，逐步吞噬相邻颜色，直到所有颜色统一</div>
    </div>


    <div v-show="isSuccess" class="success-panel">
      <div class="success-text">闯关成功</div>
      <span @click="nextPass" class="next-pass">下一关</span>
    </div>

    <div v-show="isOver" class="over-panel">
      <div class="over-text">游戏结束</div>
      <span @click="rePlay" class="restart">重新开始</span>
    </div>

    <van-dialog style="text-align: center;" use-slot :show="isLookVideo" title=" " confirmButtonText="获取步数"
                :confirmButtonColor="confirmButtonColor" @confirm="goLookVideo"   @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>步数已用完，观看视频可获取5个步数哦~</div>
      </div>
    </van-dialog>

    <van-dialog style="text-align: center;" use-slot :show="selectReward" title=" " confirmButtonText="十倍奖励" cancelButtonText="普通奖励"
                :confirmButtonColor="confirmButtonColor" @confirm="goLookVideo" @cancel="nextPass"    @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>观看视频可以获取十倍来粉币奖励哦</div>
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
import _ from 'underscore'
let videoAd = null;
export default {
  data () {
    return {
      passNum:1,
      isLookVideo:false,
      isOver: false,
      isSuccess: false,
      step: 1,
      blockCount: 3,
      colors: ['red', 'yellow', 'blue', 'green'],
      blockColors: {},
      videoEndFun:"rePlay",
      isDouble:1,
      confirmButtonColor: "#814552",
      currentColorCount:0,
      nextAddNum:3,
      isCheck: false,
      shwo:false,
      isOpenFun:0,
      flag:true,
      selectReward:false,
      videoType: "revive",
      isTimes:false
    }
  },
  onShow(){
    let _this = this;
    _this.show = false;
    this.checkBannerResource(function() {
      _this.show = true;
    });
  },
  mounted(){
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
          if(this.videoType=="revive"){
            _this.step=5
          }
          if(this.videoType="reward"){
            this.isTimes=true;
            this.nextPass();
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
          console.log("没有看完")
        }
      })
    }

  },
  created () {
    this.init()
  },
  computed: {
    blockSize () {
      return (1 / this.blockCount) * 100 + '%'
    }
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
    checkGameStatus () {
      let colors = _.groupBy(this.blockColors)
      if(_.size(colors)===2){
        this.currentColorCount+=1
      }
      console.log(_.size(colors))
      if (_.size(colors) === 1||this.currentColorCount==2) {
        this.selectReward=true;
        this.passNum++;
        this.selectSize(this.blockCount + this.nextAddNum);
        this.currentColorCount=0
        return
      }
      if (this.step <=0) {
        this.isLookVideo=true;
      }
    },
    nextPass () {
      this.post({
        url: "/salter/game/colorReward",
        data: { userId:this.globalData.user.id ,passNum:this.passNum,isTimes:this.isTimes}
      }).then(res => {
        if(res.success){
          this.videoType="revive";
          this.isTimes=false;
          this.alert(res.data)
        }
      });

    },
    searchPassSome(){
      this.post({
        url: "/salter/game/searchPassSome",
        data: { userId: this.globalData.user.id }
      }).then(res => {
        this.passNum=res.data
      });
    },
    passReward(){
      this.post({
        url: "/salter/game/passReward",
        data: { userId: this.globalData.user.id,isDouble:this.isDouble,passNum:this.blockCount/this.nextAddNum }
      }).then(res => {
         this.alert("恭喜您获取"+res.data+"来粉币通关奖励,自动进入下一关");
        this.selectSize(this.blockCount + this.nextAddNum);
        this.isDouble=1
         //this.flushUserData();
      });
    },
    close(){
      this.isLookVideo=false;
    },
    plainReward(){
      this.passReward();
    },
    doubleReward(){
      this.isDouble=2;
      this.videoEndFun="passReward";
      // 用户触发广告后，显示激励视频广告
     this.showVideo();
    },
    goLookVideo(){
      if(!this.isOpenFun) {
          this.alert("来粉赚测试结束，筹备发布公测版本，暂停视频观看");
          return;
        };
         this.checkVideoResource();
    },
    rePlay(){
      this.videoEndFun="rePlay";
      this.showVideo();
    },
    clearBlock (color) {
      if(this.step<=0){
        this.isLookVideo=true;
        return;
      }
      if (color === this.blockColors[0]) {
        return
      }
      this.step = this.step - 1
      this.selectedColor = color
      console.log(Date.now())
      this.getNeedCleanBlock(0)
      this.changeSelectColor()
    },
    changeSelectColor () {
      var blockColors = Object.assign({}, this.blockColors)
      for (const key of this.needCleanBlock) {
        blockColors[key] = this.selectedColor
      }
      this.blockColors = blockColors

      this.checkGameStatus()
    },
    getNeedCleanBlock (index) {
      this.needCleanBlock = [index]
      let blockStark = [index]
      do {
        let surroundBlocks = this.getSurroundBlock(blockStark.pop())
        for (let blockIndex of surroundBlocks) {
          if (_.indexOf(this.needCleanBlock, blockIndex) === -1) {
            this.needCleanBlock.push(blockIndex)
            blockStark.push(blockIndex)
          }
        }
      } while (blockStark.length > 0)
      console.log('finished', this.needCleanBlock, Date.now())
    },
    getSurroundBlock (index) {
      let color = this.blockColors[index]
      let surroundBlock = []
      if (index % this.blockCount !== this.blockCount - 1 && _.indexOf(this.needCleanBlock, index + 1) === -1 && color === this.blockColors[index + 1]) {
        surroundBlock.push(index + 1)
      }
      if (index % this.blockCount !== 0 && _.indexOf(this.needCleanBlock, index - 1) === -1 && color === this.blockColors[index - 1]) {
        surroundBlock.push(index - 1)
      }
      if (_.indexOf(this.needCleanBlock, index + this.blockCount) === -1 && color === this.blockColors[index + this.blockCount]) {
        surroundBlock.push(index + this.blockCount)
      }
      if (_.indexOf(this.needCleanBlock, index - this.blockCount) === -1 && color === this.blockColors[index - this.blockCount]) {
        surroundBlock.push(index - this.blockCount)
      }
      return surroundBlock
    },
    selectSize (size) {
      console.log(size)
      this.blockCount = size
      this.init()
    },
    init () {
      this.isOver = false
      this.isSuccess = false
      this.step = Math.ceil(this.blockCount*1.3 )+this.step
      let blockColors = {}
      for (let w = 0; w <= this.blockCount * this.blockCount; w++) {
        blockColors[w] = _.sample(this.colors)
      }
      this.blockColors = blockColors
    }
  },
  onShareAppMessage(res) {
    return {
      title: '玩烧脑小游戏获取积分，积分可兑换现金红包！~',
      path: '/pages/home/main?a='+this.globalData.active.id+"&u="+this.globalData.user.id,
      imageUrl:"http://star.peyesight.cn/images/share.png"
    }},
}
</script>

<style scoped>
.color-container {
  margin: auto;
  max-width: 380px;
}

.size-wrap {
  padding: 15px 15px 0;
  display: flex;
  justify-content: space-around;
  color: #333;
  font-weight: 600;
}

.size-wrap .size-1 {
  color: #eee;
}

.size-wrap .size-2 {
  color: #ddd;
}

.size-wrap .size-3 {
  color: #ccc;
}

.size-wrap .size-4 {
  color: #bbb;
}

.size-wrap .size-5 {
  color: #aaa;
}

.step-wrap {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  justify-content: center;
}

.step-wrap .step {
  margin: 0 10px;
  font-weight: 600;
  color: #555;
}

.game-panel {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px auto;
  position: relative;
  width: 90vw;
  height: 90vw;
  max-width: 380px;
  max-height: 380px;
  overflow: hidden;
}

.col-item {
  width: 100%;
  height: 100%;
  display: inline-block;
}

.red {
  background-color: #FFC1C1;
}

.yellow {
  background-color: #EEEE00;
}

.blue {
  background-color: #1E90FF;
}

.green {
  background-color: #66CD00;
}

.color-btn-wrap {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.color-btn {
  border-radius: 10px;
  width: 10vw;
  height: 20vw;
  max-width: 80px;
  max-height: 120px;
}

.rule-wrap {
  padding: 15px;
  color: #636881;
  font-size: 15px;
}

.over-panel {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.over-text {
  font-size: 18px;
  color: #4B0082;
  margin-top: 150px;
  font-weight: bold;
  animation: trans-animation 2s linear .1s infinite alternate;
}

.restart {
  margin-top: 30px;
  padding: 10px 15px;
  background-color: #B0E2FF;
  border-radius: 15px;
  display: inline-block;
  color: #fff;
}

.success-panel {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.success-text {
  font-size: 18px;
  color: #333;
  margin-top: 150px;
  font-weight: bold;
  animation: trans-animation 2s linear .1s infinite alternate;
}

.next-pass {
  margin-top: 30px;
  padding: 10px 15px;
  background-color: #BCEE68;
  border-radius: 15px;
  display: inline-block;
  color: #fff;
}

@keyframes trans-animation {
  from {transform: scale(0.9)}
  to {transform: scale(1.3)}
}
</style>

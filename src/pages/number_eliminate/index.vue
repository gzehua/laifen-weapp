<template>
  <div>
    <div v-show="show" >
      <ad   unit-id="adunit-7dff38f9301dc30f" ad-intervals="30" ></ad>
    </div>

    <div class="step-wrap">
      <div>当前关卡</div>
      <div class="step">{{passNum}}</div>
      <div class="step">达成{{passNum*passScore}}分通关</div>
      <div>剩余步数</div>
      <div class="step">{{step}}</div>
    </div>
    <div class="source-wrap">得分：{{source}}</div>
    <div class="game-panel"
      catchtouchmove
      @touchstart="start"
      @touchmove="move"
      @touchend="end">
      <div class="col-wrap" v-for="(item, index) in blockCount * blockCount" :key="index">
        <div class="col" :class="'num-' + blockNumbers[index]" v-if="blockNumbers[index]" :data-index="index">{{blockNumbers[index]}}</div>
      </div>
    </div>

    <div class="rule-wrap">
      <div>游戏规则：</div>
      <div>移动数字，三个及以上相邻的数字会消除</div>
      <div>如果遇到没有可消除的情况，可返回首页重新进入，会保留关卡</div>
    </div>

    <van-dialog style="text-align: center;" use-slot :show="isLookVideo" title=" " confirmButtonText="获取步数"
                :confirmButtonColor="confirmButtonColor" @confirm="goLookVideo"   @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>步数已用完，观看视频可获取10个步数哦~</div>
      </div>
    </van-dialog>

    <van-dialog style="text-align: center;" use-slot :show="selectReward" title=" " confirmButtonText="十倍奖励" cancelButtonText="普通奖励"
                :confirmButtonColor="confirmButtonColor" @confirm="goLookVideo" @cancel="numberPassReward"    @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>观看视频可以获取十倍来粉币奖励哦</div>
      </div>
    </van-dialog>


  </div>
</template>

<script>
import _ from 'underscore'
let videoAd = null;
export default {
  data () {
    return {
      step:10,
      passNum:1,
      source: 0,
      blockCount: 5,
      startIndex: '',
      initNumber: [1, 2, 3, 4, 5],
      blockNumbers: {},
      confirmButtonColor: "#814552",
      isLookVideo:false,
      passScore:100,
      isCheck:true,
      show:false,
      isOpenFun:0,
      flag:true,
      selectReward:false,
      videoType: "revive",
      isTimes:false
    }
  },
  mounted () {
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
            this.step=10
          }
          if(this.videoType="reward"){
            this.isTimes=true;
            this.numberPassReward();
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
    this.source =(this.passNum-1)*100
    this.init()
  },
  onShow(){
    let _this = this;
    _this.show = false;
    this.checkBannerResource(function() {
      _this.show = true;
    });
  },
  methods: {
    numberPassReward(){
      this.passNum+=1;
      if(this.initNumber.length<15){
        this.initNumber[this.initNumber.length]= this.initNumber[this.initNumber.length-1]+1
      }
      this.step+=10;
      this.post({
        url: "/salter/game/numberPassReward",
        data: { userId:this.globalData.user.id ,passNum:this.passNum,isTimes:this.isTimes}
      }).then(res => {
        if(res.success){
          this.videoType="revive"
          this.isTimes=false;
          this.alert(res.data)
        }
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
    close(){
      this.isLookVideo=false;
      this.selectReward=false;
    },
    goLookVideo(){
         if(!this.isOpenFun) {
          this.alert("来粉赚测试结束，筹备发布公测版本，暂停视频观看");
          return;
        };
         this.checkVideoResource();

    },
    start (e) {
      console.log(e)
      this.startX = e.mp.changedTouches[0].pageX
      this.startY = e.mp.changedTouches[0].pageY
      this.startIndex = parseInt(e.target.dataset.index)
    },
    move (e) {
      e.preventDefault()
    },
    end (e) {
      if(this.step<=0){
        this.isLookVideo=true;
        return;
      }
      e.preventDefault()
      this.endX = e.mp.changedTouches[0].pageX
      this.endY = e.mp.changedTouches[0].pageY

      let moveX = this.endX - this.startX
      let moveY = this.endY - this.startY

      if (Math.abs(moveX) > Math.abs(moveY)) {
        if (moveX > 0) {
          console.log('右')
          this.moveBlock(this.startIndex + 1)
        } else if (moveX < 0) {
          console.log('左')
          this.moveBlock(this.startIndex - 1)
        }
      } else if (Math.abs(moveX) < Math.abs(moveY)) {
        if (moveY > 0) {
          console.log('下')
          this.moveBlock(this.startIndex + this.blockCount)
        } else if (moveY < 0) {
          console.log('上')
          this.moveBlock(this.startIndex - this.blockCount)
        }
      }
      this.step--;
      setTimeout(() => {
        if(this.step<=0){
          this.isLookVideo=true;
        }
      }, 205)
    },
    moveBlock (targetIndex) {
      if (this.cleaning) {
        return
      }
      let xIndex = this.startIndex % this.blockCount
      if (xIndex === 4 && targetIndex % this.blockCount === 0) {
        return
      } else if (xIndex === 0 && targetIndex % this.blockCount === 4) {
        return
      } else if (targetIndex > (this.blockCount * this.blockCount) || targetIndex < 0) {
        return
      }

      var blockNumbers = Object.assign({}, this.blockNumbers)
      let startNumber = blockNumbers[this.startIndex]
      blockNumbers[this.startIndex] = blockNumbers[targetIndex]
      blockNumbers[targetIndex] = startNumber

      this.blockNumbers = blockNumbers

      this.cleaning = true
      setTimeout(() => {
        this.checkNearBlock()
      }, 200)
    },
    checkNearBlock () {
      let hasNeedClearBlock = false
      for (let index = 0; index < this.blockCount * this.blockCount; index++) {
        let nearBlock = [index]
        let blockStark = [index]
        do {
          let surroundBlocks = this.getSurroundBlock(blockStark.pop(), nearBlock)
          for (let blockIndex of surroundBlocks) {
            if (_.indexOf(nearBlock, blockIndex) === -1) {
              nearBlock.push(blockIndex)
              blockStark.push(blockIndex)
            }
          }
        } while (blockStark.length > 0)
        if (nearBlock.length >= 3) {
          hasNeedClearBlock = true
          this.cleanBlock(nearBlock)
          break
        }
      }
      if (!hasNeedClearBlock) {
        this.cleaning = false
      }
    },
    getSurroundBlock (index, needCleanBlock) {
      let number = this.blockNumbers[index]
      let surroundBlock = []
      if (index % this.blockCount !== 4 && _.indexOf(needCleanBlock, index + 1) === -1 && number === this.blockNumbers[index + 1]) {
        surroundBlock.push(index + 1)
      }
      if (index % this.blockCount !== 0 && _.indexOf(needCleanBlock, index - 1) === -1 && number === this.blockNumbers[index - 1]) {
        surroundBlock.push(index - 1)
      }
      if (_.indexOf(needCleanBlock, index + this.blockCount) === -1 && number === this.blockNumbers[index + this.blockCount]) {
        surroundBlock.push(index + this.blockCount)
      }
      if (_.indexOf(needCleanBlock, index - this.blockCount) === -1 && number === this.blockNumbers[index - this.blockCount]) {
        surroundBlock.push(index - this.blockCount)
      }
      return surroundBlock
    },
    cleanBlock: function(blocks) {
      console.log(blocks);
      let currentIndex = blocks[0];
      let number = this.blockNumbers[currentIndex] + 1;
      for (let index of blocks) {
        this.$set(this.blockNumbers, index, "");
      }
      this.$set(this.blockNumbers, currentIndex, number);
      this.source += (blocks.length * number);
      this.fullBlock(blocks, currentIndex).then(
        () => {
          setTimeout(() => {
            this.checkNearBlock();
          }, 300);
        }
      );
    if(this.source>this.passNum*this.passScore){
      this.selectReward=true;
    }

    },
    fullBlock (blocks, currentIndex) {
      var blockNumbers = Object.assign({}, this.blockNumbers)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          for (let index of blocks) {
            if (index !== currentIndex) {
              blockNumbers[index] = _.sample(this.initNumber)
            }
          }
          this.blockNumbers = blockNumbers
          resolve()
        }, 300)
      })
    },
    init () {
      let blockNumbers = {}
      for (let w = 0; w < this.blockCount * this.blockCount; w++) {
        blockNumbers[w] = _.sample(this.initNumber)
      }
      this.blockNumbers = blockNumbers
      this.checkNearBlock()
      console.log(_.groupBy(this.blockNumbers))
    }
  },
  onShareAppMessage (res) {
    return {
      title: '简单怀旧小游戏集合,快来一起玩吧！'
    }
  }
}
</script>

<style scoped>
.source-wrap {
  padding: 30px;
  display: flex;
  align-items: center;
  color: #555;
  font-weight: 600;
  justify-content: center;
}

.rule-wrap {
  padding: 15px;
  color: #636881;
  font-size: 15px;
}

.game-panel {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: auto;
  width: 80vw;
  height: 80vw;
  max-width: 375px;
  max-height: 375px;
  background-color: #444;
  box-shadow: 0 2px 10px #bbb;
}

.game-panel .col-wrap {
  background-color: #fff;
  width: 18%;
  height: 18%;
}

.game-panel .col {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.col:active {
  transform: scale(0.9)
}

.game-panel .num-1 {
  background-color: #FFE4B5;
  color: #fff;
  animation: trans-animation .5s;
}

.game-panel .num-2 {
  background-color: #FFC0CB;
  color: #fff;
  animation: trans-animation .5s;
}

.game-panel .num-3 {
  background-color: #FF1493;
  color: #E0E0E0;
  animation: trans-animation .5s;
}

.game-panel .num-4 {
  background-color: #EEB422;
  color: #FFF;
  animation: trans-animation .4s;
}

.game-panel .num-5 {
  background-color: #E0E0E0;
  color: #fff;
  animation: trans-animation .5s;
}

.game-panel .num-6 {
  background-color: #D8BFD8;
  color: #fff;
  animation: trans-animation .4s;
}

.game-panel .num-7 {
  background-color: #CDAD00;
  color: #FFF;
  animation: trans-animation .4s;
}

.game-panel .num-8 {
  background-color: #CFF5CD;
  color: #FFF;
  animation: trans-animation .3s;
}

.game-panel .num-9 {
  background-color: #CD5B45;
  color: #FFF;
  animation: trans-animation .3s;
}

.game-panel .num-10 {
  background-color: #B23AEE;
  color: #FFF;
  animation: trans-animation .3s;
}

@keyframes trans-animation {
  from {transform: translateY(-200%)}
  to {transform: translateY(0)}
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
</style>

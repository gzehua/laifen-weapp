<template style="height: 100%">
  <div style="width: 100%;height: 100%;position:fixed;background-color: #FB661D">
    <div class="lucky-title" style="height: 18%">
      <div @click="showLottery" style="width:100%;font-size: 14px;color:#6b4d55;position: absolute;text-align: right;">
        <span class="center" style="float: right;color: #f5db4c;padding-top: 20%;padding-right: 5px;">抽奖规则<image
          style="width: 15px;height: 15px;margin-left: 4px;" src="http://star.peyesight.cn/images/info.png"/></span>
      </div>
    </div>

    <!--<div :class="user.enable?'':'mask-layer'"></div>-->
    <div class="content">
      <!--<div class="lucky-title"></div>-->
      <div class="conts">
        <div class="box">
          <div class="pointer" :class="enable===2?'animation circle_bottom':''"
               :style="enable===2?'top:34%;left:37%;':''" @click="checkLotteryNum()">
          </div>
          <div class="boxbg" :style="{transform:rotate_angle,transition:rotate_transition}">
            <div class="turn">

              <div :class="{'wheel-bg6':true}">
                <div class="prize-list">
                  <ul class="ulOne" :class="{'win':indexa===0&&prize_list.length==3}">
                    <li v-for="(item,index) in arrOne" :class="{'win':index===indexa}"
                        :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
                  </ul>
                  <ul class="ulTwo" :class="{'win':indexa===arrOne.length-1}">
                    <li v-for="(item,index) in arrTwo" :class="{'win':index===indexb}"
                        :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
                    <li v-if="prize_list.length==3" :class="{'win':indexb===0}"
                        style="border:none;z-index:4; transform: rotate(329deg)"></li>
                  </ul>
                  <div></div>
                </div>
                <div class="prize-list">
                  <div class="prize-item" v-for="(item,index) in prize_list" :key="index"
                       :style="{transform:item.troter,width:item.width}">
                    <div class="prize-pic">
                      <image :src='item.prize_image' style="width: 45px;margin-bottom: 10px;" mode="widthFix"/>

                    </div>
                    <div class="prize-name" style="padding-top: 15px;">
                      {{item.prizes_level}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div style="font-size: 14px;color:#6b4d55; width: 100%;text-align: center;margin-top: 10px;"
           @click="skipToLotteryRecord">
        <span style="color: white;opacity: 0.8">拥有抽奖次数：</span><span style="color:#FFFF00 ">{{lotteryNum}}</span>
        <!--<span class="center" style="float: right;color: #f5db4c;padding-right: 5px;">中奖记录<image style="width: 15px;height: 15px;margin-left: 4px;" src="http://star.peyesight.cn/images/lottery_record.png"/></span>-->
        <!--<image style="width: 80px;" mode="widthFix" src="http://star.peyesight.cn/images/lotteryrecord.png"></image>-->
      </div>

      <div style="background-color: #E86245;margin-top: 10px">
        <div style="text-align: center;color: white;font-size: 14px;opacity: 0.8">兑换区</div>

        <div style="width: 100%; overflow-x: auto;display: flex;flex-direction: row;flex-shrink: 0;margin-top: 15px; ">


          <div v-for="(item,index) in lotteryRecord" @click="openRedpackets(index)" class="center"
               style="width: 70px;height: 60px;background-color: white;flex-direction:column;border-radius: 10px;flex-shrink: 0;margin-left: 10px">
            <image :src="item.lotteryPrize.prizes.prizeImage"
                   :style="'width: 60%;opacity:'+  (item.statusStr=='未解锁'?1:0.5)" mode="widthFix"/>
            <div style="font-size: 12px;color: #C36969">{{item.statusStr}}</div>
          </div>


        </div>

      </div>

      <van-dialog custom-style="margin-top: 20%" :show="showLotteryDialog" @close="close" use-slot
                  :confirmButtonText="confirmButtonText">
        <div style="color: #814552;font-size: 14px;margin-top: 10px;">
          <div style="text-align: center">抽奖规则</div>
        </div>
        <div style="color: black;font-size: 12px;padding: 10px;">
          <div style="text-align: center">
            <div style="text-align: left !important; color:#777777;   padding: 10px;">
              <rich-text class='text_plain' :nodes="lotteryTurntable.description"></rich-text>

            </div>
          </div>
        </div>
      </van-dialog>

      <van-dialog style="text-align: center;" use-slot :show="winshow" :confirmButtonText="confirmButtonText"
                  :confirmButtonColor="confirmButtonColor" @confirm="confirmOK" :showConfirmButton="false">

        <div @click="close" solt="title" style="text-align: right;">
          <image mode="widthFix" style="width: 30px" src="http://star.peyesight.cn/images/guanbi.png"/>
        </div>

        <!--<image src="http://star.peyesight.cn/images/congratulation.png" style="width: 50%" mode="widthFix"/>-->
        <image src="http://star.peyesight.cn/images/zhongjaing.png" style="width: 60%" mode="widthFix"/>
        <div style="color: #814552;font-size: 14px;padding: 10px;">
          <div>恭喜抽中{{winLotteryRecord.lotteryPrize.prizes.prizeName}}</div>
          <image :src="winLotteryRecord.lotteryPrize.prizes.prizeImage" style="width: 40%" mode="widthFix"/>
          <div>使用{{winLotteryRecord.lotteryPrize.hasKeyNum}}个红包钥匙解锁即可获得</div>

          <div style="display:flex;margin-top: 12px;border-top:solid 1px #d5d5d5;width: 100%;">
            <div @click="showIsOpenRedPacket()" class="center" style="flex-grow: 1;border-right:solid 1px #d5d5d5;">
              <image src="http://star.peyesight.cn/images/kaisuo.png" style="width: 30px" mode="widthFix"/>
              <span style="color: #333333">解锁({{keyNum}}/{{winLotteryRecord.lotteryPrize.hasKeyNum}})</span></div>
            <div class="center" style="flex-grow: 1">
              <button open-type='share' size="mini" plain="true" id='btnShare0'
                      style="border:none;display: flex;justify-content: center;align-items: center">邀请好友获取
                <image src="http://star.peyesight.cn/images/yaoshi.png" style="width: 30px" mode="widthFix"/>
              </button>
            </div>
          </div>

          <!--<div style="color: #ce2929;margin-top: 5px;"> {{winPrize.prize_name}}</div>-->
          <!--<div v-if="winPrize.type==1">可前往任意一个主播团成员直播间兑换奖品(首页=>主播团 可查看主播信息)</div>-->
        </div>
      </van-dialog>

      <van-dialog style="text-align: center;" use-slot :show="failshow" title=" " :confirmButtonText="confirmButtonText"
                  :confirmButtonColor="confirmButtonColor">
        <image src="http://star.peyesight.cn/images/sorry.png" style="width: 80%" mode="widthFix"/>
        <div style="color: #814552;font-size: 14px;padding: 10px;">
          <div>感谢关注主播~你下次一定可以中奖的</div>
        </div>
      </van-dialog>
      <!--<van-dialog style="text-align: center;" use-slot :show="isLookVideo" title=" " confirmButtonText="去签到"-->
      <!--:confirmButtonColor="confirmButtonColor" @confirm="goLookVideo" @close="close" show-cancel-button>-->
      <!--<div style="color: #814552;font-size: 14px;padding: 10px;">-->
      <!--<div>来粉币不足，可以签到，答题，获取哦~</div>-->
      <!--</div>-->
      <!--</van-dialog>-->

      <van-dialog style="text-align: center;" use-slot :show="isOpenRedPacket" title=" " confirmButtonText="确认"
                  :confirmButtonColor="confirmButtonColor" @confirm="unlocking()" @close="close" show-cancel-button>
        <div style="color: #814552;font-size: 14px;padding: 10px;">
          <div>确认解锁吗?</div>
        </div>
      </van-dialog>


    </div>
    <div data-v-ce2be3fa="" class="main-bg"></div>
    <!--<div v-show="show"  class="center">-->
    <!--<div style="width: 300px;margin-top: 10px">-->
    <!--<ad  unit-id="adunit-8cbf3077d70de609" ad-intervals="30" ></ad>-->
    <!--</div>-->
    <!--</div>-->

    <van-dialog style="text-align: center;" use-slot :show="isLookVideo" title=" " confirmButtonText="获取抽奖机会"
                :confirmButtonColor="confirmButtonColor" @confirm="goLookVideo" @close="close" show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>可观看完整视频获取一次抽奖机会</div>
      </div>
    </van-dialog>

  </div>
</template>

<style>
  @keyframes twinkling {
    0% {
      opacity: 0.8;
      filter: alpha(opacity=20);
      -webkit-transform: scale(1);
    }
    50% {
      opacity: 1;
      filter: alpha(opacity=50);
      -webkit-transform: scale(1.12);
    }
    100% {
      opacity: 0.8;
      filter: alpha(opacity=20);
      -webkit-transform: scale(1);
    }
  }

  .circle_bottom {
    border-radius: 100%;
    filter: alpha(opacity=40);
  }

  .animation {
    -webkit-animation: twinkling 2.1s infinite;
    animation: twinkling 2.1s infinite;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .mask-layer {
    background-color: rgba(16, 14, 14, 0.56);
    color: rgba(16, 14, 14, 0.56);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
  }

  .lottery_rules {
    font-size: 14px;
    color: #f5db4c;;
    display: flex;
    margin-top: 1px;
    align-items: center

  }


</style>
<script>
  let videoAd = null;
  export default {
    data() {
      return {
        isOpenRedPacket: false,
        hasKeyNum: "",
        keyNum: "",
        lotteryTurntable: {},
        showLotteryDialog: false,
        lotteryNum: 0,
        isLookVideo: false,
        score: "",
        headText: "爱的魔力转圈圈",
        headDetailText: "*每个订单ID拥有1次机会，真爱发电，拒绝虚假形式主义",
        topHeight: "",
        winnum: "0", //中奖的下标
        indexa: "", //中奖的下标在第一个ul下li的index下标，背景变深颜色
        indexb: "", //中奖的下标在第二个ul下li的index下标，背景变深颜色
        toast_control: false, //抽奖结果和活动规则弹出框控制器
        click_flag: true, //是否可以旋转抽奖
        start_rotating_degree: 0, //转盘初始旋转角度
        rotate_angle: 0, //转盘将要旋转的角度
        start_rotating_degree_pointer: 0, //指针初始旋转角度
        rotate_angle_pointer: 0, //指针将要旋转的度数
        rotate_transition: "", //初始化选中的过度属性控制
        rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
        prize_list: [], //奖品列表
        arrOne: [],
        arrTwo: [],
        shopUid: "",
        userinfo: "",
        LotteryRecords: [],
        InterfaceExpressId: "",
        winshow: false,
        failshow: false,
        prizeText: "",
        ambush: "【爱尔康官方旗舰店】https://m.tb.cn/h.edZvacT 点击链接，再选择浏览器咑閞；或復·制这段描述￥dsu5YXhcuhf￥后到淘♂寳♀",
        confirmButtonText: "确认",
        confirmButtonColor: "#814552",
        winPrize: { prize_name: "", prize_image: "", has_key_num: "" },
        winLotteryRecord: { lotteryPrize: { prizes: {} } },
        enable: 0,
        user: {},
        show: false,
        lotteryRecord: [],
        isOpenFun:0,
      };
    },
    onShow() {
      this.winshow = false;
      let _this = this;
      _this.show = false;
      this.checkBannerResource(function() {
        _this.show = true;
      });
      this.searchLotteryRecord();
    },
    onShareAppMessage(res) {
      return {
        title: "玩烧脑小游戏获取积分，积分可兑换现金红包！~",
        path: "/pages/home/main?a=" + 1 + "&u=" + this.globalData.user.id,
        imageUrl: "http://star.peyesight.cn/images/share.png"
      };
    },
    mounted() {
      this.isOpenFun=  this.globalData.active.isOpenFun;
      let _this = this;
      _this.user = this.globalData.user;
      if (!_this.user.enable) {
        this.enable = 2;
      }
      if (_this.user.enable) {
        this.enable = 0;
      }
      this.flushUserData();
      this.post({
        url: "/dt1520/getPrizeList",
        data: { activeId: 1 }
      }).then(res => {
        _this.prize_list = res.data;
        _this.setSan();
      });
      this.post({
        url: "/salter/lottery/searchLottery",
        data: { activeId: 1 }
      }).then(res => {
        _this.lotteryTurntable = res.data;
      });
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
            this.lotteryNum=1
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


    },

    methods: {
      checkLotteryNum(){
        if(this.lotteryNum==0){
          this.isLookVideo=true;
          return;
        }
        this.chou();
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
      showIsOpenRedPacket() {
        if (this.keyNum < this.winLotteryRecord.lotteryPrize.hasKeyNum) {
          this.alert("钥匙不足以开启");
          return false;
        }
        this.isOpenRedPacket = true;
      },
      unlocking() {
        this.post({
          url: "/salter/user/openRedpackets",
          data: {
            activeId: 1,
            userId: this.globalData.user.id,
            lotteryRecordId: this.winLotteryRecord.id
          }
        }).then(res => {
          if (res.success) {
            this.alert("开启成功，已自动进入余额，请在我的中查看收益");
            this.flushUserData();
            this.searchLotteryRecord();
          } else {
            this.alert(res.msg);
          }

        });


      },
      openRedpackets(index) {

        console.log(this.lotteryRecord[index]);
        this.winLotteryRecord = this.lotteryRecord[index];
        if(this.winLotteryRecord.orderStatus==0){
          this.winshow = true;
        }


      },
      searchLotteryRecord() {
        this.post({
          url: "/salter/lottery/searchLotteryRecord",
          data: { activeId: 1, userId: this.globalData.user.id }
        }).then(res => {
          this.lotteryRecord = res.data;
          console.log(res);
        });
      },
      showLottery() {
        this.showLotteryDialog = true;
      },
      close() {
        this.showLotteryDialog = false;
        this.isLookVideo = false;
        this.winshow = false;
        this.isOpenRedPacket = false;
      },
      confirmOK() {
        this.winshow = false;
        if (this.enable === 2) {
          this.globalData.enable = 3;
          this.navigateTo("/pages/index/main");
        }
      },
      skipToLotteryRecord() {
        this.navigateTo("/pages/lottery_record/main");
      },
      chou() {
        this.lotteryNum=0;
        console.log("进来了");
        this.winshow = false;
        let _this = this;
        if (!_this.click_flag) return;
        _this.click_flag = false; // 旋转结束前，不允许再次触发
        _this.indexa = "";
        _this.indexb = "";
        this.post({
          url: "/dt1520/startLottery",
          data: { activeId: 1, userId: this.globalData.user.id }
        }).then(res => {
          if (res.success) {
            this.winLotteryRecord = res.data.winLotteryRecord;
            console.log(this.winLotteryRecord);
            //this.score = this.score - 10;
            _this.winnum = res.data.selected;
            _this.rotating(res.data.selected);
          } else {
            _this.alert(res.msg)
            //_this.isLookVideo = true;
            _this.click_flag = true;
          }

        });

      },

      setSan() {
        let _this = this;
        _this.arrOne = [];
        _this.arrTwo = [];
        _this.rotate_angle = "rotate(" + Math.floor(-360 * 100 / _this.prize_list.length) / 200 + "deg)";
        _this.start_rotating_degree = Math.floor(-360 * 100 / _this.prize_list.length) / 200;
        for (var i = 0; i < _this.prize_list.length; i++) {
          _this.prize_list[i].troter = "rotate(" + Math.floor(360 * 100 / _this.prize_list.length) / 100 * (0.5 + Number(i)) + "deg) translateX(-50%)";
          _this.prize_list[i].width = Math.floor(3.14 * 5.6 / this.prize_list.length) + "rem";
          var item = {
            value: _this.prize_list[i].name,
            zIndex: Number(i) + 1,
            deg: "rotate(" + Math.floor(360 * 100 / this.prize_list.length) * i / 100 + "deg)",
            degnum: i
          };
          if (i < _this.prize_list.length / 2) {
            _this.arrOne.push(item);
          } else {
            _this.arrTwo.push(item);
          }
        }
      },
      rotating(index) { //转盘转动函数，index值为中奖的下标，后台会返回中奖的id，这边会首先for循环判断中奖的下标
        let _this = this;
        _this.rotate_transition = "transform 6s cubic-bezier(0.25,0.1,0.01,1)";

        var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        var during_time = 5; // 默认为1s
        var result_index = index; // 最终要旋转到哪一块，对应prize_list的下标
        var rand_circle = 6; // 附加多转几圈，2-3

        if (type == 0) {
          if (this.start_rotating_degree < 0) {
            this.start_rotating_degree = 0;
          } else {
            this.start_rotating_degree = this.start_rotating_degree + Math.floor(360 * 100 / _this.prize_list.length) / 200;
          }
          var rotate_angle = this.start_rotating_degree + 360 * 10 + Math.floor(-360 * 100 / this.prize_list.length) / 200 - Math.floor(360 * 100 / this.prize_list.length) * result_index / 100;
          this.start_rotating_degree = rotate_angle;
          _this.rotate_angle = "rotate(" + rotate_angle + "deg)";
          // 旋转结束后，允许再次触发
          setTimeout(function() {
            _this.click_flag = true;
            if (_this.winnum < _this.prize_list.length / 2) {
              _this.indexb = "";
              _this.indexa = _this.winnum;
            } else {
              _this.indexa = "";
              _this.indexb = _this.winnum - (_this.arrOne.length);
            }
            setTimeout(function() {
              _this.game_over();
            }, 100);
          }, during_time * 1000 + 1500); // 延时，保证转盘转完
        }
      },
      flushUserData() {
        this.post({
          url: "/wx_app/wx_user/save",
          data: {
            openid: this.globalData.openid,
            appid: this.globalData.appid,
            unionid: this.globalData.user.unionid,
            source: this.globalData.source,
            wxAppActiveId: this.globalData.activeId
          }
        }).then(res => {
          this.score = res.user.score;
          this.keyNum = res.user.keyNum;
        });
      },
      game_over() {
        this.flushUserData();
        console.log(this.prize_list[this.winnum].type);
        let _this = this;

        _this.click_flag = true;
        _this.rotate_transition = "transform  cubic-bezier(0.25,0.1,0.01,1)";
        _this.prizeText = _this.prize_list[_this.winnum].prize_name + _this.prize_list[_this.winnum].prizes_level;
        _this.winPrize = _this.prize_list[_this.winnum];
        _this.setSan();
        _this.confirmButtonText = "确认";
        if (_this.prize_list[_this.winnum].type == 1) {
          _this.winshow = true;
          this.searchLotteryRecord();
        }

        // //谢谢惠顾的type值是4
        // if(_this.prize_list[_this.winnum].type==4){
        //   _this.failshow = true;
        //   return false;
        // }
        // if(_this.prize_list[_this.winnum].type==3){
        //   _this.confirmButtonText="复制口令"
        // }
        // if(_this.prize_list[_this.winnum].type==2){
        //   //积分处理
        // }
        // if(_this.prize_list[_this.winnum].type==1){
        //   _this.confirmButtonText="前去领奖"
        // }

      }
    }

  };

</script>
<style lang="less">
  @import "../../../static/css/styles.less";

  .center {
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .prize {
    border: 1px solid lightcoral;
    font-size: 15px;
  }
</style>


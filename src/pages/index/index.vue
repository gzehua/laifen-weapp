<template >
  <div class="home">
    <div :class="user.enable?'':maskLayer"></div>
    <v-bottom select="index-page"></v-bottom>
    <van-notice-bar
      left-icon="http://star.peyesight.cn/images/laba.png"
      :text="notice"
    />



    <div style="border-radius: 10px;" v-show="swiperBanners.length>0">
      <swiper  style="height:100px;" class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
        <block  v-for="(item, index) in swiperBanners" :index="index" :key="key">
          <swiper-item @click="skipTo(item.skipPath)">
            <image  style="height: 100%;width: 100%" :src="item.imgUrl"  mode="" />
          </swiper-item>
        </block>
      </swiper>

    </div>

    <div class="header" style="width: 96%;height: 100%;margin-left:2%;z-index: 10;position: absolute">


      <div style="width:100%;margin-top:15px;">
        <form @submit="skipToClock" report-submit="true">
        <div style="width:40%;float:left;height:85px;text-align:center;" class="box-1" :class="enable===1?maskLayerClock:''">
          <div class="grid" style=" margin-top:5px;">
              <button
                style="padding:0;line-height:0;background-color:transparent;border:none;"
                plain="true"
                form-type="submit"
              >
                <image class="grid_img" mode="widthFix"
                       src="https://alcon-star.oss-cn-beijing.aliyuncs.com/se/daka.png"></image>
              </button>
          </div>
          <div style="font-size: 0.6rem;color:#ffffff;">每日打卡</div>
        </div>
        </form>

        <div style="width:55%;float:right;text-align:center;" class="box-2">

          <form @submit="skipToPlayTour" report-submit="true">
          <div class="box-2-1 box-2-1-1" style="padding-bottom: 5px" >
            <div class="grid">
              <button
                style="padding:0;line-height:0;background-color:transparent;border:none;"
                plain="true"
                form-type="submit"
              >
                <image class="grid_img_small" mode="widthFix"
                       src="https://alcon-star.oss-cn-beijing.aliyuncs.com/se/qinmidu.png"></image>
              </button>
            </div>
            <div style="font-size: 0.6rem;color:#ffffff;">主播团</div>
          </div>
          </form>
          <form @submit="skipToExchange" report-submit="true">
          <div class="box-2-2 box-2-2-1" style="" >
            <div class="grid">
              <button
                style="padding:0;line-height:0;background-color:transparent;border:none;"
                plain="true"
                form-type="submit"
              >
                <image class="grid_img_small" mode="widthFix"
                       src="http://star.peyesight.cn/images/exchange.png"></image>
              </button>

            </div>
            <div style="font-size: 0.6rem;color:#ffffff;">兑换上号</div>
          </div>
          </form>
          <form @submit="skipToRank" report-submit="true">
          <div class="box-2-1" style="border-right:0.5px #E5E5E5 solid;">
            <div class="grid">
              <button
                style="padding:0;line-height:0;background-color:transparent;border:none;"
                plain="true"
                form-type="submit"
              >
                <image class="grid_img_small" mode="widthFix" src="http://star.peyesight.cn/images/rank.png"></image>
              </button>

            </div>
            <div style="font-size: 0.6rem;color:#ffffff;">排行榜</div>
          </div>
          </form>
          <form @submit="skipToBigPrize" report-submit="true">
          <div class="box-2-2" @click="" >
            <div class="grid">
              <button
                style="width:100%;heightpadding:0;line-height:0;background-color:transparent;border:none;"
                plain="true"
                form-type="submit"
              >
                <image class="grid_img_small" mode="widthFix"
                       src="http://star.peyesight.cn/images/dati.png"></image>
              </button>

            </div>
            <div style="font-size: 0.6rem;color:#ffffff;">{{bigPrizeText}}</div>
          </div>
          </form>
        </div>

          <form @submit="skipToLottery" report-submit="true">
        <div style="width:40%;float:left;height:80px;margin-top:15px;text-align:center;" class="box-3" :class="enable===2?maskLayerClock:''">
          <div class="grid" style=" margin-top:5px;">
            <button
              style="padding:0;line-height:0;background-color:transparent;border:none;"
              plain="true"
              form-type="submit"
            >
              <image class="grid_img" mode="widthFix"
                     src="https://alcon-star.oss-cn-beijing.aliyuncs.com/se/choujiang.png"></image>
            </button>
          </div>
          <div style="font-size: 0.6rem;color:#ffffff;">幸运抽奖</div>
        </div>
          </form>
      </div>

      <div class="center" style="width: 100%">
        <!--<div class="center" style="background-color: #7777d9;width: 70%;height: 35px;border-radius: 40px;" @click="clock">-->
            <!--<span style="font-size: 14px;color: white">-->
              <!--邀请好友获取一个红包钥匙-->
              <!--<button open-type='share' size="mini" plain="true" id='btnShare0'   style="padding:0;line-height:0;background-color:transparent;border:none;"></button>-->
            <!--</span>-->
        <!--</div>-->
      </div>
      <!--<div class="center" :style="'width: 100%;margin-top: 10px;display:'+display">-->
        <!--<div class="center" style="background-color: #7777d9;width: 70%;height: 35px;border-radius: 40px;" @click="clock">-->
            <!--<span style="font-size: 14px;color: white">-->
              <!--提现-->
              <!--<button open-type='share' size="mini" plain="true"  style="padding:0;line-height:0;background-color:transparent;border:none;"></button>-->
            <!--</span>-->
        <!--</div>-->

      <!--</div>-->

          <p style="color: white;font-size: 12px;text-align: right;margin-top: 4px" :key="text.id">{{text.val}}</p>
      <div style="height:70px;width:100%;margin-top: 10px;" class="box-5" :style="'display:'+(isLeisureArea==1?'block':'none')">

        <div style="width:96%;margin-left:2%;height: 100%;display: flex;align-items: center">



          <!--<div style="width:40%;height:125px;float:left;border-right:0.5px #E5E5E5 solid;text-align:center;">-->
            <!--<div class="grid">-->
              <!--<image class="grid_img" mode="widthFix"-->
                     <!--src="https://alcon-star.oss-cn-beijing.aliyuncs.com/se/qinmidu.png"></image>-->
            <!--</div>-->
            <!--<div style="font-size: 14px;color:#ffffff;">{{user.userName}}</div>-->
            <!--<div style="font-size: 14px;color:#ffffff;">当前排名：{{currentRank}}</div>-->
            <!--<div style="font-size: 12px;color:#feb21f;margin-top:5px;" @click="skipToRankList">查看详细 ></div>-->
          <!--</div>-->
          <!--<div style="width:59%;height:125px;float:left;text-align: -webkit-center;">-->
            <!--<div style="'width: 90%;" >-->
              <!--<div @click="skipToColor('/pages/color/main')" class="menu-item">{{colorText}}</div>-->
              <!--<div @click="skipToNumber('/pages/number_eliminate/main')" class="menu-item">{{numberText}}</div>-->
              <!--<div @click="skipToPicture('/pages/picture/main')" class="menu-item">{{pictureText}}</div>-->
            <!--</div>-->

          <div class="tui-table-div">

            <div  class="tui-col-3" style="text-align: -webkit-center;"  @click="clickSkipOthorMini('wx4a9e44271918fb99')">
              <button
                style="padding:0;line-height:0;background-color:transparent;border:none;width: 35px;height: 35px;border-radius: 60px;"
                plain="true"
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
              >
              <image  src="http://star.peyesight.cn/images/game.png" style="width: 35px;" mode="widthFix"/>
              </button>
              <span style="font-size: 0.6rem;color:#ffffff;">来粉休闲</span>
            </div>

            <div  class="tui-col-3" style="text-align: -webkit-center;"  @click="clickSkipOthorMini('wx8d7efedb0ed500ef')">
              <button
                style="padding:0;line-height:0;background-color:transparent;border:none;width: 35px;height: 35px;border-radius: 60px;"
                plain="true"
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
              >
                <image  src="http://star.peyesight.cn/images/picture.png" style="width: 35px;" mode="widthFix"/>
              </button>
              <span style="font-size: 0.6rem;color:#ffffff;">来粉拼图</span>
            </div>

            <div  class="tui-col-3" style="text-align: -webkit-center;"  @click="clickSkipOthorMini('wx0bbbbfc5708e605d')">
              <button
                style="padding:0;line-height:0;background-color:transparent;border:none;width: 35px;height: 35px;border-radius: 60px;"
                plain="true"
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
              >
                <image  src="http://star.peyesight.cn/images/garden.png" style="width: 35px;" mode="widthFix"/>
              </button>
              <span style="font-size: 0.6rem;color:#ffffff;">来粉果园</span>
            </div>


            <!--<div  class="tui-col-3" style="text-align: -webkit-center;border-left:0.5px #E5E5E5 solid;"  @click="skipToGarden">-->
              <!--<div  class="center" style="width: 35px;height: 35px;border-radius: 60px;">-->
                <!--<image  src="http://star.peyesight.cn/images/garden.png" style="width: 35px;" mode="widthFix"/>-->
              <!--</div>-->
              <!--<span style="font-size: 0.6rem;color:#ffffff;">果园</span>-->
            <!--</div>-->

            </div>


            <!--<div v-for="item in ranks" style=" width: 33%;float:left; height:100%;">-->
            <!--<div class="grid" style="width:100%;">-->
            <!--<image class="grid_img"  mode="widthFix" :src="'http://star.peyesight.cn/images/rank'+item.rank+'.png'"></image>-->
            <!--</div>-->
            <!--<div class="font_css" style="font-size: 12px;color: #feb21f;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;">{{item.user_name}}</div>-->
            <!--<div class="font_css" style="color: white;font-size: 14px;font-weight:600;">第{{item.rank}}名</div>-->
            <!--</div>-->
          <!--</div>-->


        </div>
      </div>


    <div style="margin-top: 2px;">
      <ad unit-id="adunit-243c3780ba209b16" ad-type="video" ad-theme="black"></ad>
    </div>


    </div>




  </div>
</template>
<style>
  .center {
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .card {
    border: #F0F0F0;
    width: 95%;
    margin-left: 2.5%;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 1px 1px #F0F0F0;
  }

  .van-card {
    background-color: white !important;
    padding: 10px !important;
    margin-top: 15px;
  }

</style>
<script>
  export default {
    computed: {
      text () {
        return {
          val: this.textArr[this.number].userName +" 已兑换"+  this.textArr[this.number].sumMoney +"元"
        }
      }
    },
    data() {
      return {
        timer:null,
        textArr: [
          '雪山 已兑换136元话费',
          '雪山 兑换10元',
          '雪山 兑换10元'
        ],
        number: 0,
        notice:"",
        isSkipToOtherMini:false,
        model:{},
        show:false,
        swiperBanners:[],
        isLeisureArea:0,
        kvName:"",
        display:"none",
        maskLayer:"mask-layer",
        maskLayerClock:"mask-layer-clock animation circle_bottom",
        isOpenGame: 0,
        colorText: "",
        numberText: "",
        pictureText: "",
        bigPrizeText: "",
        ranks: [],
        currentRank: "",
        currentScore: "",
        user: {},
        enable: 0,
        videos: [{
          url: "http://star.peyesight.cn/video/huangshan.mp4"
        }],
        lunboImgs: [
          {
            imgUrl: "http://star.peyesight.cn/images/salter.jpg"
          }
        ], ranks: []
      };
    },
    methods: {
      clickSkipOthorMini(appid){
        this.appid=appid;
        this.isSkipToOtherMini=true;
      },
      getUserInfo() {
        var _this = this;
        wx.getSetting({
          success(res) {
            var getUserFlag = res.authSetting["scope.userInfo"];
            if (!getUserFlag) {
            } else {
              _this.skipToGame();
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
              this.skipToGame();
            } else {
              this.alert(data.data);
            }
          });
        }
      },
      skipTo(path){
        this.navigateTo(path);
      },
      skipToGame(){
        wx.navigateToMiniProgram({
          appId: this.appid,
          path: "pages/home/main",
          success(res) {
          }
        })
      },
      skipToRank(){
        this.navigateTo("/pages/rank/main");
      },
      skipToGarden(){
        this.navigateTo("/pages/garden/main");
      },
      skipToStore(){
        this.navigateTo("/pages/store/main");
      },
      searchSwiperBanners(){
        this.post({
          url: "/salter/swiper_banner/search",
          data: {  }
        }).then(res => {
          this.swiperBanners =res.data
        });
      },


      monitorAd(){
        this.alert("点了广告");
      },
      skipToColor(page) {
        this.gotoPage(page);
      },
      skipToNumber(page) {
        this.gotoPage(page);
      },
      skipToPicture(page) {
        this.gotoPage(page);
      },
      skipToRankList() {
        this.navigateTo("/pages/rank_list/main");
      },
      skipToBigPrize(e) {
        this.saveFormId(e);
        this.navigateTo("/pages/big_prize/main");
      },
      skipToGongLue() {
        this.alert("主播拼命开发中~");
      },
      skipToExchange(e) {
        this.saveFormId(e);
        this.navigateTo("/pages/exchange/main");
      },
      skipToJieDan() {
        this.alert("主播拼命开发中~");
      },
      skipToPlayTour(e) {
        this.saveFormId(e);
        this.navigateTo("/pages/rank_team/main");
      },
      skipToUser() {
        this.navigateTo("/pages/user/main");
      },
      skipToFace() {
        this.navigateTo("/pages/change_face/main");
      }, skipToClock(e) {
        this.saveFormId(e);
        this.navigateTo("/pages/clock/main");
      }, skipToVideo() {
        this.alert("主播拼命开发中,请耐心等待");
      },
      skipToSign() {
        this.navigateTo("/pages/sign_match/main");
      },
      skipToLottery(e) {
        this.saveFormId(e);
        this.navigateTo("/pages/lottery/main");
      },
      skipToGuess(e) {
        this.saveFormId(e);
        this.navigateTo("/pages/guess/main");
      },

      swapArray(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      },
      startMove () {
        // eslint-disable-next-line
        this.timer = setTimeout(() => {
          if (this.number === this.textArr.length-1) {
            this.number = 0;
          } else {
            this.number += 1;
          }
          this.startMove();
        }, 3000); // 滚动不需要停顿则将2000改成动画持续时间
      }
    },
    onShow() {
      let _this=this;
      _this.show = false;
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
      this.post({
        url: "/salter/user/searchAll",
        data: { activeId:this.globalData.active.id }
      }).then(res => {
        this.textArr=res.data

        if(null!=this.timer){
          clearTimeout(this.timer)
        }
        this.startMove()
      });

      this.notice=this.globalData.active.role
      this.searchSwiperBanners();
        this.user = this.globalData.user;
      if(!this.user.enable) {
        if(this.globalData.enable === 3) {
            this.enable = 3;
            return;
        }
        if(this.globalData.enable === 2) {
            this.enable = 2;
            return;
        }
        this.enable = 1;
      }
      this.isOpenGame=this.globalData.active.isOpenGame;
      this.isLeisureArea=this.globalData.active.type;
      this.colorText="烧脑颜色"
      this.numberText="数字消消乐"
      this.pictureText="自定义拼图"
      this.bigPrizeText="答题"
      if(this.kvName===1){
        this.display="flex"
      }
    }
  };
</script>

<style lang="less">
  @import "../../../static/css/home.less";

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
  .mask-layer {
    background-color:rgba(16, 14, 14, 0.56);
    color:rgba(16, 14, 14, 0.56);
    position: fixed;
    width: 100%;
    height: 100%;
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
  .menu-item {
    font-size: 14px;
    display: block;
    text-decoration-line: none;
    border-radius: 25px;
    background-color: #7777d8;
    height: 30px;
    line-height: 30px;
    margin-bottom: 15px;
    text-align: center;
    color: #fff;
    box-shadow: #7777d9 0 0 6px 0px;
  }
  page {
    background: @background;
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
    background: @box-background3;
    background-size: 100% 100%;
  }

  .box-5 {
    background: @box-background4;
    background-size: 100% 100%;
  }

  .box-2-1 {
    width: 48%;
    float: left;
    margin-left: 2%;
  }

  .box-2-2 {
    width: 48%;
    height: 80px;
    float: left;
  }

  .box-2-1-1 {
    margin-top: 10px;
    border-right: 0.5px #E5E5E5 solid;
    border-bottom: 0.5px #E5E5E5 solid;
  }

  .box-2-2-1 {
    margin-top: 10px;
    border-bottom: 0.5px #E5E5E5 solid;
  }

</style>

<style>
  .grid {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grid_img {
    width: 50px;
  }

  .grid_img_small {
    width: 35px;
  }

  .font_css {
    height: 25px;
    line-height: 25px;
    font-weight: 500;
    text-align: center;
  }

  .grid2_img {
    width: 80px;
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
    width: 33%;
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

</style>


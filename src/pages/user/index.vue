<template>
  <div>
    <!--<div :class="user.enable?'':'mask-layer'"></div>-->
    <v-bottom select="me-page"></v-bottom>
    <div class="header" style="width: 96%;height: 100%;margin-left:2%;">


      <div class="me-box-1" style="height:210px;width:100%;margin-top:25px;">
        <van-cell style="width: 100%">

          <div slot="title" style="height: 100%;">
            <div style="align-items: center;display: flex;height: 100%;color: white">
              <div style="width: 100%;">
                <div style="width: 100%;">
                  <div style="display:inline-block;"> {{user.userName}}
                  </div>
                  <div  style="display:inline-block;margin-left:5px;background: url('http://star.peyesight.cn/images/vip.png;')no-repeat;background-size: 100%; width: 45px;color: #a86002;text-align: center;line-height: 20px;">{{user.vipLevel.name}}</div>

                  <div @click="skipVipLevel" style="float: right;background-color: #FED845;color: #a86002;border-radius: 5px;font-size: 12px;line-height: 25px;padding-left: 4px;padding-right: 4px;">查看特权</div>
                </div>

                <div>
                  ID：{{user.clientId}}
                </div>
                    <van-progress
                      :pivot-text="expText"
                      :percentage="percentage"
                      color="linear-gradient(to right, #F6E21F,#FCA325 )"
                      custom-class="test"
                    ></van-progress>

                <div style="display:inline-block;font-size: 0.6rem">{{user.vipLevel.name}}</div>
                <div style="display:inline-block;float: right;font-size: 0.6rem">{{user.nextVipLevel.name}}({{user.nextVipLevel.describe}})</div>
            </div>

          </div>



          </div>

          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 5px; ">
            <image style="width: 80px;border-radius:50px;" mode="widthFix"
                   :src="user.avatarUrl"/>
          </div>
        </van-cell>

        <!--<div style="width:30%;float:left;height:105px;text-align:center;">-->
        <!--<div class="grid" style=" margin-top:20px;">-->
        <!--<image class="grid_img_big" style="border-radius:50%; overflow:hidden;" mode="widthFix" src="http://star.peyesight.cn/images/pidanphoto.jpg"></image>-->
        <!--</div>-->
        <!--</div>-->

        <!--<div style="width:55%;float:right;height:105px;text-align:center;">-->
        <!--<div style="height:50px;width:100%;text-align:right;">-->
        <!--<image class="grid_img_small"  style="padding:10px;" mode="widthFix" src="https://alcon-star.oss-cn-beijing.aliyuncs.com/se/qinmi.png"></image>-->
        <!--</div>-->
        <!--<div style="font-size: 15px;color:#ffffff;margin-top:10px;">当前亲密度：{{user.intimacy}}</div>-->
        <!--</div>-->

        <!-- <div style="width:100%;height:50px;" :class="enable===3?'mask-layer-clock animation circle_bottom':''">
          <div class="me-header-box-2 left" style="">
            {{exchangeText}}余额:{{user.money}}
            <van-button @click="showExchangeMoneyDialog"  style="float: right;" size="small" type="warning" round>兑换</van-button>

          </div>
          <div class="me-header-box-2 right" style="">
            来粉币余额：{{user.score}}
          </div>
        </div> -->
        <div style="width:100%;height:50px;text-align: center;margin-top:20px;">
          <div  style="float: left;width:40%;height:50px;text-align: center;">
              <div @click="details" style="margin-left: 10%;width:40px;background-color: #FED845;color:#a86002;border-radius: 5px;font-size: 10px;line-height: 15px;padding-left: 4px;padding-right: 4px;">
                收支详情
              </div>
              <div style="height:20px;font-size: 26px;color:white;">{{user.score}}</div>
              <div style="height:20px;font-size: 14px;margin-top: 20px;color:white;">来粉币余额</div>
          </div>
          <div  style="float: left;width:20%;height:50px;text-align: center;">
            <div style="font-size: 10px;height:20px;transform:scale(1.2);color:white;">300粉币=1元</div>
            <div style="height:10px;color:white;">
            </div>
            <div style="height:20px;">
               <van-button @click="showExchangeMoneyDialog"  size="small" type="warning" round>立即兑换</van-button>
            </div>
          </div>
          <div   style="float: left;width:40%;height:50px;text-align: center;">
             <div @click="withdrawal" style="margin-left: 60%;width:40px;background-color: #FED845;color:#a86002;border-radius: 5px;font-size: 10px;line-height: 15px;padding-left: 4px;padding-right: 4px;">
               点击兑换
              </div>
            <div style="height:20px;font-size: 26px;color:white;">{{user.money}}<span style="font-size: 14px;">元</span>
            </div>
            <div style="height:20px;font-size: 14px;margin-top: 20px;color:white;">我的收益</div>
          </div>
        </div>
      </div>


      <div class="tui-table-div"  style="background-color: white;margin-top: 10px;border-radius: 5px;padding-top: 10px;">
        <div  class="tui-col-3 " style="text-align: -webkit-center;" @click="creditsLog" >
          <div  class="center" style="width: 35px;border-radius: 60px;">
            <image  src="http://star.peyesight.cn/images/user_jilu.png" style="width: 25px;" mode="widthFix"/>
        </div>
          <span style="font-size: 0.8rem;color: #636881">来粉币记录</span>
        </div>
        <!--<div  class="tui-col-4" style="text-align: -webkit-center;"  @click="skipToLottertRecord">-->
          <!--<div  class="center" style="width: 35px;border-radius: 60px;">-->
            <!--<image  src="http://star.peyesight.cn/images/user_zhongjiangjilu.png" style="width: 25px;" mode="widthFix"/>-->
        <!--</div>-->
          <!--<span style="font-size: 0.8rem;color: #636881">中奖信息</span>-->
        <!--</div>-->
        <div  class="tui-col-3" style="text-align: -webkit-center;"  @click="skipToSharePoster">
          <div  class="center" style="width: 35px;border-radius: 60px;">
            <image  src="http://star.peyesight.cn/images/poster.png" style="width: 25px;" mode="widthFix"/>
          </div>
          <span style="font-size: 0.8rem;color: #636881">生成海报</span>
        </div>
        <div  class="tui-col-3 " style="text-align: -webkit-center;" @click="skipToQuestion" >
          <div  class="center" style="width: 35px;border-radius: 60px;">
            <image  src="http://star.peyesight.cn/images/wenti.png" style="width: 25px;" mode="widthFix"/>
          </div>
          <span style="font-size: 0.8rem;color: #636881">常见问题</span>
        </div>
      </div>







    </div>
    <div style="height:50%;background-color:white;width:100%;bottom:8%;z-index: -1">


      </div>

    <div style="justify-content: center;display: flex;width: 100%">
      <div style="margin-top: 10px;width: 90%;"  >
        <ad unit-id="adunit-243c3780ba209b16" ad-type="video" ad-theme="black"></ad>
      </div>
    </div>

    <van-dialog style="text-align: center;" use-slot :show="exchangeMoneyDialog" :title="'兑换'+exchangeText" @close="close"
                @confirm="submitExchangeMoney" show-cancel-button>
      <span style="font-size: 14px;color: #9B9793">当前兑换比例 300来粉币=1元{{exchangeText}}</span>
      <van-field
        :value="money"
        clearable
        label="输入兑换个数"
        :placeholder="'请输入兑换个数'+exchangeText"
        bind:click-icon="onClickIcon"
        @change="moneyChange"
        type="number"
      />

    </van-dialog>


    <van-dialog style="text-align: center;" use-slot :show="updUserInfoDialog" title=" " @close="close"
                @confirm="confirmOK" show-cancel-button>

      <van-field
        :value="userName"
        clearable
        label="游戏昵称"
        placeholder="请输入游戏昵称"
        bind:click-icon="onClickIcon"
        @change="nameChange"
      />

    </van-dialog>

  </div>
</template>

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

  .van-cell {
    background-color: transparent !important;
  }

<script>
  export default {
    data() {
      return {
        isAd:"显示",
        percentage:"",
        expText:"",
        updUserInfoDialog: false,
        exchangeMoneyDialog: false,
        user: {},
        userName: "",
        money: "",
        enable:0,
        show: false,
      };
    },
    methods: {
      handleproxy(){
        console.log("点了视频")
      },
      skipToSharePoster(){
        this.navigateTo("/pages/share_poster/main");
      },
      skipToExchange(e) {
        this.navigateTo("/pages/exchange/main");
      },
      withdrawal() {
        this.navigateTo("/pages/withdrawal/main");
      },
      details() {
          this.navigateTo("/pages/credits_log/main");
      },
      skipVipLevel(){
        this.navigateTo("/pages/vip_level/main");
      },
      skipToQuestion(){
        this.navigateTo("/pages/question/main");
      },
      moneyRank(){
        this.navigateTo("/pages/money_rank/main");
      },
      showExchangeMoneyDialog() {
        this.exchangeMoneyDialog = true;
      },
      submitExchangeMoney(){
        this.post({
          url: "/salter/user/exchangeMoney",
          data: {userId:this.globalData.user.id,money:this.money}
        }).then(res => {
          if(res.success){
            this.flushUserData();
          }else{
            this.alert(res.msg)
          }

        });
      },
      close() {
        this.updUserInfoDialog = false;
        this.exchangeMoneyDialog = false;
      },
      updUserInfo() {
        this.updUserInfoDialog = true;
      },
      skipTofeedback() {
        this.navigateTo("/pages/feedback/main");
      },
      skipToLottertRecord() {
        this.navigateTo("/pages/lottery_record/main");
      },
      skipTofeedback() {
        this.navigateTo("/pages/feedback/main");
      },
      flushUserData() {
        this.post2({
          url: "/wx_app/wx_user/save",
          data: {
            openid: this.globalData.openid,
            appid: this.globalData.appid,
            unionid: this.globalData.unionid,
            source: this.globalData.source,
            wxAppActiveId: this.globalData.activeId
          }
        }).then(res => {
          this.user = res.user;
          this.expText=this.user.exp+"/"+  this.user.vipLevel.endExp+"(成长值)";
          this.percentage=(this.user.exp/this.user.vipLevel.endExp)*100
        });
      },
      creditsLog() {
        this.navigateTo("/pages/credits_log/main");
      },
      updUserInfo() {
        this.updUserInfoDialog = true;
      },
      confirmOK() {
        let _this=this;
        wx.cloud.callFunction({
          name: 'msgSecCheck',
          data: {
            txt: this.userName
          },
          success(_res) {
            console.log(_res)
            if(_this.isNull(_res.result.errCode)){
              _this.post({
                url: "/salter/user/update",
                data: { userName: _this.userName, userId: _this.user.id }
              }).then(res => {
                if (res.success) {
                  _this.alert("完善信息成功");
                  _this.flushUserData();
                  _this.user = res.data;
                } else {
                  _this.alert("请输入游戏昵称");
                }
              });
            }else{
              _this.alert("您的昵称不合法，请重新输入");
            }

          },
          fail(_res) {
            console.log(_res)
          }
        })




      },
      updateEnable() {
        this.post({
        url: "/salter/user/updateEnable",
        data: { userId: this.globalData.user.id }
      }).then(res => {
        this.globalData.enable = 0;
        this.getUser();
        this.navigateTo("/pages/index/main");
      });
      },
      nameChange(e) {
        this.userName = e.mp.detail;
      },
      moneyChange(e) {
        this.money = e.mp.detail;
      }
    },
    onShow() {
      let _this=this;
      _this.show = false;
      this.flushUserData();
      this.checkBannerResource(function() {
        _this.show = true;
      });
    },
    mounted() {
      this.exchangeText=this.globalData.active.name



      if(this.globalData.enable === 3) {
          this.enable = 3;
          this.alert("添加客服微信18813066492，使用{{exchangeText}}兑换精美礼品！",this.updateEnable);
      }
      if(this.globalData.enable === 0) {
          this.enable = 0;
      }
      if (this.isNull(this.user.userName)) {
        this.user.userName = "我是一个小皮蛋";
      }
      if (this.isNull(this.globalData.user.avatarUrl)) {
        this.user.avatarUrl = "http://star.peyesight.cn/images/pidanphoto.jpg";
      }
      if(this.globalData.user.enable){
        // 在页面中定义插屏广告
        let interstitialAd = null
// 在页面onLoad回调事件中创建插屏广告实例
        if (wx.createInterstitialAd) {
          interstitialAd = wx.createInterstitialAd({
            adUnitId: 'adunit-31cc23a80dbd6f3c'
          })
          interstitialAd.onLoad(() => {})
          interstitialAd.onError((err) => {})
          interstitialAd.onClose(() => {})
        }

        if (interstitialAd) {
          interstitialAd.show().catch((err) => {
            console.error(err)
          })
        }

      }



    }
  };
</script>
<style lang="less">
  @import "../../../static/css/home.less";

  .van-progress {
    height: 12px !important;
    background-color: #4D590D !important;
    opacity: 0.9;
    width: 100% !important;

  }
  .van-progress__pivot{
    position: relative !important;
    right:0;
    min-width:1px !important;
    padding:0 0px !important;
    font-size:10px;
    line-height:0 !important;
    text-align:center;
    word-break:keep-all;
    background-color:#e5e5e5;
    border-radius:1em;
    -webkit-transform:translateY(-50%);
    transform:translateY(-50%);
    box-sizing:border-box;
    margin:0;padding:0;


  }
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


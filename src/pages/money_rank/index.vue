<template>
  <div class="home" style="width: 98%;height: 100%;margin-left:1%;">

    <!--<div style="font-size: 14px;color:#6b4d55;display: flex;padding: 10px;margin-top: 1px;align-items: center">-->
      <!--<image src="http://star.peyesight.cn/images/paihang.png" style="width: 100%" mode="widthFix"></image>-->
    <!--</div>-->

    <div calss="ranking"
         style="margin-top: 5px;background: url('https://alcon-star.oss-cn-beijing.aliyuncs.com/se/top.png');background-size: 100% 100%;height:180px;">
      <div v-for="item in ranks" style=" width: 33.3%;    float:left; height:100%;">
        <div style="height:40px;"></div>
        <div class="tui-table-div">
          <div class="grid" style="width:100%;">
            <image class="grid2_img"  mode="widthFix" :src="'http://star.peyesight.cn/images/rank'+item.rank+'.png'"></image>
          </div>
        </div>
        <div class="font_css" style="">第{{item.rank}}名</div>
        <div class="font_css" style="font-size: 12px;color: #6A6A6A">{{item.user_name}}</div>
        <div class="font_css" style=" color:#feb21f;font-weight: 700;font-size: 20px;">{{item.money}}</div>
      </div>


    </div>
    <van-cell v-for="(item,index) in rankTop10" v-if="index>2" style="width: 100%;" >
      <div slot="title" style="align-items: center;display: flex;height: 100%;font-size: 12px;">
        <image class="grid_img" mode="widthFix" src="http://star.peyesight.cn/images/pidanphoto.jpg"></image>
        <div style="margin-left: 20px;">{{item.user_name}}</div>
        <div style="margin-left: 20px;">累计{{exchangeText}}： {{item.money}}</div>
      </div>
      <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
        <span style="color: #EE722D;font-family: 华文隶书,serif">NO.{{item.rank}}</span>
      </div>

    </van-cell>

    <div style="height: 50px;">
    </div>
    <van-cell style="width: 100%;position:fixed;bottom:0px;">
      <div slot="title" style="align-items: center;display: flex;height: 20px;">
        <image class="grid_img" mode="widthFix" src="http://star.peyesight.cn/images/pidanphoto.jpg"></image>
        <div style="margin-left: 20px;">{{user.userName}}</div>
        <div style="margin-left: 20px;">累计{{exchangeText}}： {{currentScore}}</div>
      </div>
      <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
        <span style="color: #EE722D;font-family: 华文隶书">NO.{{currentRank}}</span>
      </div>

    </van-cell>

    <div v-show="show" style="width: 100%;position:fixed;bottom:40px;border-radius: 10px;" class="center">
      <div style="width: 300px;">
        <ad  unit-id="adunit-7dff38f9301dc30f" ad-intervals="30" ></ad>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import "../../../static/css/home.less";
  .center {
    align-items: center;
    justify-content: center;
    display: flex;
  }
.van-cell{
  height:35px;
  font-size:12px;

}
  page {
    background: #efefef;
  }
  .grid {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grid_img {
    width: 25px;
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

</style>
<script>
  export default {
    data() {
      return {
        show:false,
        ranks: [],
        rankTop10: [],
        currentRank: "",
        currentScore: "",
        user: {},
        videos: [{
          url: "http://star.peyesight.cn/video/huangshan.mp4"
        }],
        lunboImgs: [
          {
            imgUrl: "http://star.peyesight.cn/images/lunbo_1.png"
          }
        ]

      };
    },
    onShow() {
      let _this=this;
      _this.show = false;
      this.checkBannerResource(function() {
        _this.show = true;
      });
    },
    methods: {
      skipToUser() {
        this.navigateTo("/pages/user/main");
      },
      skipToFace() {
        // this.alert("主播拼命开发中~")
        this.navigateTo("/pages/change_face/main");
      }, skipToClock() {

        this.navigateTo("/pages/clock/main");


        /*  this.navigateTo("/pages/sign_match/main");*/
      }, skipToVideo() {
        this.alert("主播拼命开发中,请耐心等待");
        /*  this.navigateTo("/pages/sign_match/main");*/
      },
      skipToSign() {
        this.navigateTo("/pages/sign_match/main");
      },
      skipToLottery() {
        this.navigateTo("/pages/lottery/main");
      },
      skipTofeedback() {
        this.navigateTo("/pages/feedback/main");
      },
      swapArray(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      }
    },
    mounted() {
      this.user = this.globalData.user;
      this.post({
        url: "/salter/user/moneyRank",
        data: { userId: this.globalData.user.id }
      }).then(res => {
        this.ranks = this.swapArray(res.data.ranks, 0, 1);
        this.rankTop10 = res.data.rankTop10;
        this.currentRank = res.data.currentRank;
        this.currentScore = res.data.currentScore;
      });
    }
  };
</script>


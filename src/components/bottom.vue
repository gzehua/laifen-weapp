<template>
  <div>

    <div :class="enable===3?'mask-layer-clock animation circle_bottom':''" :style="enable===3?'border-radius:0%;':''" style="z-index: 100; position:fixed;bottom:0px;height:8%;background:#4e2c99;width:100%;text-align:center;color:#ffffff;font-size: 16px;  display: flex;align-items: center;justify-content: center;">
      <div class="tui-table-div" >
        <div  class="tui-col-3" style="text-align: -webkit-center;" @click="clickModule('indexPage')">
          <div  class="center" style="width: 35px;border-radius: 60px;">
            <image  :src="'http://star.peyesight.cn/images/index'+selectIndex+'.png'" style="width: 25px;" mode="widthFix"/>
          </div>
          <span style="font-size: 0.8rem;color:#ffffff;">首 页</span>
        </div>
        <!--<div  class="tui-col-4" style="text-align: -webkit-center;" @click="clickModule('teamPage')">-->
          <!--<div  class="center" style="width: 35px;border-radius: 60px;">-->
            <!--<image  :src="'http://star.peyesight.cn/images/team'+selectTeam+'.png'" style="width: 30px;" mode="widthFix"/>-->
          <!--</div>-->
          <!--<span style="font-size: 0.8rem;color:#ffffff;">主播团</span>-->
        <!--</div>-->
        <div  class="tui-col-3" style="text-align: -webkit-center;" @click="clickModule('storePage')">
        <div  class="center" style="width: 35px;border-radius: 60px;">
        <image src="http://star.peyesight.cn/images/store.png"  style="width: 25px;" mode="widthFix"/>
        </div>
        <span style="font-size: 0.8rem;color:#ffffff;">主播小店</span>
        </div>

        <!--<div  class="tui-col-4" style="text-align: -webkit-center;" @click="clickModule('strategyPage')">-->
          <!--<div  class="center" style="width: 35px;border-radius: 60px;">-->
            <!--<image  src="http://star.peyesight.cn/images/footergonglve.png" style="width: 25px;" mode="widthFix"/>-->
          <!--</div>-->
          <!--<span style="font-size: 0.8rem;color:#ffffff;">攻 略</span>-->
        <!--</div>-->
        <!--<div  class="tui-col-3" style="text-align: -webkit-center;" @click="clickModule('changeFace')">-->
          <!--<div  class="center" style="width: 35px;border-radius: 60px;">-->
            <!--<image  src="http://star.peyesight.cn/images/footerface.png" style="width: 30px;" mode="widthFix"/>-->
          <!--</div>-->
          <!--<span style="font-size: 0.8rem;color:#ffffff;">换 脸</span>-->
        <!--</div>-->
        <!--<div  class="tui-col-4" style="text-align: -webkit-center;" @click="clickModule('friendContributionPage')">-->
          <!--<div  class="center" style="width: 35px;border-radius: 60px;">-->
            <!--<image src="http://star.peyesight.cn/images/friend.png"  style="width: 25px;" mode="widthFix"/>-->
          <!--</div>-->
          <!--<span style="font-size: 0.8rem;color:#ffffff;">好友加成</span>-->
        <!--</div>-->
        <div  class="tui-col-3" style="text-align: -webkit-center;"  @click="clickModule('mePage')">
          <div  class="center" style="width: 35px;border-radius: 60px;">
            <image  :src="'http://star.peyesight.cn/images/my'+selectMy+'.png'" style="width: 25px;" mode="widthFix"/>
          </div>
          <span style="font-size: 0.8rem;color:#ffffff;" :style="enable===3?'font-size: 1rem;color:red;':''">我 的</span>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  props: ['select']
,
 data() {
    return {
      selectIndex:"",
      selectTeam:"",
      selectGuoyuan:"",
      selectMy:"",
      indexPage:false,
      mePage:false,
      strategyPage:false,
      changeFace:false,
      gardenPage:false,
      teamPage:false,
      friendContributionPage:false,
      storePage:false,
	    enable:0
    };
  },
  methods: {
      clickModule(type){
        if(type=="indexPage"){
            this.indexPage=true;
            this.redirectTo("/pages/index/main");
        }
        if(type=="mePage"){
            this.mePage=true;
            this.redirectTo("/pages/user/main");
        }
        if(type=="strategyPage"){
          this.strategyPage=true;
          this.navigateTo("/pages/strategy/main");
        }
        if(type=="changeFace"){
          this.strategyPage=true;
          this.navigateTo("/pages/change_face/main");
        }
        if(type=="gardenPage"){
          this.gardenPage=true;
          this.navigateTo("/pages/garden/main");
        }
        if(type=="teamPage"){
          this.teamPage=true;
          this.navigateTo("/pages/rank_team/main");
        }
        if(type=="friendContributionPage"){
          this.friendContributionPage=true;
          this.navigateTo("/pages/friend_contribution/main");
        }
        if(type=="storePage"){
          this.storePage=true;
          this.navigateTo("/pages/store/main");
        }
    }


  },
  onLoad() {
    if(this.globalData.enable === 3) {
          this.enable = 3
    }
    if(this.globalData.enable === 0) {
      this.enable = 0
    }
  },
  mounted() {
    this.indexPage=false;
    this.mePage=false;
    if(this.select=="index-page"){
      this.selectIndex="_select";
      this.indexPage=true;
    }
    if(this.select=="me-page"){
      this.selectMy="_select";
      this.mePage=true;
    }

  }
};
</script>
<style>
.mask-layer {
    background-color:rgba(16, 14, 14, 0.56);
    color:rgba(16, 14, 14, 0.56);
    position: absolute;
    width: 80%;
    height: 100%;
    z-index: 3;
  }
.mask-layer-clock {
    position : fixed;
    z-index: 10;
  }
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
  .circle_bottom {
    border-radius:100%;
    filter:alpha(opacity=40);
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


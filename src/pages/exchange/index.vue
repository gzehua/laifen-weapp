<template>
  <div>

    <van-card
      v-for="item in gifts"
      tag="Hot"
      :title="item.name"
      custom-class="card"
      :thumb="item.imgUrl"
      desc-class="desc"
    >
      <div slot="desc">
        <van-row>
          <van-col span="18">
            <div style="background-color: #FBECEF;border-radius: 10px;padding:6px;text-align: center;margin-top: 10px;">
              <span style="color: #AB4864;">活动倒计时: {{item.hh}}时{{item.mm}}分{{item.ss}}秒</span>
            </div>
          </van-col>
          <van-col span="6">
            <div style="border-radius: 10px;padding:6px;text-align: center;margin-top: 10px;">
              <span style="color: #B82A44;text-decoration:line-through;font-weight: 600">{{item.costScore}}来粉币</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <div slot="bottom" style="margin-top: 10px;">
        <van-row>
          <van-col span="12">
            <div style="border-radius: 10px;height: 30px;line-height: 45px;">
              <span style="color: #7F7F7F;">已兑换:{{item.exchangeNum}}/{{item.num}} </span>
            </div>
          </van-col>
          <van-col span="12">
            <div @click="exChange(item.id)"
                 style="background-color: #FFDE5B;padding: 10px;border-radius: 15px;text-align: center">
              <span style="color: #664C23;font-weight: 600">{{item.currentScore}}来粉币兑换</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-card>

    <van-dialog style="text-align: center;" use-slot :show="isLookVideo" title=" " confirmButtonText="去打赏"
                :confirmButtonColor="confirmButtonColor" @confirm="goLookVideo" @close="closeLookVideo"
                show-cancel-button>
      <div style="color: #814552;font-size: 14px;padding: 10px;">
        <div>来粉币不足，可以去亲密度打赏获取哦~</div>
      </div>
    </van-dialog>

    <van-dialog style="text-align: center;" use-slot :show="isExchange" title="您确认兑换该礼品吗" confirmButtonText="确认"
                :confirmButtonColor="confirmButtonColor" @confirm="exchange" @close="closeisExchange"
                show-cancel-button>
    </van-dialog>

  </div>
</template>

<style>
  page {
    background-color: #F7F7F7;
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
    data() {
      return {
        giftId: "",
        isExchange: false,
        intervalid: null,
        confirmButtonColor: "#814552",
        isLookVideo: false,
        gifts: []
      };
    },
    methods: {
      closeLookVideo() {
        this.isLookVideo = false;
      },
      closeisExchange() {
        this.isExchange = false;
      },
      goLookVideo() {
        this.navigateTo("/pages/play_tour/main");
      },
      exchange() {
        this.post({
          url: "/salter/gift/exChange",
          data: { userId: this.globalData.user.id, giftId: this.giftId }
        }).then(res => {
          if (res.success) {
            this.alert(res.data);
            this.flushData();
            return false;
          }
          if (res.msg.indexOf("来粉币不足")!==-1) {
            this.isLookVideo=true;
            return false;
          }
          this.alert(res.msg);
        });
      },
      exChange(giftId) {
        this.isExchange = true;
        this.giftId = giftId;

      },
      flushWaitDate() {
        var _this = this;
        this.intervalid = setInterval(() => {
          for (let i = 0; i < this.gifts.length; i++) {
            _this.gifts[i].waitDate = _this.gifts[i].waitDate - 1000;
            let waitDateText = _this.getFormat(this.gifts[i].waitDate);
            _this.gifts[i].hh = waitDateText.hh;
            _this.gifts[i].mm = waitDateText.mm;
            _this.gifts[i].ss = waitDateText.ss;

          }
        }, 1000);
      },
      getFormat(msec) {
        let ss = parseInt(msec / 1000);
        let ms = parseInt(msec % 1000);
        let mm = 0;
        let hh = 0;
        if (ss > 60) {
          mm = parseInt(ss / 60);
          ss = parseInt(ss % 60);
          if (mm > 60) {
            hh = parseInt(mm / 60);
            mm = parseInt(mm % 60);
          }
        }
        ss = ss > 9 ? ss : `0${ss}`;
        mm = mm > 9 ? mm : `0${mm}`;
        hh = hh > 9 ? hh : `0${hh}`;
        return { ms, ss, mm, hh };
      },
      flushData(){
        this.post({
          url: "/salter/gift/searchList",
          data: {}
        }).then(res => {
          this.gifts = res.data;
          for (let i = 0; i < this.gifts.length; i++) {
            let waitDateText = this.getFormat(this.gifts[i].waitDate);
            this.gifts[i].hh = waitDateText.hh;
            this.gifts[i].mm = waitDateText.mm;
            this.gifts[i].ss = waitDateText.ss;
          }
        });
      }

    },
    onShow() {
      this.isLookVideo = false;
      this.isExchange = false;
      clearInterval(this.intervalid);
      this.flushWaitDate();
    },
    mounted() {
     this.flushData();
    }
  };
</script>


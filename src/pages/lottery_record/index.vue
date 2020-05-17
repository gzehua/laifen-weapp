<template>
  <div>
    <van-cell v-for="(item,index) in lotteryRecord" style="width: 100%" :label="userName">
      <div slot="title">
        {{item.lotteryPrize.prizes.prizeName}}
      </div>
      <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
        <image style="width: 30px;" mode="widthFix" :src="item.lotteryPrize.prizes.prizeImage"/>
      </div>
      <div style="align-items: center;display: flex;height: 100%;float: right">
        <div style="padding-right: 20px;">{{item.insertedAt}}</div>
        <van-button @click="showUsePrizedialog(item)" color="#7232dd" style="float: right;" size="small" round>
          {{item.statusStr}}
        </van-button>
        <van-button v-if="item.orderStatus==0" @click="showRecoverdialog(item)" color="#7232dd" style="float: right;"
                    size="small" round>回收
        </van-button>
      </div>
    </van-cell>

    <van-dialog style="text-align: center;" use-slot :show="isShowUsePrizedialog" title="您确认使用该奖品吗？"
                confirmButtonText="确认"
                @confirm="submitUsePrize" @close="close"
                show-cancel-button>
    </van-dialog>

    <van-dialog style="text-align: center;" use-slot :show="isShowRecoverdialog" title="您确认将该奖品兑换成来粉币吗？"
                confirmButtonText="确认"
                @confirm="submitRecover" @close="close"
                show-cancel-button>
    </van-dialog>

  </div>
</template>
<style>
  .van-card {
    height: 50px;
  }

  .van-card__header .van-card__img {
    width: 50px;
    height: 50px;
  }

  .van-cell__title {

    flex: none !important;
    -webkit-flex: none;
  }
</style>
<script>
  export default {
    data() {
      return {
        isShowUsePrizedialog: false,
        isShowRecoverdialog: false,
        userName: "",
        lotteryRecord: {},
        usePrize: {},
        recoverPrize: {}
      };
    },
    methods: {
      showRecoverdialog(item) {
        this.isShowRecoverdialog = true;
        this.recoverPrize = item;
      },
      submitRecover() {
        this.post({
          url: "/salter/lottery/recoverPrize",
          data: { lotteryRecordId: this.recoverPrize.id, userId: this.globalData.user.id }
        }).then(res => {
          this.alert("奖品回收成功，"+res.data+"来粉币会自动进入您的账户中，请查收")
          this.flushData();
        });
      },
      showUsePrizedialog(item) {
        if (item.orderStatus == 1) {
          return;
        }
        this.isShowUsePrizedialog = true;
        this.usePrize = item;
      },
      close() {
        this.isShowUsePrizedialog = false;
        this.isShowRecoverdialog = false;
      },
      submitUsePrize() {

        this.post({
          url: "/salter/lottery/updLotteryRecordStatus",
          data: { lotteryRecordId: this.usePrize.id }
        }).then(res => {
          this.flushData();
        });
      },
      flushData() {
        this.post({
          url: "/salter/lottery/searchLotteryRecord",
          data: { activeId: this.globalData.active.id, userId: this.globalData.user.id }
        }).then(res => {
          this.lotteryRecord = res.data;
          console.log(res);
        });
      }
    },
    mounted() {
      this.userName = this.globalData.user.userName;
      this.flushData();
    }
  };
</script>


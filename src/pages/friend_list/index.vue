<template>
  <div>
    <van-cell  v-for=" item in friendList" style="width: 100%" :label="item.insertedAt">
      <div slot="title">
        {{item.userName}}
      </div>
      <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
        <image style="width: 30px;" mode="widthFix" src="http://star.peyesight.cn/images/baobao.png"/>
      </div>
      <div style="align-items: center;display: flex;height: 100%;float: right">
          <button open-type='share' size="mini" plain="true" id='btnShare0'   >提醒收币</button>
      </div>
    </van-cell>

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
        recoverPrize: {},
        friendList:[]
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
          url: "/salter/user/friend_list",
          data: { activeId: this.globalData.active.id, userId: this.globalData.user.id }
        }).then(res => {
          this.friendList=res.data
        });
      }
    },
    onShareAppMessage(res) {
      return {
        title: '您的来粉币等你收取~',
        path: '/pages/home/main?a='+this.globalData.active.id+"&u="+this.globalData.user.id,
        imageUrl:"http://star.peyesight.cn/images/share.png"
      }},
    mounted() {
      this.flushData();
    }
  };
</script>


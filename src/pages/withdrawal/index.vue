<template>
  <div style="background-color: #fafafa;width: 100%;height: 100%;position: fixed;">
    <div style="position: fixed;top: 15px;border-radius: 0px 10px 10px 0px;background-color: #F7DC47;padding: 6px;">
      <button
        style="padding:0;line-height:0;background-color:transparent;border:none;"
        plain="true"
        open-type="contact"
      >
        <div style="height:14px;line-height:14px;font-size: 14px;color: white;">
          联系客服
        </div>
      </button>

    </div>

    <div @click="skipToExchangeMoneyLog" style="position: fixed;top: 15px;right:0px;border-radius: 10px 0px 0px 10px;background-color: #F7DC47;padding: 6px;height:14px;line-height:14px;font-size: 14px;color: white;">
          兑换记录
    </div>


    <div class="bg1">
      <div style="font-size: 30px;height: 100px;line-height: 100px;color: #EEEAAD">{{user.money}}<span style="font-size: 15px">元</span></div>
      <div style="font-size: 15px;height: 20px;line-height: 100px;margin-top: -60px;">我的收益</div>
    </div>
    <div class="bg2">
      <div class="money">兑换余额</div>
      <div class="limit">
        <picker  :range="money" @change="moneyChange">
          <view class="picker">
            <van-field
              border="false"
              readonly
              :value="form.money"
              icon="arrow-down"
              placeholder="选择兑换余额"
              left-icon="after-sale"
            />


          </view>
        </picker>

      </div>

      <div  style="width: 100%;text-align: -webkit-center;margin-top: 30px;">
        <div style="width: 80%;">
          <van-button  @click="withdraw" round type="warning"   size="large" >兑换{{exchangeText}}</van-button>
        </div>
      </div>

    </div>
    <div style="padding: 10px;font-size: 14px;">
      <p>兑换说明：</p>
      <p style="color: #a7a7a7">兑换过程中有任何疑问，请联系来粉赚工作人员微信：18813066492</p>
      </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        user:{},
        money:[5,10],
        form:{
          money:"5"
        }
      };
    },
    methods: {
      flushUserData() {
        this.post({
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
        });
      },
      skipToExchangeMoneyLog(){
        this.navigateTo("/pages/exchange_money_log/main");
      },
      moneyChange(e) {
        this.form.money=this.money[e.mp.detail.value]
      },
     withdraw() {
        this.form.userId=this.globalData.user.id
       this.post({
         url: "/salter/exchangeMoneyLog/save",
         data: this.form
       }).then(res => {
         if(res.success){
           this.flushUserData();
          this.alert("兑换申请成功");
         }else {
           this.alert(res.msg);
         }
       });
     },
    },
    onShow() {
      this.flushUserData();
    },
    mounted() {
      this.exchangeText=this.globalData.active.name
    }
  };
</script>
<style lang="less">
  .limit {

  }
  .bg1 {
    background-color: #FF5848;
    width: 100%;
    height: 200px;
    text-align: center;
    color: white;
  }
  .bg2 {
    width: calc(100% - 60px);
    margin-left: 30px;
    margin-top: -50px;
    height: 200px;
    background-color: white;
    border-radius: 20px;
    text-align: center;
  }
  .money{
    color: #86898c;
    font-size: 15px;
    margin-left: 20px;
    padding-top: 10px;
    height: 20px;
    text-align: left;
  }
  .withdraw {
    position: relative;
    top: 50%;
  }
</style>


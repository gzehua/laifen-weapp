<template>
  <div>

    <van-cell style="width: 100%;text-align: center" >
      <div slot="title" style="align-items: center;display: flex;height: 100%;font-size: 12px;">
        <div style=" width:30%;color: #EE722D;font-family: 华文隶书,serif">开奖时间</div>
        <div style="width:20%;color: #EE722D;font-family: 华文隶书,serif">竞猜结果</div>
        <div style="width:20%;color: #EE722D;font-family: 华文隶书,serif">我的投注</div>
      </div>
      <div slot="icon" style="align-items: center;justify-content: center;display: flex;">
        <span style="color: #EE722D;font-family: 华文隶书,serif">期次</span>
      </div>
    </van-cell>
    <van-cell v-for="(item,index) in guessRecord"  style="width: 100%;text-align: center" >
      <div slot="title" style="align-items: center;display: flex;height: 100%;font-size: 12px;">
        <div style="width:30%">{{item.insertedAt}}</div>
        <div style="width:20%;"> {{item.result}}</div>
        <div v-if="item.currStake" style="width:20%;"> {{item.currStake}}</div>
      </div>
      <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
        <span style="color: #EE722D;font-family: 华文隶书,serif">{{item.id}}</span>
      </div>

    </van-cell>


    <!--<div style="background-color:lightgray;text-align:center;font-size: 20px;font-weight:100">-->
    <!--<van-row gutter="3" >-->
      <!--<van-col span="11" >-->
        <!--<div style="">-->
          <!--任务记录-->
        <!--</div>-->
      <!--</van-col>-->
      <!--<van-col span="8">-->
        <!--<div style="">-->
          <!--记录日期-->
        <!--</div>-->
      <!--</van-col>-->
      <!--<van-col span="5">-->
        <!--<div style="">-->
          <!--来粉币-->
        <!--</div>-->
      <!--</van-col>-->
    <!--</van-row>-->
    <!--</div>-->
    <!--<div style="text-align:center;" v-for="model in  list">-->
      <!--<van-row gutter="3" >-->
        <!--<van-col span="11" >-->
          <!--<div style="">-->
            <!--{{model.logMessage}}-->
          <!--</div>-->
        <!--</van-col>-->
        <!--<van-col span="8">-->
          <!--<div style="">-->
            <!--{{model.insertedAtText}}-->
          <!--</div>-->
        <!--</van-col>-->
        <!--<van-col span="5">-->
          <!--<div style="">-->
            <!--{{model.integral}}-->
          <!--</div>-->
        <!--</van-col>-->
      <!--</van-row>-->
    <!--</div>-->
  </div>
</template>
<style>
  .van-cell{
    height:35px;
    font-size:12px;

  }

</style>
<script>
  export default {
    data() {
      return {
        user:{},
        guessRecord: [
          /*{
            logMessage:'签到',
            insertedAt:'2019.01.03',
            integral:'+10'
          },
          {
            logMessage:'签到',
            insertedAt:'2019.01.04',
            integral:'+10'
          },
          {
            logMessage:'签到',
            insertedAt:'2019.01.05',
            integral:'+10'
          },
          {
            logMessage:'签到',
            insertedAt:'2019.01.06',
            integral:'+10'
          }*/
        ],
      };
    },
    methods: {
    },
    mounted() {
      this.post({
        url: "/salter/guess/searchList",
        data: {userId:this.globalData.user.id}
      }).then(res => {
        if(res.success){
          this.guessRecord=res.data
        }else {
          this.alert("拼命加载中...");
        }
      });
    }
  };
</script>


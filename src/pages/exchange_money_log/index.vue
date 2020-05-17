<template>
  <div>

    <van-cell v-for="(item,index) in exchangeMoneyLogs"  style="width: 100%" >
      <div slot="title" style="align-items: center;display: flex;height: 100%" >
        {{item.insertedAt}}
      </div>
      <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
        <image style="width: 30px;" mode="widthFix"  src="http://star.peyesight.cn/images/baobao.png"/>
      </div>
      <div style="align-items: center;display: flex;height: 100%;">
      <div >
        <div >{{item.money}} </div>
      </div>
      <div style="margin-left: 20px;">
        <div>{{item.statusStr}}</div>
      </div>
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

<script>
  export default {
    data() {
      return {
        user:{},
        exchangeMoneyLogs: [
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
        url: "/salter/exchangeMoneyLog/search",
        data: {userId:this.globalData.user.id}
      }).then(res => {
        if(res.success){
          this.exchangeMoneyLogs=res.data
        }else {
          this.alert("拼命加载中...");
        }
      });
    }
  };
</script>


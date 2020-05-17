<template>
  <div style="height: 100%;width: 100%;">
    <div>
      <img
        :src="active.homeImg"
        style="width:100%;height:100%;position:absolute;"
      >
    </div>


    <div style="width: 100%;text-align: -webkit-center;position:absolute;color: white;margin-top: 30%">


      <div>
        <van-radio-group :value="form.region"  @change="regionChange" >
          <van-row  >
            <van-col span="8"> 选择大区</van-col>
            <van-col span="8"> <van-radio name="1"><span style="color: white">QQ区</span></van-radio></van-col>
            <van-col span="8">  <van-radio name="2"><span style="color: white">微信区</span></van-radio></van-col>
          </van-row>
        </van-radio-group>

      </div>
     <div style="margin-top: 20px;">
       <van-radio-group :value="form.type"  @change="typeChange"  >
         <van-row >
           <van-col span="8"> 选择参加竞速OR道具</van-col>
           <van-col span="8">  <van-radio name="1"><span style="color: white">个人竞速赛</span></van-radio></van-col>
           <van-col span="8">  <van-radio name="2"><span style="color: white">个人道具赛</span></van-radio></van-col>
         </van-row>
       </van-radio-group>
     </div>



    </div>

    <div style="width: 100%;text-align: -webkit-center;position:fixed;bottom:5px;">
      <div style="width: 90%;">
        <van-button    type="info" size="large" @click="submitApply">提交报名</van-button>
      </div>
    </div>



  </div>
</template>

<script>
export default {
  data() {
    return {
      active:{},
      form:{
        name:"",
        type: '1',
        region:"1",
        userId:""
      }
    };
  },
  methods: {
    nameChange(e){
      this.form.name=e.mp.detail
    },
    typeChange(event) {
      this.form.type=event.mp.detail
    },
    regionChange(event) {
      this.form.region=event.mp.detail
    },
    submitApply() {
      this.post({
        url: "/salter/competition_entry/save",
        data: this.form
      }).then(res => {
        if(res.success){
          this.alert("报名成功");
        }else {
          this.alert(res.msg);
        }
      });

    },
  },
  mounted() {
    console.log("==================demo2");
    console.log(this.newroot().query.id);
  },

  onShow() {
    this.active = this.globalData.active;
    this.form.userId=this.globalData.user.id
  }
};
</script>


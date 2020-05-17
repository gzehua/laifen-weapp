<template>
  <div >
    <img src="http://star.peyesight.cn/images/sign_match.png" style="width:100%;" mode="widthFix">
    <picker  :range="regions" @change="regionChange">
      <view class="picker">
        <van-field
          label="选择大区"
          border="false"
          required
          readonly
          :value="form.region"
          icon="arrow-down"
          placeholder="选择QQ区OR微信区"
        />
      </view>
    </picker>

    <!--<picker  :range="types" @change="typeChange">-->
      <!--<view class="picker">-->
        <!--<van-field-->
          <!--label="参赛类型"-->
          <!--border="false"-->
          <!--required-->
          <!--readonly-->
          <!--:value="form.type"-->
          <!--icon="arrow-down"-->
          <!--placeholder="选择参加个人竞速OR个人道具"-->
        <!--/>-->
      <!--</view>-->
    <!--</picker>-->

    <van-field
      required
      placeholder="填写游戏昵称"
      label="游戏昵称"
      @change="nameChange"
      :value="form.name"
      border="false "
    />
    <div style="width: 100%;text-align: -webkit-center;">
      <div style="width: 90%;">
        <van-button   type="info" size="large" @click="submitApply">提交报名</van-button>
      </div>
    </div>

  </div>


</template>

<script>
export default {
  data() {
    return {
      active:{},
      regions:["微信区"],
      types:["个人竞速赛","个人道具赛"],
      form:{
        name:"",
        type: '',
        region:"",
        userId:""
      }
    };
  },
  methods: {
    nameChange(e){
      this.form.name=e.mp.detail
    },
    typeChange(e) {
      this.form.type=this.types[e.mp.detail.value]
    },
    regionChange(e) {
      this.form.region=this.regions[e.mp.detail.value]
    },
    submitApply() {
      if(this.isNull(this.form.region)){
        this.alert("请选择大区");
        return;
      }
      // if(this.isNull(this.form.type)){
      //   this.alert("请选择参赛类型");
      //   return;
      // }
      if(this.isNull(this.form.name)){
        this.alert("请填写游戏昵称");
        return;
      }
      this.post({
        url: "/salter/competition_entry/save",
        data: this.form
      }).then(res => {
        if(res.success){
          this.alert("报名成功");
          this.redirectTo("/pages/index/main");
        }else {
          this.alert(res.msg);
          this.redirectTo("/pages/index/main");
        }
      });

    },
  },
  mounted() {
    this.active = this.globalData.active;
    this.form.userId=this.globalData.user.id
  },
  onShow() {
  }
};
</script>


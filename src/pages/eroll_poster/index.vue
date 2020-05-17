<template>
  <div  style="height: 100%;width: 100%;">
    <div>
      <img
        :src="active.homeImg"
        style="width:100%;height:100%;position:absolute;"
      >
    </div>

<div style="width: 100%;text-align: -webkit-center;position:fixed;bottom:5px;">
  <div style="width: 90%;">
    <van-button    type="info" size="large" @click="goApply">立即报名参加</van-button>
  </div>
</div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      active:{}
    };
  },
  methods: {
    goApply(){
      this.redirectTo("/pages/apply_info/main");
    },
  },

  mounted() {

  },

  onShow() {
    this.active = this.globalData.active;
  }
};
</script>


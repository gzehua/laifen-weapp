<template>
  <div>

    <van-card
      v-for="(item,index) in anchorTeams"
      :tag="index+1"
      :title="item.title"
      custom-class="card"
      :thumb="item.photo"
      desc-class="desc"
    >
      <div slot="desc">
        <rich-text class='text_plain' :nodes="item.describe"></rich-text>

        <van-row>
          <van-col span="18">
            <div style="background-color: #FBECEF;border-radius: 10px;padding:6px;text-align: center;margin-top: 10px;">
              <span style="color: #AB4864;">热度：{{item.heat}} </span>
            </div>
          </van-col>
          <van-col span="6">
            <div @click="skipToPlayTour(item)" style="background-color: #FBECEF;border-radius: 10px;padding:6px;text-align: center;margin-top: 10px;">
              <span style="color: #AB4864;">去打赏 </span>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-card>



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
        anchorTeams:[],
        anchorTeam:{}
      };
    },
    methods: {
      skipToPlayTour(item){
        this.navigateTo("/pages/play_tour/main?anchorTeamId="+item.id+"&photo="+item.photo+"&name="+item.name);
      }
    },
    onShow(){
      this.post({
        url: "/salter/anchor_team/search",
        data: {}
      }).then(res => {
        this.anchorTeams = res.data;
      });
    },
    mounted() {

    }
  };
</script>


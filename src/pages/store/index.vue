<template>
  <div>

    <van-card
        v-for="item in goods"
      tag="拼多多"
      :title="item.name"
      custom-class="card"
      :thumb="item.imgUrl"
      desc-class="desc"
      :price="item.currPrice"
      :origin-price="item.costPrice"
    >
      <div slot="bottom" style="margin-top: 10px;">
        <van-row>
          <van-col span="12">
            <div @click="buy(item.id)"
                 style="background-color: #FFDE5B;padding: 10px;border-radius: 15px;text-align: center">
              <span style="color: #664C23;font-weight: 600">立即购买(奖励200来粉币)</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-card>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        goods:[],
      };
    },
    methods: {
      buy(goodsId){
        this.post({
          url: "/salter/pinduoduo/getGoodsWeAppPath",
          data: { goodsId:goodsId }
        }).then(res => {
          if (res.success) {
            wx.navigateToMiniProgram({
              appId: 'wx32540bd863b27570',
              path: res.data,
              success(res) {
              }
            })
          } else {
            this.alert(res.msg)
          }
        });
      },
      searchGoods(){
        this.post({
          url: "/salter/goods/search",
          data: {  }
        }).then(res => {
          this.goods =res.data
        });
      },
    },

    mounted() {
      this.searchGoods();

      console.log("==================demo2");
      console.log(this.newroot().query.id);
    }
  };
</script>


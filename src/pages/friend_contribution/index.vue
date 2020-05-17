<template>
  <div>

    <div style="text-align: center">
    <div style="font-size: 30px;">{{friendContributionScore}}</div>
    <div style="font-size: 12px;opacity: 0.7">好友累积贡献来粉币</div>
    </div>


    <div style="display: flex;text-align: center">
      <div style="flex-grow: 1" >
       <div style="display: flex;text-align: center;justify-content: center;height: 50px">
         <div style="display: flex;align-items: flex-end">
           <div style="font-size: 25px">{{friendNum}}</div><div style="font-size: 18px;">人</div>
         </div>
         <div @click="skipToFriendList">
           <span style="font-size: 0.6rem;background: #F48B4A;padding: 1px 5px 1px 5px;border-radius: 10px;color: white">查看好友</span>
         </div>
       </div>
        <div style="opacity: 0.7;font-size: 12px;">
          已邀请的好友
        </div>
      </div>

      <div style="flex-grow: 1" >
        <div style="display: flex;text-align: center;justify-content: center;height: 50px">
          <div style="display: flex;align-items: flex-end">
            <div style="font-size: 25px">{{friendInviteNum}}</div><div style="font-size: 18px;">人</div>
          </div>
        </div>
        <div style="opacity: 0.7;font-size: 12px;">
         好友邀请的好友
        </div>
      </div>
    </div>
    <div class="center" style="width: 100%">
      <div class="center" style="background-color: #FAE6E1;width: 55%;height: 35px;border-radius: 40px;margin-top: 10px;" @click="clock">
            <span style="font-size: 14px;color: #D68567">
              邀请好友获取一个红包钥匙
              <button open-type='share' size="mini" plain="true" id='btnShare0'   style="padding:0;line-height:0;background-color:transparent;border:none;"></button>
            </span>
      </div>

    </div>
    <div style="height: 20px;"></div>

    <div style="height: 1px;width: 100%;border-bottom:solid 1px #a7a7a7"></div>
    <div style="font-size: 14px;color:#6b4d55;padding: 10px;margin-top: 1px;background-color: white">
      <!--<image style="width: 20px;height: 20px;" :src=" icon.warn"/>-->
      <span style="margin-left: 8px;">好友帮赚规则</span>
    </div>
    <div style="height: 1px;width: 100%;border-bottom:solid 1px #a7a7a7;"></div>
    <div>
      <div style="color: black;font-size: 12px;" >
        <div style="text-align: center">
          <div style="text-align: left !important;   padding: 10px;">
            <p style="margin: 5px;"> 一级好友贡献好友来粉币的10%</p>
            <p style="margin: 5px; color:#5f5f5f;"> 解释：如一级好友每天获取300来粉币，你可每天获得30来粉币</p>
            <p style="margin: 5px;"> 二级好友贡献好友来粉币的5%</p>
            <p style="margin: 5px; color:#5f5f5f;"> 解释：如二级好友每天获取300来粉币，你了每天获取15来粉币</p>
          </div>
        </div>
      </div>


      <div style="height: 1px;width: 100%;border-bottom:solid 1px #a7a7a7"></div>
      <div style="font-size: 14px;color:#6b4d55;padding: 10px;margin-top: 1px;background-color: white">
        <!--<image style="width: 20px;height: 20px;" :src=" icon.warn"/>-->
        <span style="margin-left: 8px;">举例说明</span>
      </div>
      <div style="height: 1px;width: 100%;border-bottom:solid 1px #a7a7a7;"></div>


      <div style="color: black;font-size: 12px;" >
        <div style="text-align: center">
          <div style="text-align: left !important;   padding: 10px;">
            <p style="margin: 5px;">  每人邀请200人，每天获取300来粉币</p>
            <p style="margin: 5px;"> 一级好友奖励：30*200=6000来粉币</p>
            <p style="margin: 5px;"> 二级好友奖励：15*40000=600000来粉币</p>
            <p style="margin: 5px;"> 每日总计可获得606000(等于2020元)</p>
          </div>
        </div>
      </div>




    </div>
    <div style="width: 100%;border-radius: 10px;" class="center">
      <div style="width: 300px" >
        <ad  unit-id="adunit-7dff38f9301dc30f" ad-intervals="30" ></ad>
      </div>
    </div>



  </div>
</template>
<style>

  .center {
    align-items: center;
    justify-content: center;
    display: flex;
  }
</style>
<script>
  export default {
    data() {
      return {
        friendNum:"",
        friendInviteNum:"",
        friendContributionScore:"",
      };
    },
    methods: {
      skipToFriendList(){
        this.navigateTo("/pages/friend_list/main");
      },
      flushData() {
        this.post({
          url: "/salter/user/friend_contribution",
          data: { activeId: this.globalData.active.id, userId: this.globalData.user.id }
        }).then(res => {
         this. friendNum=res.data.friendNum
         this. friendInviteNum=res.data.friendInviteNum
         this. friendContributionScore=res.data.friendContributionScore
        });
      }

    },
    onShareAppMessage(res) {
      return {
        title: '玩烧脑小游戏获取积分，积分可兑换现金红包！~',
        path: '/pages/home/main?a='+this.globalData.active.id+"&u="+this.globalData.user.id,
        imageUrl:"http://star.peyesight.cn/images/share.png"
      }},
    mounted() {
    this.flushData();
    }
  };
</script>


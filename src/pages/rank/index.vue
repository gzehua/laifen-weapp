<template>
  <div class="home" style="width: 98%;height: 100%;margin-left:1%;">

    <!--<div style="font-size: 14px;color:#6b4d55;display: flex;padding: 10px;margin-top: 1px;align-items: center">-->
    <!--<image src="http://star.peyesight.cn/images/paihang.png" style="width: 100%" mode="widthFix"></image>-->
    <!--</div>-->
    <van-tabs :active="active" @change="tabChange"  tab-class="tab" title-style="width:200px;">
      <van-tab title="抽奖次数榜" style="overflow-y: auto">

        <div calss="ranking"
             style="margin-top: 5px;background: url('https://alcon-star.oss-cn-beijing.aliyuncs.com/se/top.png');background-size: 100% 100%;height:150px;">
          <div v-for="item in ranks" style=" width: 33.3%;    float:left; height:100%;">
            <div v-if="item.rank==1" style="height:20px;"></div>
            <div v-else style="height:30px;"></div>
            <div class="tui-table-div">
              <div class="grid" style="width:100%;">
                <image class="grid2_img"  mode="widthFix" :src="item.avatar_url"></image>
              </div>
            </div>
            <div class="font_css" >第{{item.rank}}名</div>
            <div class="font_css" style="font-size: 12px;color: #6A6A6A">{{item.user_name}}</div>
            <div class="font_css" style=" color:#feb21f;font-weight: 700;font-size: 14px;">{{item.score}}</div>
          </div>
        </div>
        <div @click="showRankReward" class="center"   style="font-size: 14px;color:#6b4d55;display: flex;padding: 2px;margin-top: 1px;background-color: white;">
          <image style="width: 100%;" src="http://star.peyesight.cn/images/rankreward.png" mode="widthFix"/>
        </div>

        <van-cell v-for="(item,index) in rankTop10" v-if="index>2" style="width: 100%;" >
          <div slot="title" style="align-items: center;display: flex;height: 100%;font-size: 12px;">
            <image class="grid_img" mode="widthFix" :src="item.avatar_url"></image>
            <div style="margin-left: 20px;">{{item.user_name}}</div>
            <div style="margin-left: 20px;">周累计抽奖次数： {{item.score}}</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书,serif">NO.{{item.rank}}</span>
          </div>

        </van-cell>

        <!--<div style="border-top: 1px solid #6b4d55;height:1px;margin-left: 10px;margin-right: 10px;"></div>-->
        <!--<div class="prop" style=" width:100%;height:100%; background-color: white;margin-top: 1px;padding-left: 10px;">-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">一丶周来粉币获取排行，每周日零点刷新</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">二丶第一名：排位一小时+{{exchangeText}}X10</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">三丶第二名：排位半小时+{{exchangeText}}X5</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">四丶第三名：排位20分钟+{{exchangeText}}X5</span>-->
        <!--</p>-->
        <!--&lt;!&ndash;<p><span style="font-size: 14px;color:#6b4d55 ">2.请将小票摆放平整后拍照，确保拍照清晰</span></p>&ndash;&gt;-->

        <!--</div>-->

        <div style="margin-top: 2px;">
          <ad unit-id="adunit-243c3780ba209b16" ad-type="video" ad-theme="black"></ad>
        </div>

        <van-cell style="width: 100%;position:fixed;bottom:0px;z-index: 100">
          <div slot="title" style="align-items: center;display: flex;height: 20px;">
            <image class="grid_img" mode="widthFix" :src="user.avatarUrl"></image>
            <div style="margin-left: 20px;">{{user.userName}}</div>
            <div style="margin-left: 20px;">周累计抽奖次数： {{currentScore}}</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书">NO.{{currentRank}}</span>
          </div>
        </van-cell>
        <van-dialog custom-style="margin-top: 20%"  :show="showRankRewardDialog"   @close="close"  use-slot  @confirm="queren" :confirmButtonText="confirmButtonText"  >
          <div style="color: #814552;font-size: 14px;margin-top: 10px;" >
            <div style="text-align: center">周累计抽奖次数排行奖励(每周一零点刷新)</div>
          </div>
          <div style="color: black;font-size: 12px;padding: 10px;" >
            <div style="text-align: center">
              <div style="text-align: left !important; color:#5f5f5f;   padding: 10px;">
                <p v-for="(item,index) in scoreRankReward" style="margin: 5px;">{{index+1+"."+item.content}}</p>
              </div>
            </div>
          </div>
        </van-dialog>



      </van-tab>

      <van-tab  title="邀请好友榜" style="overflow-y: auto;">

        <div  calss="ranking"
             style="margin-top: 5px;background: url('https://alcon-star.oss-cn-beijing.aliyuncs.com/se/top.png');background-size: 100% 100%;height:150px;">
          <div v-for="item in ranks" style=" width: 33.3%;    float:left; height:100%;">
            <div v-if="item.rank==1" style="height:20px;"></div>
            <div v-else style="height:30px;"></div>
            <div class="tui-table-div">
              <div class="grid" style="width:100%;">
                <image class="grid2_img"  mode="widthFix" :src="item.avatar_url"></image>
              </div>
            </div>
            <div class="font_css" >第{{item.rank}}名</div>
            <div class="font_css" style="font-size: 12px;color: #6A6A6A">{{item.user_name}}</div>
            <div class="font_css" style=" color:#feb21f;font-weight: 700;font-size: 14px;">{{item.score}}</div>
          </div>


        </div>

        <div @click="showRankReward" class="center"   style="font-size: 14px;color:#6b4d55;display: flex;padding: 2px;margin-top: 1px;background-color: white;">
          <image style="width: 100%;" src="http://star.peyesight.cn/images/rankreward.png" mode="widthFix"/>
        </div>
        <van-cell v-for="(item,index) in rankTop10" v-if="index>2" style="width: 100%;" >
          <div slot="title" style="align-items: center;display: flex;height: 100%;font-size: 12px;">
            <image class="grid_img" mode="widthFix" :src="item.avatar_url"></image>
            <div style="margin-left: 20px;">{{item.user_name}}</div>
            <div style="margin-left: 20px;">周邀请好友数： {{item.score}}</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书,serif">NO.{{item.rank}}</span>
          </div>

        </van-cell>

        <!--<div style="border-top: 1px solid #6b4d55;height:1px;margin-left: 10px;margin-right: 10px;"></div>-->


        <div style="margin-top: 2px;">
          <ad unit-id="adunit-243c3780ba209b16" ad-type="video" ad-theme="black"></ad>
        </div>

        <div style="height: 50px;"></div>

        <!--<div style="border-top: 1px solid #6b4d55;height:1px;margin-left: 10px;margin-right: 10px;"></div>-->
        <!--<div class="prop" style=" width:100%;height:100%; background-color: white;margin-top: 1px;padding-left: 10px;">-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">一丶周来粉币获取排行，每周日零点刷新</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">二丶第一名：排位一小时+{{exchangeText}}X10</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">三丶第二名：排位半小时+{{exchangeText}}X5</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">四丶第三名：排位20分钟+{{exchangeText}}X5</span>-->
        <!--</p>-->
        <!--&lt;!&ndash;<p><span style="font-size: 14px;color:#6b4d55 ">2.请将小票摆放平整后拍照，确保拍照清晰</span></p>&ndash;&gt;-->

        <!--</div>-->


        <van-cell style="width: 100%;position:fixed;bottom:0px;z-index: 100">
          <div slot="title" style="align-items: center;display: flex;height: 20px;">
            <image class="grid_img" mode="widthFix" :src="user.avatarUrl"></image>
            <div style="margin-left: 20px;">{{user.userName}}</div>
            <div style="margin-left: 20px;">周邀请好友数： {{currentScore}}</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书">NO.{{currentRank}}</span>
          </div>
        </van-cell>
        <van-dialog custom-style="margin-top: 20%"  :show="showRankRewardDialog"   @close="close"  use-slot  @confirm="queren" :confirmButtonText="confirmButtonText"  >
          <div style="color: #814552;font-size: 14px;margin-top: 10px;" >
            <div style="text-align: center">周邀请好友数量排行奖励(每周一零点刷新)</div>
          </div>
          <div style="color: black;font-size: 12px;padding: 10px;" >
            <div style="text-align: center">
              <div style="text-align: left !important; color:#5f5f5f;   padding: 10px;">
                <p v-for="(item,index) in scoreRankReward" style="margin: 5px;">{{index+1+"."+item.content}}</p>
              </div>
            </div>
          </div>
        </van-dialog>


      </van-tab>
      <van-tab title="周来粉币榜" style="overflow-y: auto">

        <div calss="ranking"
             style="margin-top: 5px;background: url('https://alcon-star.oss-cn-beijing.aliyuncs.com/se/top.png');background-size: 100% 100%;height:150px;">
          <div v-for="item in ranks" style=" width: 33.3%;    float:left; height:100%;">
            <div v-if="item.rank==1" style="height:20px;"></div>
            <div v-else style="height:30px;"></div>
            <div class="tui-table-div">
              <div class="grid" style="width:100%;">
                <image class="grid2_img"  mode="widthFix" :src="item.avatar_url"></image>
              </div>
            </div>
            <div class="font_css" >第{{item.rank}}名</div>
            <div class="font_css" style="font-size: 12px;color: #6A6A6A">{{item.user_name}}</div>
            <div class="font_css" style=" color:#feb21f;font-weight: 700;font-size: 14px;">{{item.score}}</div>
          </div>


        </div>
        <div @click="showRankReward" class="center"   style="font-size: 14px;color:#6b4d55;display: flex;padding: 2px;margin-top: 1px;background-color: white;">
          <image style="width: 100%;" src="http://star.peyesight.cn/images/rankreward.png" mode="widthFix"/>
        </div>
        <van-cell v-for="(item,index) in rankTop10" v-if="index>2" style="width: 100%;" >
          <div slot="title" style="align-items: center;display: flex;height: 100%;font-size: 12px;">
            <image class="grid_img" mode="widthFix" :src="item.avatar_url"></image>
            <div style="margin-left: 20px;">{{item.user_name}}</div>
            <div style="margin-left: 20px;">周累计来粉币： {{item.score}}</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书,serif">NO.{{item.rank}}</span>
          </div>

        </van-cell>


          <div style="margin-top: 2px;">
            <ad unit-id="adunit-243c3780ba209b16" ad-type="video" ad-theme="black"></ad>
          </div>

        <div style="height: 50px;"></div>

        <!--<div style="border-top: 1px solid #6b4d55;height:1px;margin-left: 10px;margin-right: 10px;"></div>-->
        <!--<div class="prop" style=" width:100%;height:100%; background-color: white;margin-top: 1px;padding-left: 10px;">-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">一丶周来粉币获取排行，每周日零点刷新</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">二丶第一名：排位一小时+{{exchangeText}}X10</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">三丶第二名：排位半小时+{{exchangeText}}X5</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span style="font-size: 12px;color:#6b4d55 ">四丶第三名：排位20分钟+{{exchangeText}}X5</span>-->
        <!--</p>-->
        <!--&lt;!&ndash;<p><span style="font-size: 14px;color:#6b4d55 ">2.请将小票摆放平整后拍照，确保拍照清晰</span></p>&ndash;&gt;-->

        <!--</div>-->


        <van-cell style="width: 100%;position:fixed;bottom:0px;z-index: 100">
          <div slot="title" style="align-items: center;display: flex;height: 20px;">
            <image class="grid_img" mode="widthFix" :src="user.avatarUrl"></image>
            <div style="margin-left: 20px;">{{user.userName}}</div>
            <div style="margin-left: 20px;">周累计来粉币： {{currentScore}}</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书">NO.{{currentRank}}</span>
          </div>
        </van-cell>
        <van-dialog custom-style="margin-top: 20%"  :show="showRankRewardDialog"   @close="close"  use-slot  @confirm="queren" :confirmButtonText="confirmButtonText"  >
          <div style="color: #814552;font-size: 14px;margin-top: 10px;" >
            <div style="text-align: center">周来粉币累积排行奖励(每周一零点刷新)</div>
          </div>
          <div style="color: black;font-size: 12px;padding: 10px;" >
            <div style="text-align: center">
              <div style="text-align: left !important; color:#5f5f5f;   padding: 10px;">
                <p v-for="(item,index) in scoreRankReward" style="margin: 5px;">{{index+1+"."+item.content}}</p>
              </div>
            </div>
          </div>
        </van-dialog>


      </van-tab>

      <van-tab :title="exchangeText+'排行榜'" style="overflow-y: auto">
        <div calss="ranking"
             style="margin-top: 5px;background: url('https://alcon-star.oss-cn-beijing.aliyuncs.com/se/top.png');background-size: 100% 100%;height:150px;">
          <div v-for="item in ranks" style=" width: 33.3%;    float:left; height:100%;">
            <div v-if="item.rank==1" style="height:20px;"></div>
            <div v-else style="height:30px;"></div>
            <div class="tui-table-div">
              <div class="grid" style="width:100%;">
                <image class="grid2_img"  mode="widthFix" style="border-radius: 50px" :src="item.avatar_url"></image>
              </div>
            </div>
            <div class="font_css" >第{{item.rank}}名</div>
            <div class="font_css" style="font-size: 12px;color: #6A6A6A">{{item.user_name}}</div>
            <div class="font_css" style=" color:#feb21f;font-weight: 700;font-size: 14px;">{{item.money}}</div>
          </div>


        </div>


        <van-cell v-for="(item,index) in rankTop10" v-if="index>2" style="width: 100%;" >
          <div slot="title" style="align-items: center;display: flex;height: 100%;font-size: 12px;">
            <image class="grid_img" mode="widthFix" :src="item.avatar_url"></image>
            <div style="margin-left: 20px;">{{item.user_name}}</div>
            <div style="margin-left: 20px;">累计{{exchangeText}}： {{item.money}}</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书,serif">NO.{{item.rank}}</span>
          </div>

        </van-cell>


        <van-cell style="width: 100%;position:fixed;bottom:0px;z-index: 100">
          <div slot="title" style="align-items: center;display: flex;height: 20px;">
            <image class="grid_img" mode="widthFix" :src="user.avatarUrl"></image>
            <div style="margin-left: 20px;">{{user.userName}}</div>
            <div style="margin-left: 20px;">累计{{exchangeText}}： {{currentScore}}</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书">NO.{{currentRank}}</span>
          </div>

        </van-cell>

        <div style="margin-top: 2px;">
          <ad unit-id="adunit-243c3780ba209b16" ad-type="video" ad-theme="black"></ad>
        </div>
      </van-tab>




      <van-tab title="连续签到榜" style="overflow-y: auto">
        <div calss="ranking"
             style="margin-top: 5px;background: url('https://alcon-star.oss-cn-beijing.aliyuncs.com/se/top.png');background-size: 100% 100%;height:150px;">
          <div v-for="item in ranks" style=" width: 33.3%;    float:left; height:100%;">
            <div v-if="item.rank==1" style="height:20px;"></div>
            <div v-else style="height:30px;"></div>
            <div class="tui-table-div">
              <div class="grid" style="width:100%;">
                <image class="grid2_img"  mode="widthFix" :src="item.avatar_url"></image>
              </div>
            </div>
            <div class="font_css" >第{{item.rank}}名</div>
            <div class="font_css" style="font-size: 12px;color: #6A6A6A">{{item.user_name}}</div>
            <div class="font_css" style=" color:#feb21f;font-weight: 700;font-size: 14px;">{{item.val}}</div>
          </div>


        </div>
        <van-cell v-for="(item,index) in rankTop10" v-if="index>2" style="width: 100%;" >
          <div slot="title" style="align-items: center;display: flex;height: 100%;font-size: 12px;">
            <image class="grid_img" mode="widthFix" :src="item.avatar_url"></image>
            <div style="margin-left: 20px;">{{item.user_name}}</div>
            <div style="margin-left: 20px;">连续签到： {{item.val}}天</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书,serif">NO.{{item.rank}}</span>
          </div>

        </van-cell>


        <van-cell style="width: 100%;position:fixed;bottom:0px;z-index: 100">
          <div slot="title" style="align-items: center;display: flex;height: 20px;">
            <image class="grid_img" mode="widthFix" :src="user.avatarUrl"></image>
            <div style="margin-left: 20px;">{{user.userName}}</div>
            <div style="margin-left: 20px;">连续签到： {{currentScore}}天</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书">NO.{{currentRank}}</span>
          </div>

        </van-cell>

        <div style="margin-top: 2px;">
          <ad unit-id="adunit-243c3780ba209b16" ad-type="video" ad-theme="black"></ad>
        </div>
        <div style="height: 50px;"></div>
      </van-tab>

      <van-tab title="累计签到榜" style="overflow-y: auto">
        <div calss="ranking"
             style="margin-top: 5px;background: url('https://alcon-star.oss-cn-beijing.aliyuncs.com/se/top.png');background-size: 100% 100%;height:150px;">
          <div v-for="item in ranks" style=" width: 33.3%;    float:left; height:100%;">
            <div v-if="item.rank==1" style="height:20px;"></div>
            <div v-else style="height:30px;"></div>
            <div class="tui-table-div">
              <div class="grid" style="width:100%;">
                <image class="grid2_img"  mode="widthFix" :src="item.avatar_url"></image>
              </div>
            </div>
            <div class="font_css" >第{{item.rank}}名</div>
            <div class="font_css" style="font-size: 12px;color: #6A6A6A">{{item.user_name}}</div>
            <div class="font_css" style=" color:#feb21f;font-weight: 700;font-size: 14px;">{{item.val}}</div>
          </div>


        </div>
        <van-cell v-for="(item,index) in rankTop10" v-if="index>2" style="width: 100%;" >
          <div slot="title" style="align-items: center;display: flex;height: 100%;font-size: 12px;">
            <image class="grid_img" mode="widthFix" :src="item.avatar_url"></image>
            <div style="margin-left: 20px;">{{item.user_name}}</div>
            <div style="margin-left: 20px;">累计签到： {{item.val}}天</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书,serif">NO.{{item.rank}}</span>
          </div>

        </van-cell>


        <van-cell style="width: 100%;position:fixed;bottom:0px;z-index: 100">
          <div slot="title" style="align-items: center;display: flex;height: 20px;">
            <image class="grid_img" mode="widthFix" :src="user.avatarUrl"></image>
            <div style="margin-left: 20px;">{{user.userName}}</div>
            <div style="margin-left: 20px;">累计签到： {{currentScore}}天</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书">NO.{{currentRank}}</span>
          </div>

        </van-cell>

        <div style="margin-top: 2px;">
          <ad unit-id="adunit-243c3780ba209b16" ad-type="video" ad-theme="black"></ad>
        </div>
        <div style="height: 50px;"></div>
      </van-tab>


      <van-tab title="成长值排行" style="overflow-y: auto">
        <div calss="ranking"
             style="margin-top: 5px;background: url('https://alcon-star.oss-cn-beijing.aliyuncs.com/se/top.png');background-size: 100% 100%;height:150px;">
          <div v-for="item in ranks" style=" width: 33.3%;    float:left; height:100%;">
            <div v-if="item.rank==1" style="height:20px;"></div>
            <div v-else style="height:30px;"></div>
            <div class="tui-table-div">
              <div class="grid" style="width:100%;">
                <image class="grid2_img"  mode="widthFix" :src="item.avatar_url"></image>
              </div>
            </div>
            <div class="font_css" >第{{item.rank}}名</div>
            <div class="font_css" style="font-size: 12px;color: #6A6A6A">{{item.user_name}}</div>
            <div class="font_css" style=" color:#feb21f;font-weight: 700;font-size: 14px;">{{item.val}}</div>
          </div>


        </div>
        <van-cell v-for="(item,index) in rankTop10" v-if="index>2" style="width: 100%;" >
          <div slot="title" style="align-items: center;display: flex;height: 100%;font-size: 12px;">
            <image class="grid_img" mode="widthFix" :src="item.avatar_url"></image>
            <div style="margin-left: 20px;">{{item.user_name}}</div>
            <div style="margin-left: 20px;">成长值： {{item.val}}</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书,serif">NO.{{item.rank}}</span>
          </div>

        </van-cell>


        <van-cell style="width: 100%;position:fixed;bottom:0px;z-index: 100">
          <div slot="title" style="align-items: center;display: flex;height: 20px;">
            <image class="grid_img" mode="widthFix" :src="user.avatarUrl"></image>
            <div style="margin-left: 20px;">{{user.userName}}</div>
            <div style="margin-left: 20px;">成长值： {{currentScore}}</div>
          </div>
          <div slot="icon" style="align-items: center;justify-content: center;display: flex;padding: 10px;">
            <span style="color: #EE722D;font-family: 华文隶书">NO.{{currentRank}}</span>
          </div>

        </van-cell>

        <div style="margin-top: 2px;">
          <ad unit-id="adunit-243c3780ba209b16" ad-type="video" ad-theme="black"></ad>
        </div>
        <div style="height: 50px;"></div>
      </van-tab>


    </van-tabs>


  </div>
</template>
<style>
  .van-ellipsis{
    white-space: nowrap !important;
    overflow:visible !important;
    text-overflow:clip !important;

  }

</style>
<script>
  export default {
    data() {
      return {
        isShowShareRank:false,
        exchangeText:"",
        active: 0,
        scoreRankReward:[],
        confirmButtonText:"知道啦",
        showRankRewardDialog:false,
        ranks: [],
        rankTop10: [],
        currentRank: "",
        currentScore: "",
        user: {},
        videos: [{
          url: "http://star.peyesight.cn/video/huangshan.mp4"
        }],
        lunboImgs: [
          {
            imgUrl: "http://star.peyesight.cn/images/lunbo_1.png"
          }
        ],
        show:false,

      };
    },
    methods: {
      tabChange(e) {
        switch (e.mp.detail.index) {
          case 0:
            this.lotteryNumRank();
            break;
          case 1:
            this.shareNumRank();
            break;
          case 2:
            this.scoreRank();
            break;
          case 3:
            this.moneyRank();
            break;
          case 4:
            this.clockRank();
            break;
          case 5:
            this.clockSumRank();
            break;
          case 6:
            this.expRank();
            break;
        }

        console.log()
      },
      close(){
        this.showRankRewardDialog=false;
      },
      showRankReward(){
        this.showRankRewardDialog=true;
      },
      skipToUser() {
        this.navigateTo("/pages/user/main");
      },
      skipToFace() {
        // this.alert("主播拼命开发中~")
        this.navigateTo("/pages/change_face/main");
      }, skipToClock() {

        this.navigateTo("/pages/clock/main");


        /*  this.navigateTo("/pages/sign_match/main");*/
      }, skipToVideo() {
        this.alert("主播拼命开发中,请耐心等待");
        /*  this.navigateTo("/pages/sign_match/main");*/
      },
      skipToSign() {
        this.navigateTo("/pages/sign_match/main");
      },
      skipToLottery() {
        this.navigateTo("/pages/lottery/main");
      },
      skipTofeedback() {
        this.navigateTo("/pages/feedback/main");
      },
      swapArray(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      },
      lotteryNumRank(){
        this.post({
          url: "/salter/user/lotteryNumRank",
          data: { userId: this.globalData.user.id }
        }).then(res => {
          this.ranks = this.swapArray(res.data.ranks, 0, 1);
          this.rankTop10 = res.data.rankTop10;
          this.currentRank = res.data.currentRank;
          this.currentScore = res.data.currentScore;
          this.scoreRankReward=res.data.scoreRankReward;
        });
      },
      shareNumRank(){
        this.post({
          url: "/salter/user/shareNumRank",
          data: { userId: this.globalData.user.id }
        }).then(res => {
          this.ranks = this.swapArray(res.data.ranks, 0, 1);
          this.rankTop10 = res.data.rankTop10;
          this.currentRank = res.data.currentRank;
          this.currentScore = res.data.currentScore;
          this.scoreRankReward=res.data.scoreRankReward;
        });
      },
      clockRank(){
        this.post({
          url: "/salter/user/clockRank",
          data: { userId: this.globalData.user.id }
        }).then(res => {
          this.ranks = this.swapArray(res.data.ranks, 0, 1);
          this.rankTop10 = res.data.rankTop10;
          this.currentRank = res.data.currentRank;
          this.currentScore = res.data.currentScore;
        });
      },
      clockSumRank(){
        this.post({
          url: "/salter/user/clockSumRank",
          data: { userId: this.globalData.user.id }
        }).then(res => {
          this.ranks = this.swapArray(res.data.ranks, 0, 1);
          this.rankTop10 = res.data.rankTop10;
          this.currentRank = res.data.currentRank;
          this.currentScore = res.data.currentScore;
        });
      },
      expRank(){
        this.post({
          url: "/salter/user/expRank",
          data: { userId: this.globalData.user.id }
        }).then(res => {
          this.ranks = this.swapArray(res.data.ranks, 0, 1);
          this.rankTop10 = res.data.rankTop10;
          this.currentRank = res.data.currentRank;
          this.currentScore = res.data.currentScore;
        });
      },
      moneyRank(){
        this.post({
          url: "/salter/user/moneyRank",
          data: { userId: this.globalData.user.id }
        }).then(res => {
          this.ranks = this.swapArray(res.data.ranks, 0, 1);
          this.rankTop10 = res.data.rankTop10;
          this.currentRank = res.data.currentRank;
          this.currentScore = res.data.currentScore;
        });
      },
      scoreRank(){
        this.post({
          url: "/salter/user/rankingList",
          data: { userId: this.globalData.user.id }
        }).then(res => {
          this.ranks = this.swapArray(res.data.ranks, 0, 1);
          this.rankTop10 = res.data.rankTop10;
          this.currentRank = res.data.currentRank;
          this.currentScore = res.data.currentScore;
          this.scoreRankReward=res.data.scoreRankReward;
        });
      }
    },
    onShow() {
      let _this=this;
      _this.show = false;
      this.checkBannerResource(function() {
        _this.show = true;
      });
    },
    mounted() {
      if(this.globalData.active.isOpenGame==1){
        this.isShowShareRank=true;
      }
      this.exchangeText=this.globalData.active.name
      this.user = this.globalData.user;
      this.lotteryNumRank();
    }
  };
</script>

<style lang="less">
  @import "../../../static/css/home.less";
  .center {
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .van-cell{
    height:35px;
    font-size:12px;

  }
  page {
    background: #efefef;
  }
  .grid {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grid_img {
    width: 25px;
    border-radius: 50px;
  }

  .font_css {
    height: 25px;
    line-height: 25px;
    font-weight: 500;
    text-align: center;
  }

  .grid2_img {
    width: 30px;
    border-radius: 50px;
  }

  .tui-table-div {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }

  .tui-col-3 {
    flex: 0 0 auto;
    width: 33.33333333%;
    text-align: center;
    color: #797979;
    padding: 40 rpx 0;
    font-size: 30 rpx;
  }

  .tui-col-4 {
    flex: 0 0 auto;
    width: 25%;
    text-align: center;
    color: #797979;
    padding: 40 rpx 0;
    font-size: 30 rpx;
  }

  .tui-col-5 {
    flex: 0 0 auto;
    width: 20%;
    text-align: center;
    color: #797979;
    padding: 40 rpx 0;
    font-size: 30 rpx;
  }

  .tui-col-6 {
    height: 100%;
    line-height: 50px;
    width: 25%;
    float: left;
  }

</style>

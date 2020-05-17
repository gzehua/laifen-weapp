<template>
  <div>
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/labe_bg_2.png"
      style="position:fixed;z-index:-10;width:100%;height:100%;"
    >
    <!--==================下一步按钮============================-->
    <div
      style="width:100%;text-align:center;position:fixed;z-index:10;"
      :style="{'bottom':buttonBottom}"
    >
      <form @submit="nextPage" report-submit="true">
        <button
          style="width:32%;padding:0;line-height:0;background-color:transparent;border:none;"
          plain="true"
          form-type="submit"
        >
          <img
            src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/next_button.png"
            style="width:100%;margin-top:10px;"
            mode="widthFix"
          >
        </button>
      </form>
    </div>
    <!--==================下一步按钮============================-->
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:16%;z-index:3;left:10%;top:12%;"
      mode="widthFix"
    >
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:8%;z-index:3;left:6%;top:45%;"
      mode="widthFix"
    >
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:8%;z-index:3;right:20%;top:25%;"
      mode="widthFix"
    >
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:16%;z-index:1;left:20%;bottom:12%;margin-top:-3%;"
      mode="widthFix"
    >
    <div style="position:absolute;width:100%;height:100%;">
      <img
        src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/4_title.png"
        style="width:100%;z-index:1;position :relative;"
        mode="widthFix"
      >
      <div style="width:100%;" :style="{'height':height}"></div>
      <template v-for="(item,index) in labels">
        <img
          :src="'https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/4_label'+(index+1)+'.png'"
          v-bind:style="{'margin-left':item.marginLeft,'margin-top':item.marginTop,'width':item.width}"
          @click="seleceLabel(item)"
          style="display:block;"
          mode="widthFix"
        >
        <div
          :style="item.id==selectId?{'display':'block'}:{'display':'none'}"
          style="position:relative;"
        >
          <img
            src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/select.png"
            style="width:6%;position: absolute;top: 45%;transform: translateY(-150%);right:30%;"
            mode="widthFix"
          >
        </div>
        <img
          src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/2_label_under.png"
          class="imgUnderClass"
          mode="widthFix"
        >
      </template>
    </div>
  </div>
</template>
<style>
.imgClass {
  width: 40%;
  display: block;
  margin-left: 30%;
}
.imgUnderClass {
  width: 40%;
  display: block;
  margin-left: 30%;
}
</style>

<script>
export default {
  data() {
    return {
      selectId: null,
      toName:null,
      height: "10px",
      buttonBottom: "6.5%",
      labels: [
        {
          id: 14,
          width: "40%",
          marginLeft: "30%",
          marginTop: "3%",
          toName: "珍贵家人"
        },
        {
          id: 15,
          width: "40%",
          marginLeft: "30%",
          marginTop: "0%",
          toName: "亲密爱人"
        },
        {
          id: 16,
          width: "40%",
          marginLeft: "30%",
          marginTop: "0%",
          toName: "闺蜜&基友"
        },
        {
          id: 17,
          width: "40%",
          marginLeft: "30%",
          marginTop: "0%",
          toName: "宝贝爱宠"
        },
        {
          id: 18,
          width: "40%",
          marginLeft: "30%",
          marginTop: "0%",
          toName: "独特的自己"
        },
        {
          id: 19,
          width: "40%",
          marginLeft: "30%",
          marginTop: "0%",
          toName: "水梯度"
        }
      ],
      labelIds: []
    };
  },
  methods: {
    //==========日志监测begin
    getLog() {
      return { pageName: "第四个选择页", operation: "页面加载完成" };
    },
    //==========日志监测end
    nextPage(e) {
      this.saveFormId(e);
      //==========日志监测begin
      var log = this.getLog();
      log.operation = "下一步";
      this.saveOperationLog(log);
      //==========日志监测end
      if (this.isNull(this.selectId)) {
        this.alert("请选择一个标签");
        return;
      }
      this.labelIds = [];
      this.labelIds.push(this.newroot().query.label_id_1);
      this.labelIds.push(this.newroot().query.label_id_2);
      this.labelIds.push(this.newroot().query.label_id_3);
      this.labelIds.push(this.selectId);
      console.log(this.labelIds);
      this.post({
        url: "/dt1520/poster/save",
        data: {
          userId: this.globalData.user.id,
          activeId: this.globalData.active.id,
          sourceUserId: this.globalData.shareUserId,
          labelIds: this.labelIds,
          toName: this.toName
        }
      }).then(data => {
        if (data.success) {
          this.navigateTo(
            "/pages/poster_create/main?lableNum=" +
              data.data.waudPosterRecord.lableNum +
              "&poster_record_id=" +
              data.data.waudPosterRecord.id +
              "&toName=" +
              this.toName +
              "&merge_rate=" +
              data.data.merge_rate +
              "&face_key=" +
              data.data.face_key +
              "&face_secret=" +
              data.data.face_secret
          );
        } else {
          this.alert(data.data);
        }
      });
    },
    seleceLabel(item) {
      this.selectId = item.id;
      this.toName = item.toName;
      //==========日志监测begin
      var log = this.getLog();
      log.operation = "选择标签";
      log.remark = item.id;
      this.saveOperationLog(log);
      //==========日志监测end
    }
  },

  mounted() {
    this.selectId = null;
    this.toName = null;
    //==========日志监测
    var log = this.getLog();
    this.saveOperationLog(log);
    //==========日志监测
  },
  onShow() {
    this.buttonBottom = this.getButtonBottom();
    if (this.isIphoneX()) {
      this.height = "50px";
    }
  }
};
</script>


<template>
  <div>
    <!--=====下图是背景==-->
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
    <!--=============================3个小水滴begin===============================================-->
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:16%;z-index:1;left:10%;top:20%;"
      mode="widthFix"
    >
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:12%;z-index:1;right:12%;top:44%;"
      mode="widthFix"
    >
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:12%;z-index:1;left:20%;bottom:12%;"
      mode="widthFix"
    >
    <!--=============================3个小水滴end===============================================-->
    <div style="position:absolute;width:100%;height:100%;">
      <!--下面img为标题-->
      <img
        src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/2_title.png"
        style="width:100%;"
        mode="widthFix"
      >
      <div style="width:70%;margin-left:15%;text-align:center;">
        <div style="width:100%;height:35px;" :style="{'margin-top':marginTop}"></div>
        <!---===============要 选择的标签begin======================-->
        <template v-for="(item,index) in labels">
          <img
            :src="'https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/2_label'+(index+1)+'.png'"
            style="display:block;"
            v-bind:style="{'margin-left':item.marginLeft,'margin-top':item.marginTop,'width':item.width}"
            @click="seleceLabel(item.id)"
            mode="widthFix"
          >
          <div
            :style="item.id==selectId?{'display':'block'}:{'display':'none'}"
            style="position:relative;"
          >
            <img
              src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/select.png"
              style="width:20%;position: absolute;top: 50%;transform: translateY(-100%);transform: translateY(-100%);right:15%;"
              mode="widthFix"
            >
          </div>
          <img
            src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/2_label_under.png"
            style="width:62%;display:block;margin-left:20%;"
            mode="widthFix"
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectId: null,
      marginTop: "0px",
      buttonBottom: "6.5%",
      labels: [
        { id: 7, width: "70%", marginLeft: "15%", marginTop: "0px" },
        { id: 8, width: "70%", marginLeft: "18%", marginTop: "10px" },
        { id: 9, width: "70%", marginLeft: "15%", marginTop: "10px" }
      ]
    };
  },
  methods: {
    //==========日志监测begin
    getLog() {
      return { pageName: "第二个选择页", operation: "页面加载完成" };
    },
    //==========日志监测end
    nextPage(e) {
      //==========日志监测begin
      var log = this.getLog();
      log.operation = "下一步";
      this.saveOperationLog(log);
      //==========日志监测end
      this.saveFormId(e);
      if (this.isNull(this.selectId)) {
        this.alert("请选择一个标签");
        return;
      }
      this.navigateTo(
        "/pages/dt1520_label3/main?label_id_1=" +
          this.newroot().query.label_id_1 +
          "&label_id_2=" +
          this.selectId
      );
    },
    seleceLabel(id) {
      this.selectId = id;
      //==========日志监测begin
      var log = this.getLog();
      log.operation = "选择标签";
      log.remark = id;
      this.saveOperationLog(log);
      //==========日志监测end
    }
  },

  mounted() {
    this.selectId = null;
    //==========日志监测
    var log = this.getLog();
    this.saveOperationLog(log);
    //==========日志监测
  },
  onShow() {
    this.buttonBottom = this.getButtonBottom();
    if (this.isIphoneX()) {
      this.marginTop = "50px";
    }
  }
};
</script>


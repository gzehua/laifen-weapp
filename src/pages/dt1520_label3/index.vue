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
      style="position:fixed;width:12%;z-index:1;left:13%;top:25%;"
      mode="widthFix"
    >
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:12%;z-index:1;right:12%;top:50%;"
      mode="widthFix"
    >
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:16%;z-index:1;left:18%;bottom:8%;margin-top:-3%;"
      mode="widthFix"
    >
    <div style="position:absolute;width:100%;height:100%;">
      <img
        src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/3_title.png"
        style="width:100%;z-index:1;position :relative;"
        mode="widthFix"
      >
      <div style="width:100%;" :style="{'height':height}"></div>
      <template v-for="(item,index) in labels">
        <img
          :src="'https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/3_label'+(index+1)+'.png'"
          style="display:block;z-index:2;"
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
            style="width:15%;position: absolute;top: 45%;transform: translateY(-130%);right:23%;"
            mode="widthFix"
          >
        </div>
        <img
          src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/3_label_under.png"
          style="width:43%;display:block;margin-left:29%;"
          mode="widthFix"
        >
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectId: null,
      height: "0px",
      buttonBottom: "6.5%",
      labels: [
        { id: 10, width: "48%", marginLeft: "24%", marginTop: "3%" },
        { id: 11, width: "48%", marginLeft: "28%", marginTop: "-4%" },
        { id: 12, width: "48%", marginLeft: "24%", marginTop: "-4%" },
        { id: 13, width: "48%", marginLeft: "28%", marginTop: "-4%" }
      ]
    };
  },
  methods: {
    //==========日志监测begin
    getLog() {
      return { pageName: "第三个选择页", operation: "页面加载完成" };
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
      this.navigateTo(
        "/pages/dt1520_label4/main?label_id_1=" +
          this.newroot().query.label_id_1 +
          "&label_id_2=" +
          this.newroot().query.label_id_2 +
          "&label_id_3=" +
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
      this.height = "50px";
    }
  }
};
</script>


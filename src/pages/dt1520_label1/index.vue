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
    <!--=============================小水滴begin===============================================-->
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:12%;z-index:1;right:15%;top:12%;"
      mode="widthFix"
    >
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:8%;z-index:1;left:25%;top:45%;"
      mode="widthFix"
    >
    <img
      src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_shui_zhu.png"
      style="position:fixed;width:15%;z-index:1;left:75%;bottom:28%;"
      mode="widthFix"
    >
    <!--=============================小水滴end===============================================-->
    <div style="position:absolute;width:100%;height:100%;">
      <!--下面img为标题-->
      <img
        src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_title.png"
        style="width:100%;"
        mode="widthFix"
      >

      <div style="width:90%;margin-left:5%;">
        <div style="height:45px;width:100%;" :style="{'margin-top':marginTop}"></div>
        <div style="width:65%;text-align:left;float:left;margin-left:30%;position:relative;">
          <!--女性标题区img-->
          <img
            src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_gril.png"
            style="width:20%;;position: absolute;top: 50%;transform: translateY(-50%);left:-30%;"
            mode="widthFix"
          >
          <!--==============女性三个标签begin===============-->
          <template v-for="item in grils">
            <img
              :src="'https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_label'+item+'.png'"
              style="width:70%;display:block;"
              @click="seleceLabel(item)"
              mode="widthFix"
            >
            <div
              :style="item==selectId?{'display':'block'}:{'display':'none'}"
              style="position:relative;"
            >
              <img
                src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/select.png"
                style="width:10%;position: absolute;top: 50%;transform: translateY(-100%);transform: translateY(-150%);right:30%;"
                mode="widthFix"
              >
            </div>
            <img
              src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_label_under.png"
              style="width:70%;display:block;"
              mode="widthFix"
            >
          </template>
          <!--==============女性三个标签end===============-->
        </div>
        <div
          style="width:65%;text-align:left;float:left;margin-left:30%;position:relative;margin-top:25px;"
        >
          <!--男性标题区img-->
          <img
            src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_body.png"
            style="width:20%;;position: absolute;top: 50%;transform: translateY(-50%);left:-30%;"
            mode="widthFix"
          >
          <!--=========================男性三个标签begin==================================-->
          <template v-for="item in bodys">
            <img
              :src="'https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_label'+item+'.png'"
              @click="seleceLabel(item)"
              style="width:70%;display:block;"
              mode="widthFix"
            >
            <div
              :style="item==selectId?{'display':'block'}:{'display':'none'}"
              style="position:relative;"
            >
              <img
                src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/select.png"
                style="width:10%;position: absolute;top: 50%;transform: translateY(-100%);transform: translateY(-150%);right:30%;"
                mode="widthFix"
              >
            </div>
            <img
              src="https://alcon-star.oss-cn-beijing.aliyuncs.com/active/dt1520/1_label_under.png"
              style="width:70%;display:block;"
              mode="widthFix"
            >
          </template>
          <!--=========================男性三个标签end==================================-->
        </div>
      </div>
    </div>

    <!--
    <button @click="seleceLabel(1)">成熟知性</button>

    <button @click="seleceLabel(2)">温柔恬静</button>

    <button @click="seleceLabel(3)">活泼阳光</button>

    <button @click="seleceLabel(4)">风趣幽默</button>

    <button @click="seleceLabel(5)">羞涩内敛</button>

    <button @click="seleceLabel(6)">成熟稳重</button>
    -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      grils: [1, 2, 3],
      bodys: [4, 5, 6],
      marginTop: "0px",
      buttonBottom: "6.5%",
      selectId: null
    };
  },
  methods: {
    getLog() {
      return { pageName: "第一个选择页", operation: "页面加载完成" };
    },
    seleceLabel(id) {
      this.selectId = id;
      var log = this.getLog();
      log.operation = "选择标签";
      log.remark = id;
      this.saveOperationLog(log);
    },
    nextPage(e) {
      var log = this.getLog();
      log.operation = "下一步";
      this.saveOperationLog(log);
      this.saveFormId(e);
      if (this.isNull(this.selectId)) {
        this.alert("请选择一个标签");
        return;
      }
      this.navigateTo("/pages/dt1520_label2/main?label_id_1=" + this.selectId);
    }
  },
  mounted() {
    this.selectId = null;
    var log = this.getLog();
    this.saveOperationLog(log);
  },
  onShow() {
    this.buttonBottom = this.getButtonBottom();
    if (this.isIphoneX()) {
      this.marginTop = "50px";
    }
  }
};
</script>


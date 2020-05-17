<template>
  <div>
    <div>
      <button @click="alertButton">弹出框使用</button>
    </div>
    <div>
      <button @click="confirmButton">确认框使用</button>
    </div>
    <div>
      <button @click="loadButton">loading</button>
    </div>
    <div>
      <button @click="hideButton">取消loading</button>
    </div>
    <div>
      <button @click="postButton">post请求1:业务通用</button>
    </div>
    <div>
      <button @click="postButton2">post请求2:没有loading</button>
    </div>
    <div>
      <button @click="nextPageButton">跳转demo2/打开新页面</button>
    </div>
    <div>
      <button @click="nextPageButton2">跳转demo2/替换页面</button>
    </div>
    <div>
      <button @click="getLocation">获取位置</button>
    </div>
    <div>
      <button @click="paizhao">拍照</button>
    </div>

    <div>
      <button @click="renlian">人脸融合</button>
    </div>
    <img  :src="haibao" style="width:90%;height: 90%"/>


  </div>
</template>

<script>
export default {
  data() {
    return {
      param:{},
      filePath:"",
      fileBase:"",
      haibao:""
    };
  },
  methods: {
    paizhao(){
      let that = this;
      wx.chooseImage({
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: (res) => {
          that.filePath=res.tempFilePaths[0]
        }
      })
    },
    renlian(){
      let that = this;
      this.param.api_key= "buaf1BkzkRu6km4Fr3bstmApg9XXsNCs"
      this.param.api_secret="G5cJqRYYVwZfys-5cHxbBRWnoowOMdQU"
      this.param.template_url="http://salter.peyesight.cn/images/pengyuyan.png"
      this.param.merge_rate= "50"
      wx.uploadFile({
        filePath:that.filePath,
        name:"merge_file",
        url: "https://api-cn.faceplusplus.com/imagepp/v1/mergeface",
        formData:that.param,
        success: function (res) {
          const  data=JSON.parse(res.data);
          that.haibao="data:image/jpg/png;base64,"+data.result
        },
        fail: function (res) {
        },
        complete: function () {
        }
      });

    },

     getLocation() {
       const _this = this;
  wx.getLocation({
    type: "gcj02",
    success(res) {
      console.log(res.longitude, res.latitude);
    }
  });
},
    alertButton() {
      this.alert("弹出框", this.test1);
    },
    confirmButton() {
      //是否有取消后逻辑来判断调用哪个
      // this.confirm("是否确认删除",this.confirmSuccess);
      this.confirm("是否确认删除", this.confirmSuccess, this.confirmError);
    },
    confirmSuccess() {
      console.log("==================confirmSuccess");
    },
    confirmError() {
      console.log("==================confirmError");
    },
    loadButton() {
      this.showLoading();
    },
    hideButton() {
      this.hideLoading();
    },
    test1() {
      console.log("==================test1");
    },
    postButton() {
      this.post({
        url: "/system/auth_code/check_auth_code",
        data: { userPhone: "18201075336", authCode: "1234" }
      }).then(data => {
        console.log(data);
      });
    },
    postButton2() {
      this.post2({
        url: "/system/auth_code/check_auth_code",
        data: { userPhone: "18201075336", authCode: "1234" }
      }).then(data => {
        console.log(data);
      });
    },
    nextPageButton() {
      this.navigateTo("/pages/demo2/main?id=123");
    },
    nextPageButton2() {
      this.redirectTo("/pages/demo2/main?id=456");
    }
  },

  mounted() {
    console.log("==================mounted");
  }
};
</script>


<template>
  <div style="width: 100%;height: 100%;position: fixed;  background-color: #efefef;">


    <div style="width: 90%;padding-left: 10px;margin-top: 20px;">
      <textarea
        v-model="form.content"
        style="height: 300px;width:100%;border-radius: 5px;background-color: white ;font-size: 16px;padding: 10px;"
        placeholder="反馈意见可以获取十来粉币哦~,主播会努力做的更好，感谢支持" placeholder-style="font-size:14px;" auto-focus >
    </textarea>

    </div>

    <div style="width: 100%;text-align: -webkit-center;margin-top: 20px;">
      <div style="width: 90%">
        <van-button @click="submit" type="info" size="large">提交</van-button>

      </div>
    </div>



  </div>
</template>

<script>
  export default {
    data() {
      return {
       form:{
         content:""
       }
      };
    },
    methods: {
      submit(){
        if(this.isNull(this.form.content) ){
          this.alert("请填写反馈意见");
          return false;
        }
        this.form.userId=this.globalData.user.id
        this.post({
          url: "/salter/feedback/save",
          data: this.form
        }).then(res => {
          this.form.content="";
          if(res.success){
            this.alert("感谢您的反馈意见，10来粉币已到您的账户，主播会更加努力的~");
          }else{
            this.alert(res.msg);
          }
        });


      }

    },

    mounted() {

    }
  };
</script>


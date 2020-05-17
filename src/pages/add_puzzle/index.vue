<template>
  <div>


    <van-radio-group   :value="form.answer" @change="answerChange">
    <van-field
      required
      placeholder="填写问题"
      label="问题"
      @change="nameChange"
      :value="form.question"
      border="false "
    />
    <van-field
      required
      placeholder="填写答案选项"
      label="选项1"
      @change="answer1Change"
      :value="form.answer1"
      border="false "
    >  <van-radio slot="button" name="0"></van-radio></van-field>

    <van-field
      required
      placeholder="填写答案选项"
      label="选项2"
      @change="answer2Change"
      :value="form.answer2"
      border="false "
    > <van-radio slot="button" name="1"></van-radio></van-field>
    <van-field
      required
      placeholder="填写答案选项"
      label="选项3"
      @change="answer3Change"
      :value="form.answer3"
      border="false "
    ><van-radio slot="button" name="2"></van-radio></van-field>
    <van-field
      required
      placeholder="填写答案选项"
      label="选项4"
      @change="answer4Change"
      :value="form.answer4"
      border="false "
    ><van-radio slot="button" name="3"></van-radio></van-field>

    </van-radio-group>

    <div style="width: 100%;text-align: -webkit-center;">
      <div style="width: 90%;">
        <van-button   type="info" size="large" @click="submitPuzzle">提交</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        radio:"",
        form:{answer:""}
      };
    },
    methods: {
      submitPuzzle(){
        this.post({
          url: "/salter/puzzle/save",
          data: this.form
        }).then(res => {
          if(res.success){
            this.alert("添加成功");
            this.form={answer:""};
          }else {
            this.alert(res.msg);
          }
        });
      },
      answerChange(event) {
        this.form.answer=event.mp.detail
      },
      nameChange(e){
        this.form.question=e.mp.detail
      }, answer1Change(e){
        this.form.answer1=e.mp.detail
      },answer2Change(e){
        this.form.answer2=e.mp.detail
      },answer3Change(e){
        this.form.answer3=e.mp.detail
      },answer4Change(e){
        this.form.answer4=e.mp.detail
      },

    },

    mounted() {

    }
  };
</script>


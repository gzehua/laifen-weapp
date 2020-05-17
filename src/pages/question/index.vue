<template>
  <div>
    <van-collapse :value="activeName" @change="onChange" accordion>
      <van-collapse-item v-for="(item,index) in questionList" :title="index+1+'.'+item.title" :name="item.id">
        <rich-text class='text_plain' :nodes="item.content"></rich-text>
      </van-collapse-item>
    </van-collapse>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        questionList:[],
        activeName:""
      };
    },
    methods: {
      onChange(e){
        this.activeName=e.mp.detail
      }

    },
    mounted() {
      this.post({
        url: "/salter/question/search",
        data: { activeId:this.globalData.active.id }
      }).then(res => {
          this.questionList=res.data
      });
    }
  };
</script>


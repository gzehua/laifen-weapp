<template>
  <div>
    <rich-text class='text_plain' :nodes="strategy.content"></rich-text>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        strategy:{}
      };
    },
    methods: {},

    mounted() {
      this.post({
        url: "/salter/strategy/search",
        data: {}
      }).then(res => {
        if(res.success){
          this.strategy=res.data
        }else{
          this.alert(res.msg)
        }
      });
    }
  };
</script>


<template>
  <div>第二个demo页面</div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {},

    mounted() {
      console.log("==================demo2");
      console.log(this.newroot().query.id);
    }
  };
</script>


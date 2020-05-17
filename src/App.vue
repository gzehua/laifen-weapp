<script>
export default {
  created() {},
  onShow(options){
    console.log(options)
    if(options.scene=="1038"||options.scene=="1001"||options.scene=="1089"){
      console.log(options)
      this.post({
        url: "/salter/ad/monitorAdBanner",
        data: { path:options.path,userId:this.globalData.user.id,activeId:this.globalData.active.id }
      }).then(res => {
      });
    }
    if(!this.isNull(options.scene)){
      this.globalData.scene=options.scene
      this.globalData.path=options.path
    }

  }


};
</script>


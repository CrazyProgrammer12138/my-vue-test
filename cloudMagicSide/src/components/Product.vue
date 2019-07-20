<template>
  <div>
    <MHeader>产品</MHeader>
    <div class="content">
      {{msg}}
    </div>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue';
  export default {
    name: "Product",
    data(){
      return{
        msg: '产品页'
      }
    },
    components:{
      MHeader
    }

  }
</script>

<style scoped>

</style>

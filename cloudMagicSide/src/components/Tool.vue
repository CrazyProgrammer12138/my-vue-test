<template>
  <div>
    <MHeader>工具</MHeader>
    <div class="content">
      {{msg}}
    </div>
  </div>
</template>

<script>
import MHeader from '../base/MHeader.vue';
export default {
  name: "Tool",
  data(){
    return{
      msg:'工具页'
    }
  },
  components:{
    MHeader
  }

}
</script>

<style scoped>

</style>

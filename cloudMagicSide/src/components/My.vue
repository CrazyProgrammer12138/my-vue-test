<template>
  <div>
    <MHeader>我的</MHeader>
    <div class="content">
      {{msg}}
    </div>
  </div>
</template>

<script>
import MHeader from '../base/MHeader.vue';
export default {
  name: "My",
  data(){
    return{
      msg:'我的页'
    }
  },
  components:{
    MHeader
  }
}
</script>

<style scoped>

</style>

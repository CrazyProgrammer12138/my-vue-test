<template>
  <div>
    <MHeader>首页</MHeader>
    <div class="content">
      {{msg}}
    </div>
  </div>
</template>

<script>
import MHeader from '../base/MHeader.vue';
import Swiper from '../base/Swiper.vue';
import Loading from '../base/Loading.vue';
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Home'
    }
  },
  components:{
    MHeader,
    Swiper,
    Loading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

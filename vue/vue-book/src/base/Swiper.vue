<template>
  <swiper :options="swiperOption">
    <!--:swiperSlides="sliders": 上个组件传入的数据可以用属性props接收，但是props和data里面swiperSlides不能同事存在，
     props里接收的数据是：后面的数据
    -->
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <img :src="slide" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carousel',
    props:['swiperSlides'],
    data() {
      return {
        swiperOption: {
          speed:2000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    }
  }
</script>
<style scoped>
  img{
    width: 100%;
  }
</style>

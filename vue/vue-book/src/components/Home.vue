<template>
  <div>
    <!-- 组件传参 -->
    <!--通过back确认返回按钮存在不存在，组件传参把值给back-->
    <!--<MHeader :back="true">首页</MHeader>-->
    <!--:swiperSlides="sliders": 可以作为组件的接收数据,props接收的是swiperSlides-->
    <MHeader>首页</MHeader>
    <div class="content">
      <Loading v-if="loading"></Loading>
      <template v-else>
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="(item, index) in hotBooks" :key="index">
              <img :src="item.bookCover" alt="">
              <b>{{item.bookName}}</b>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue';
  import Swiper from '../base/Swiper.vue';
  import Loading from '../base/Loading.vue';
  import { getAll } from '../api/index.js';
  //loading 设置成基础组件
  export default {
    name: "Home",
    // 不要created里写太多逻辑
    created(){
      // this.getSlider(); // 获取轮播图
      // this.getHot();// 获取最新图书
      this.getData();
    },
    data(){
      return {
        sliders: [],
        hotBooks: [],
        loading: true
      }
    },
    methods:{
      // async getSlider(){
      //   // 语法糖, data：别名, async和 await是一起用的
      //   // 给data起别名 对象中的属性名字必须和 得到的结构名字一致
      //   // let {data:sliders} = await getSliders();
      //   // this.sliders = sliders;
      //   this.sliders  = await getSliders();
      // },
      // async getHot(){
      //   this.hotBooks = await getHotBook();
      // }
      async getData(){
        let [sliders, hotBooks] = await getAll();
        this.sliders = sliders;
        this.hotBooks = hotBooks;
        // ..... 轮播图和热门图书获取完成
        this.loading = false;
      }
    },
    components:{
      MHeader,
      Swiper,
      Loading
    }

  }
</script>

<style scoped lang="less">
  .container{
    width: 90%;
    margin: 0 auto;
    ul{
      display: flex;
      flex-wrap: wrap;//默认换行
      padding-bottom: 10px;
      li{
        width: 50%;
        text-align: center;
        margin: 5px 0;
        img{
          width: 100%;
        }
      }
    }
  }
</style>

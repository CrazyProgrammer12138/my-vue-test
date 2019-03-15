<template>
  <div class="detail">
    <!--接收路径传参
      方法1：$route.params.bid: $route：表示属性
      方法2(推荐使用)：计算属性 computed
    -->
    <MHeader :back="true">详情</MHeader>
    <ul>
      <li>
        <label for="bookName">书的名称: </label>
        <input type="text" v-model="book.bookName" id="bookName">
      </li>
      <li>
        <label for="bookInfo">书的信息: </label>
        <input type="text" v-model="book.bookInfo" id="bookInfo">
      </li>
      <li>
        <label for="bookPrice">书的价格: </label>
        <input type="text" v-model="book.bookPrice" id="bookPrice">
      </li>
      <li>
        <button @click="update">确认修改</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue'
  import {findBook, updateBook} from "../api/index.js";
  export default {
    name: "Detail",
    watch:{
      // 是要路径变化重新获取数据
      // 监听$route
      $route(){
        this.getData();
      }
    },
    created(){
      this.getData();
    },
    data(){
      return {book: {}}
    },
    methods:{
      async update(){ // 点击修改图书信息
        await updateBook(this.bid, this.book);
        // 修改完成之后回到列表页
        console.log(1)
        this.$router.push('/list');
      },
      async getData(){
        this.book = await findBook(this.bid);
        // 如果时空对象 需要跳转回列表页
        // 判断空对象
        // Object.keys():把对象转换成数组
        Object.keys(this.book).length>0?void 0:this.$router.push('/list');
      }
    },
    computed:{
      bid:function () {
        return this.$route.params.bid;
      }
    },
    components:{MHeader}
  }
</script>

<style scoped >
  /*问题：跳转到详情时，底部导航栏不消失
    解决：让二级路由覆盖一级路由,使用position：absolute;top\bottom\left\right:0,让整个页面撑开
  */
  .detail{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
    background-color: #ffffff;
  }
  .detail ul{
    padding: 0 10px;
    margin-top: 50px;
  }
</style>

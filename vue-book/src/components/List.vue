<template>
  <div>
    <MHeader>列表页</MHeader>
    <div class="content">
      <ul>
        <!--跳转的需要使用router-link：但是router-link是 a 标签，想要的是li， 所以加一个属性 tag='li'
          to: 去到另一个组件，接收值 :to
          params: 路径参数 是一个对象 传出的值
        -->
        <router-link v-for="(item, index) in books" :key="index" :to="{name:'detail', params:{bid: item.bookId}}" tag="li">
          <img :src="item.bookCover" alt="">
          <div>
            <h4>{{item.bookName}}</h4>
            <p>{{item.bookInfo}}</p>
            <b>{{item.bookPrice}}</b>
            <!--问题：点击跳转，但是点击删除也会触发，事件冒泡
                解决：@click.stop
            -->
            <button @click.stop="remove(item.bookId)">删除</button>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue'
  import { getBooks, removeBook } from '../api/index.js'
  export default {
    name: "List",
    created(){
      this.getData();
    },
    data(){
      return{
        books:[]
      }
    },
    methods:{
      async remove(id){
        await removeBook(id);
        // 要删除前台数据使用filter过滤
        //filter必须有变量接收
        this.books = this.books.filter(item=>item.bookId !== id);

      },
      async getData(){
        this.books = await getBooks();
      }
    },
    components:{MHeader}
  }
</script>

<style scoped lang="less">
  .content{
    ul{
      padding: 10px 0;
      li{
        display: flex;
        margin-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;
        img{
          width: 130px;
          height: 150px;
        }
        div{
          h4{
            line-height: 35px;
          }
          p{
            color: #2a2a2a;
            line-height: 25px;
          }
          b{
            color: orangered;
          }
          button{
            display: block;
            width: 60px;
            height: 25px;
            background: coral;
            color: #fff;
            border: none;
            border-radius: 15px;
            margin-top: 10px;
            outline: none;
          }
        }
      }
    }
  }
</style>

<template>
  <div>
    <MHeader>列表页</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore()">
      <ul>
        <!--跳转的需要使用router-link：但是router-link是 a 标签，想要的是li， 所以加一个属性 tag='li'
          to: 去到另一个组件，接收值 :to
          params: 路径参数 是一个对象 传出的值
        -->
        <router-link v-for="(item, index) in books" :key="index" :to="{name:'detail', params:{bid: item.bookId}}" tag="li">
          <img v-lazy="item.bookCover" alt="">
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
      <div class="more" @click="more()" v-show="hasMore">加载更多</div>
    </div>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue'
  // import { getBooks, removeBook } from '../api/index.js'
  // 加载更多接口
  import { pagination, removeBook } from '../api/index.js'
  export default {
    name: "List",
    created(){
      this.getData();
    },
    data(){
      // offset代表的是偏移量 hasMore 是否有更多 默认不是正在加载
      return{
        books:[],
        hasMore: true,
        offset: 0,
        isLoading: false
      }
    },
    methods:{
      loadMore(){
        // vm.$refs持有注册过 ref 特性的所有 DOM 元素和组件的实例
        // let scrollTop = this.$refs.scroll.scrollTop; 卷曲高度
        // let clientHeight: 当前可见区域
        // let scrollHeight：总高

        // 截流 防抖
        // 进来时触发scroll事件 可能触发 N 此 先进来开一个定时器 下次触发时将上一次定时器清除掉
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          // 另一种写法： 结构赋值 this.$refs.scroll的属性
          let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
          console.log(1000);
          // 下拉加载
          if(scrollTop + clientHeight + 10 > scrollHeight){
            this.getData();
          }
        },50)

      },
      more(){
        this.getData();
      },
      async remove(id){
        await removeBook(id);
        // 要删除前台数据使用filter过滤
        // filter必须有变量接收
        this.books = this.books.filter(item=>item.bookId !== id);
      },
      async getData(){
        if (this.hasMore && !this.isLoading) {
          this.isLoading = true;
          let {hasMore, books} = await pagination(this.offset);
          this.books = [...this.books, ...books];
          this.hasMore = hasMore;
          this.offset = this.books.length;
          this.isLoading = false;
        }
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
            padding-right: 15px;
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
    .more{
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background-color: lightgray;
      padding: 5px 0;
    }
  }
</style>

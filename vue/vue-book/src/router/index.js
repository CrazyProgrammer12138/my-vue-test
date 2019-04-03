import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../components/Home.vue';
// import Collect from '../components/Collect.vue';
// import Add from '../components/Add.vue';
// import Detail from '../components/Detail.vue';
// import List from '../components/List.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {path:'/', redirect: '/home'},
    // meta:{keepAlive: true}: 是否缓存页面
    // 获取方式：this.$route.meta.keepAlive
    {
      path:'/home',
      component: ()=>import('../components/Home.vue'),
      meta:{
        keepAlive: true,
        title: '首页'
      }
    },
    {
      path:'/collect',
      // 动态组件, 路径加载到这的时候调这个函数,这个函数去动态载入一个组件, 相当于异步的, 因为这样写是高级语法需要安装syntax-dynamic-import,但是我们使用的是webpack,所以不需要
      component: ()=>import('../components/Collect.vue'),
      meta: {
        title: '收藏'
      }
    },
    {
      path:'/add',
      component: ()=>import('../components/Add.vue'),
      meta: {
        title: '添加'
      }
    },
    // /detail/1 接收：{bid:1} 路径参数 特点: 必须有但是可以随机
    {
      path:'/detail/:bid',
      component: ()=>import('../components/Detail.vue'),
      name: 'detail',
      meta: {
        title: '详情'
      }
    },
    {
      path:'/list',
      component: ()=>import('../components/List.vue'),
      meta: {
        title: '列表'
      }
    },
    {
      path:'*',
      redirect: '/home'
    }
  ]
})

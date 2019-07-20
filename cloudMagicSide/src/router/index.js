import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import Product from '@/components/Product'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path:'/', redirect: '/home'},
    {
      path:'/home',
      component: ()=>import('../components/Home.vue'),
      meta:{
        keepAlive: true,
        title: '首页'
      }
    },
    {
      path:'/product',
      component: ()=>import('../components/Product.vue'),
      meta:{
        keepAlive: true,
        title: '产品'
      }
    },
    {
      path:'/tool',
      component: ()=>import('../components/Tool.vue'),
      meta:{
        keepAlive: true,
        title: '工具'
      }
    },
    {
      path:'/my',
      component: ()=>import('../components/My.vue'),
      meta:{
        keepAlive: true,
        title: '我的'
      }
    },
    {
      path:'*',
      redirect: '/home'
    }
  ]
})

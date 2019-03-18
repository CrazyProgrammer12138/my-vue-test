import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Collect from '../components/Collect.vue';
import Add from '../components/Add.vue';
import Detail from '../components/Detail.vue';
import List from '../components/List.vue';

Vue.use(Router);



export default new Router({
  routes: [
    {path:'/', redirect: '/home'},
    // meta:{keepAlive: true}: 是否缓存页面
    // 获取方式：this.$route.meta.keepAlive
    {path:'/home', component: Home, meta:{keepAlive: true}},
    {path:'/collect', component: Collect},
    {path:'/add', component: Add},
    // /detail/1 接收：{bid:1} 路径参数 特点: 必须有但是可以随机
    {path:'/detail/:bid', component: Detail, name: 'detail'},
    {path:'/list', component: List},
    {path:'*', redirect: '/home'}
  ]
})

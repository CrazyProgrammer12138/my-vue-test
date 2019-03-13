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
    {path:'/home', component: Home},
    {path:'/collect', component: Collect},
    {path:'/add', component: Add},
    {path:'/detail', component: Detail},
    {path:'/list', component: List},
    {path:'*', redirect: '/home'}
  ]
})

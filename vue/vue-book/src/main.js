// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;
//Swiper轮播插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);
// 图片兰夹杂
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: 'http://hbimg.b0.upaiyun.com/1e3ead27ad747c7c92e659ac5774587a680bb8d25252-mRVFlu_fw658',
  loading: 'http://help.leadsquared.com/wp-content/themes/help/img/Spinner_t.gif',
  attempt: 1
})
// 对title进行设置,在进入路由之前 每一次都会执行此方法,全局钩子,拦截功能(用于判断权限) next: 继续执行下去 to:从上一层
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title;
  next();
  // 权限的验证: 如果权限不够进入到 next({path:'对应的地址'}) 拦截功能
  // if (to.path === '/list') {
  //   next({path:'/add'});
  // } else {
  //   next();
  // }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

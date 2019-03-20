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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

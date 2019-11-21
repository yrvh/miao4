import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入路由库
import axios from 'axios'
Vue.prototype.axios = axios;

// 创建全局过滤器
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

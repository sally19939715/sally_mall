// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'

Vue.use(Vuex)
Vue.use(infiniteScroll)
Vue.config.productionTip = false
Vue.use(VueLazyload,{
  loading:"/static/loading-svg/loading-balls.svg"
});
Vue.filter('currency',currency)
/* eslint-disable no-new */

const store = new Vuex.Store({
  state:{
    nickName:'',
    cartCount:0
  },
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName = nickName
    },
    updateCartCount(state,cartCount){
      if(cartCount != ''){
        state.cartCount += cartCount;
      }else{
        // cartCount = 0;
        state.cartCount = 0;
      }
    },
    initCartCount(state,cartCount){
      state.cartCount = cartCount;
    }
  }
});
new Vue({
  el: '#app',
  router,
  store,
  render:function(h){
    return h(App);
  }
  // render:h=>h(App)
  // template: '<App/>',
  // components: { App }
})

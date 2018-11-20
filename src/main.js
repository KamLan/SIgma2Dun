import Vue from 'vue'
import App from './App.vue'
//import VueCordova from 'vue-cordova'
import router from './router'
import { store } from './store'
import barcoder from 'barcoder'
import zebra from './../src/scripts/zebra.js'
import Notifications from 'vue-notification'
import './../node_modules/jquery/dist/jquery.min.js';     
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';

Vue.config.productionTip = false

//Vue.use(VueCordova)
Vue.use(Notifications)

new Vue({
  Notifications,
  zebra,
  barcoder,
  router,
  store,
  render: h => h(App),
}).$mount('#app')

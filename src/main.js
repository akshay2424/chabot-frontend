/*!

=========================================================
* Vue Argon Dashboard - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import axios from 'axios';


Vue.config.productionTip = false
// axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


axios.defaults.baseURL = 'http://127.0.0.1:5000/';
// var cors = require('cors')

// app.use(cors())

Vue.use(ArgonDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

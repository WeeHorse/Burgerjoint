import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Vue.config.backendUrl = 'http://localhost/WCM18M/a-simple-php-mysql-backend/routes/';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

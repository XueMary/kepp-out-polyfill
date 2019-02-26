import Vue from 'vue'
import App from './App.vue'

import './keep-out-polyfill'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

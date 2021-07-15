import Vue from 'vue'
import ErrorToastPlugin from './plugins/errortoast/errortoast'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ErrorToastPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')

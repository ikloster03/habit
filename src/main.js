import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');

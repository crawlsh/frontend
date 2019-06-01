// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import Vuex from 'vuex'
Vue.use(Vuex);
import router from './router'

Vue.config.productionTip = false;
import VueI18n from 'vue-i18n'

Vue.use(VueI18n) // 通过插件的形式挂载
const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/en'),   // 中文语言包
  }
})

Vue.use(ElementUI);
import VueSwal from 'vue-swal'

Vue.use(VueSwal)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

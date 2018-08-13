// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.config.productionTip = false;

// 增加监控
var fundebug = require("fundebug-javascript");
fundebug.apikey = "ff02f13a621cf2b1f1efc4f330be0b80347887a7e20cff2539f73d84ffa4abe9";

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}

Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm);
  var propsData = vm.$options && vm.$options.propsData;

  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  });
};

import List from '@/components/list/list.vue'
import TextBirthdayCard1 from '@/components/textbirthdaycard1/textbirthdaycard1.vue'
import TextBirthdayCard2 from '@/components/textbirthdaycard2/textbirthdaycard2.vue'

const NotFound = { template: '<p>Page not found</p>' }
const routes = {
  '/list': List,
  '/textbirthdaycard1': TextBirthdayCard1,
  '/textbirthdaycard2': TextBirthdayCard2
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  beforeCreate: function () {
    let path = window.location.pathname;
    this.$http.get('https://h5.goodiber.com/test/url', {path: path}).then(function(res){
      res.body.data.url = '/textbirthdaycard2';
      this.$router.addRoutes([{
        path: path,
        component: routes[res.body.data.url] || NotFound,
        name: 'dynamic'
      }]);
      // 响应成功回调
  }, function(res){
      // 响应错误回调
  });
  }
  // el: '#app',
  // router,
  // components: {
  //   App
  // },
  // template: '<App/>',
  // data: {
  //   currentRoute: window.location.pathname
  // },
  // computed: {
  //   ViewComponent () {
  //     return routes[this.currentRoute] || TextBirthdayCard1
  //   }
  // },
  // render (h) { return h(this.ViewComponent) }
})

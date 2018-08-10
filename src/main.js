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

Vue.config.errorHandler = function(err, vm, info)
{
  var componentName = formatComponentName(vm);
  var propsData = vm.$options && vm.$options.propsData;

  fundebug.notifyError(err,
  {
      metaData:
      {
          componentName: componentName,
          propsData: propsData,
          info: info
      }
   });
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

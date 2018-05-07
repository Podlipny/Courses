// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './reduxState';

Vue.config.productionTip = false

// default state
var reduxState = {
  fields: store.getState().fields
};

var unsub = store.subscribe(function() {
  var state = store.getState();

  // bindings
  reduxState.fields = state.fields;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  data: reduxState
})

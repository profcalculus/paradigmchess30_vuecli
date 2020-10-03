import Vue from 'vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import router from './routes.js';
import {store} from './store/store.js';
// import socketio from 'socket.io';
// import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
// import {Globals} from './globals.js';
// export const SocketInstance = socketio (Globals.SERVER_URL);

// Vue.use (VueRouter);
Vue.use (BootstrapVue);
Vue.use (IconsPlugin);
// Vue.use (VueSocketIO, SocketInstance);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
new Vue ({
  el: '#app',
  router,
  store,
  render: h => h (App),
});

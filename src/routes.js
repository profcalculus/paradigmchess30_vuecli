import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './views/Login.vue';
import Lobby from './views/Lobby.vue';
import GameRoom from './views/GameRoom.vue';
import Debug from './views/Debug.vue';

Vue.use (VueRouter);

export default new VueRouter ({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby,
    },
    {
      path: '/gameroom',
      name: 'gameroom',
      component: GameRoom,
    },
    {
      path: '/debug',
      name: 'debug',
      component: Debug,
    },
  ],
});

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use (Vuex);

export const store = new Vuex.Store ({
  state: {
    user: 'fred',
    user_states: {}, //UserState objects, keyed by username
    game_states: {}, //GameState objects, keyed by game_id
  },
  getters: {
    // Redundant, but may be relevant later
    user: state => {
      return state.user;
    },
    user_states: state => {
      return state.user_states;
    },
    game_states: state => {
      return state.game_states;
    },
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user;
      window.localStorage.user = JSON.stringify (user);
    },
    SET_USER_STATES (state, user_states) {
      state.user_states = user_states;
    },
    SET_GAME_STATES (state, game_states) {
      state.game_states = game_states;
    },
    LOGOUT_USER (state, user) {
      state.user = '';
      window.localStorage.user = JSON.stringify ({});
    },
  },
  // actions: {
  //   async loadUserStates({commit}) {
  //     // async: get user states
  //     let response = await Api ().get ('user_states');
  //     let user_states = response.data.data;
  //     commit ('SET_USER_STATES', user_states.map (u => u.attributes));
  //   },
  // },
});

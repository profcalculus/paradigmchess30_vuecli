<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <app-header :user="user"></app-header>
    </div>
    <div class="row">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
// import EventBus from "./event-bus.js";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
  data: function () {
    return {
      authenticated: false,
      mockAccount: {
        username: "fred",
        password: "fred",
      },
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    },
  },
  computed: {
    user: function () {
      return this.$store.state.user;
    },
  },
};
</script>

<style >
body {
  background-color: #f0f0f0;
}
h1 {
  padding: 0;
  margin-top: 0;
}
#app {
  width: 1024px;
  margin: auto;
}
</style>

<template>
  <div>
    <b-navbar variant="faded" toggleable="lg" type="light">
      <b-navbar-brand to="lobby">Paradigm Chess30</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="logged_in">
            <router-link to="lobby">Lobby</router-link>
          </b-nav-item>
          <b-nav-item v-if="logged_in">
            <router-link to="/gameroom">Game Room</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="logged_in">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{user}}</em>
            </template>
            <!--b-dropdown-item href="#">Profile</b-dropdown-item-->
            <b-dropdown-item @click="signOut()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav>
        <span v-if="isConnected">Connected to the server!</span>
        <span v-if="!isConnected">NOT Connected :(</span>
        <span v-if="socketMessage">Message from server: "{{socketMessage}}"</span>
        <button v-if="isConnected" @click="pingServer()">Ping Server</button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConnected: false,
      socketMessage: "",
    };
  },
  computed: {
    logged_in: function () {
      return this.$store.state.user !== "";
    },
    user: function () {
      return this.$store.state.user;
    },
  },
  methods: {
    signOut() {
      this.$store.state.user = "";
      this.$router.replace("/login");
    },
    pingServer() {
      this.$socket.enit("pingServer", "PING!");
    },
  },
  sockets: {
    connect() {
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    messageChannel(data) {
      this.socketMessage = data;
    },
  },
};
</script>
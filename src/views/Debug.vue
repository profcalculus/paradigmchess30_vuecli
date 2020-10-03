<template>
  <div id="debug">
    <h1>Debug</h1>
    <div>
    <h2>Vuex</h2>
    <p>User {{user}}</p>
    <ul>
      <li v-for="u in users" :key="u.id">{{u}}</li>
    </ul>
    <ul>
      <li v-for="g in games" :key="g.id">{{g}}</li>
    </ul>
    </div>
    <div>
      <h2>EventBus</h2>
      <ul>
        <li v-for="event in events" :key="event.timestamp"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Debug",
  computed: {
    ...mapGetters(["user", "users", "games"]),
  },
};
</script>

<style scoped>
#debug {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}
</style>
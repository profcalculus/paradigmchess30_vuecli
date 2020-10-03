
 <template>
  <div class="col-2 align-self-center" id="clock">
    <!--start clock container-->
    <b-container-fluid mx-1 d.block>
      <b-row class="clock">
        <b-col>
          <b-row>
            <label
              class="clocktime p-0 ml-4 mr-0"
              :class="timeClass('black')"
            >{{black.maintime|time_display}}</label>
            <b-icon v-if="this.runstate==='black'" class="h2 my-4" icon="gear" animation="spin"></b-icon>
            <b-icon v-if="black.maintime===0" class="h2 my-4 text-danger" icon="flag-fill"></b-icon>
            <b-col col-1>
              <b-row class="justify-content-center">
                <b-button-group class="clock-button-bar">
                  <b-button
                    class="m-1 rounded"
                    variant="danger"
                    title="Pause"
                    @click="pause"
                    v-if="this.runstate!=='pause'"
                  >
                    <b-icon icon="pause-fill"></b-icon>
                  </b-button>
                  <b-button
                    class="m-1 rounded"
                    variant="success"
                    title="Play"
                    @click="start(this.toplay)"
                    v-if="this.runstate==='pause'"
                    :disabled="this[this.toplay].maintime <= 0"
                  >
                    <b-icon icon="play-fill"></b-icon>
                  </b-button>
                  <b-button
                    class="m-1 rounded-pill"
                    variant="warning"
                    title="Reset Clock"
                    @click="reset"
                    :disabled="this.runstate !== 'pause'"
                  >
                    <b-icon icon="arrow-counterclockwise"></b-icon>
                  </b-button>
                  <b-button
                    class="m-1 pill"
                    @click="newGame"
                    variant="danger"
                    title="New game"
                    :disabled="this.runstate !== 'pause'"
                  >
                    <b-icon icon="shuffle"></b-icon>
                  </b-button>
                  <b-button
                    class="m-1 rounded-pill"
                    v-b-modal.clock-settings
                    variant="primary"
                    title="Settings"
                    :disabled="this.runstate !== 'pause'"
                    v-b-popover.hover.topright="clock_settings_popover"
                  >
                    <b-icon icon="tools"></b-icon>
                  </b-button>
                </b-button-group>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <label
              class="clocktime p-0 ml-4 mr-0"
              :class="timeClass('white')"
            >{{white.maintime|time_display}}</label>
            <b-icon v-if="this.runstate==='white'" class="h2 my-4" icon="gear" animation="spin"></b-icon>
            <b-icon v-if="white.maintime===0" class="h2 my-4 text-danger" icon="flag-fill"></b-icon>
          </b-row>
        </b-col>
      </b-row>
    </b-container-fluid>
    <ClockSettings></ClockSettings>
  </div>
</template>

<script>
import { Clock } from "../clock.js";
import ClockSettings from "./ClockSettings.vue";
export default {
  name: "Clock",
  mounted() {
    this.clock = new Clock(this.game_config);
  },
  data: function () {
    return {
      clock: "waiting",
    };
  },
  props: ["game_config"],
  computed: {
    timeClass: function (player) {
      if (this.clock.white.maintime === 0 || this.clock.black.maintime === 0) {
        return "text-secondary";
      }
      return this.clock[player].maintime > 10 ? "text-dark" : "text-danger";
    },
  },

  filters: {
    time_display: function (sec) {
      const split_time = function (sec) {
        let hours = Math.trunc(sec / 3600);
        let mins = Math.trunc((sec - 3600 * hours) / 60);
        let secs = Math.trunc(sec - 3600 * hours - 60 * mins);
        return [hours, mins, secs];
      };
      let [hours, mins, secs] = split_time(parseInt(sec));
      let str = "";
      if (hours > 0) {
        str += hours + ":";
      }
      str += ("00" + mins).slice(-2) + ".";
      str += ("00" + secs).slice(-2);
      return str;
    },
  },
  components: {
    ClockSettings,
  },
  methods: {
    capitalise: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>


<style scoped>
#clock {
  min-height: 200px;
  min-width: 200px;
  display: block;
  position: absolute;
  top: 20vh;
  left: 20vw;
  background-color: green;
}
</style>
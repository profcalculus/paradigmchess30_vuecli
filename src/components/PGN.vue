<template>
  <div class="container pgn" id="pgn">
    <div class="row header">{{header}}</div>
    <ul class="row moves">
      <li v-for="(ply, index) in plies" :key="index">{{ply.text}}</li>
    </ul>

    <b-btn @click="download"></b-btn>
  </div>
</template>

<script>
import { moment } from "moment";

export default {
  props: {
    white: String,
    black: String,
    startFEN: {
      type: String,
    },
  },
  data: function () {
    return {
      moves: [],
    };
  },
  computed: {
    plies() {
      // Moves so far, in PGN format
      let plies = [];
      let len = length(this.moves);
      let m = 0;
      while (m < len - 1) {
        let ply = `${Math.floor(m / 2 + 1)}. ${this.moves[m]} ${
          this.moves[m + 1]
        } `;
        plies.push(ply);
        m += 2;
      }
      if (m - 1 === len) {
        // half ply (White's move only)
        let ply = `${Math.floor(m / 2)}. ${this.moves[m - 2]} `;
        plies.push(ply);
      }
      return plies;
    },
    header() {
      let tag = function (tagname, tagvalue) {
        return `["${tagname}"] ["${tagvalue}"]`;
      };
      return `${tag("Site", "ParadigmChess30")} ${tag(
        "Date",
        moment().format("YYYY-MM-DD")
      )} ${tag("White", this.white)} ${tag("Black", this.black)} ${tag(
        "Setup",
        "1"
      )} ${tag("StartPos", this.startFEN)}`;
    },
  },
  methods: {
    add_move: function (move) {
      this.moves.append(move);
    },
    clear: function () {
      this.moves.empty();
    },
  },
};
</script>
  <style scoped>
.pgn {
  border: groove 8px brown;
  background-color: lightgray;
}
.header {
  color: green;
  font-size: small;
}
.moves {
  color: black;
}
</style>

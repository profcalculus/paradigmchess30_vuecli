<template>
  <div>
    <div :id="id" :class="size"></div>
  </div>
</template>

<script>
import $ from "jquery";
require("../chessboard.css");
window.$ = $;
import Chessboard from "chessboardjs";
export default {
  name: "Board",
  data: function () {
    return {
      board: "waiting",
    };
  },
  props: {
    id: String,
    size: String,
    orientation: {
      type: String,
      default: "white",
    },
  },
  mounted() {
    let config = {
      pieceTheme: "./src/assets/img/chesspieces/paradigm30/{piece}.png",
      position: "start",
      orientation: this.orientation,
    };
    let board = Chessboard(this.id, config);
  },

  methods: {},
};
</script>

<style scoped >
.large {
  width: 60vw;
}
.medium {
  width: 40vw;
}
.small {
  width: 30vw;
}
.tiny {
  width: 20vw;
}
</style>

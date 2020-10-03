<template>
<div>
  <!-- <div class="row">
  <label>{{playerLabel('top')}}</label>
  </div> -->
  <div id="board" style="width:40vw"/>
  <!-- This button for testing only -->
  <!-- <button
      type="button"
      class="btn btn-sm btn-success mx-auto my-auto"
      @click="load('nnbbq')"
    >Load P30</button>
    <b-button
      class="btn btn-sm btn-info"
      id="show-btn"
      @click="$bvModal.show('promotion_dialog')"
  >Promote</b-button>-->
  <!--promotion-dialog ref="PromotionDialog" :imagePath="imagePath" :turn="turn()"></promotion-dialog-->
  <!-- <div id="board" class="container" style="width:40vw;height:50vh;background-color:blue"></div>
  <!-- <div :class="board_config.size" class="row mx-auto my-auto"></div>
  <!-- <div class="row">-->
  <!-- <label>{{playerLabel('bottom')}}</label>
  </div-->
  </div>
</template>

<script>
import "../chessboard.css";

import { P30Board } from "./p30_board.js";
import PromotionDialog from "./PromotionDialog.vue";

export default {
  name: "Board",
  data: function () {
    return {
      board: "waiting",
      imagePath: "waiting",
      orientation: "white",
      board_id: `board_${this.game_config.game_id}`,
    };
  },
  mounted() {
    this.orientation =
      this.game_config.black === this.$store.state.user ? "black" : "white";
    this.board = new P30Board(
      this.game_config.game_id,
      "board",
      this.game_config.white,
      this.game_config.black,
      this.orientation
    );
    this.board._doPromotion = this.doPromotion;
    this.imagePath = this.board.config.pieceTheme;
  },
  props: ["game_config"],

  methods: {
    load(fen) {
      alert(`load(${fen})`);
      return this.board.load(fen);
    },
    turn() {
      return this.board.turn;
    },
    playerLabel(end) {
      switch (end) {
        case "top":
          return this.orientation === "black"
            ? this.board_config.white
            : this.board_config.black;
        case "bottom":
          return this.orientation === "black"
            ? this.board_config.black
            : this.board_config.white;
        default:
          console.log(`ERROR: orientation=${this.orientation}`);
          break;
      }
    },
    doPromotion(move_cfg) {
      let promo_dialog = this.$refs.PromotionDialog;
      promo_dialog.popup().then((ok) => {
        move_cfg.promotion = this.$refs.PromotionDialog.promotionPiece;
        //  this.p30.undo();
        this.p30.move(move_cfg);
      });
    },
  },
  components: {
    PromotionDialog,
  },
  computed: {
    // board_id: `board_${this.game_id}`,
  },
};
</script>

<style scoped>
.large {
  width: 50vw;
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
label {
  margin: auto;
  font-size: 2em;
}
</style>

// Modal promotion dialog box for Board.vue
<template>
  <div>
    <b-modal
      id="promotion_dialog"
      size="sm"
      centered
      class="d-block text-center"
      modal-class="promotion-dialog"
      no-close-on-backdrop
      hide-header
      hide-footer
    >
      <b-row>
        <b-button class="col-3" v-for="piece in ['q','b','r','n']" :key="piece">
          <img m-y="auto" m-x="auto" :src="imgSrc(piece)" @click="select(piece)" />
        </b-button>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    imagePath: {
      type: String,
      required: true,
    },
    turn: {
      type: String,
      validator: (val) => "wb".indexOf(val) >= 0,
      default: "w",
    },
  },

  data: function () {
    return {
      promotionPiece: "q",
    };
  },
  methods: {
    popup() {
      return new Promise((resolve, reject) => {
        this.$bvModal.show("promotion_dialog");
        this.select = resolve;
      });
    },
    select(piece) {
      this.promotionPiece = piece;
      console.log(`${piece} selected`);
      this.$emit("promotion", piece);
      this.$bvModal.hide("promotion_dialog");
    },
    imgSrc(piece) {
      return this.imagePath.replace("{piece}", this.turn + piece.toUpperCase());
    },
  },
};
</script>
<style scoped>
/* /deep/ .promotion-dialog {*/
.promotion-dialog {
  background-color: darkgrey;
  outline: 2px solid darkblue;
  margin: 0;
  padding: 0;
}
img {
  width: 50px;
  height: 50px;
  border: 4px groove burlywood;
  background-color: lightgrey;
  margin: auto;
}
img:hover {
  background-color: grey;
}
img:single-button {
  border: green;
}
</style>
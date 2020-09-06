<template>
  <div>
    <div class="row">
      <div class="col-4">
        <Board id="board1" size="tiny"></Board>
      </div>
      <div class="col-4">
        <Board id="board2" size="tiny" orientation="black"></Board>
      </div>
      <div class="col-4">
        <Board id="board3" size="tiny"></Board>
      </div>
    </div>
  </div>
</template>

<script>
import Board from "./components/Board.vue";
export default {
  components: {
    Board,
  },
};
</script>

<style >
</style>

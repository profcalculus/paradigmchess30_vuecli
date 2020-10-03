<template>
  <div id="gameroom" class="container">
    <h1>GameRoom</h1>
    <div class="row">
      <Board :game_config="game_config"></Board>
      <Clock :game_config="game_config"></Clock>
      <!--Chat></Chat>
      <PGN></PGN>-->
    </div>
  </div>
</template>

<script>
import Board from "../components/Board.vue";
import Chat from "../components/Chat.vue";
import Clock from "../components/Clock.vue";
import PGN from "../components/PGN.vue";
export default {
  name: "GameRoom",
  data() {
    return {
      game_config: {
        game_id: "game_1",
        white: "White",
        black: "Black",
        size: "small",
        clock: {
          mode: "increment",
          maintime: "300",
          extratime: "2",
        },
      },
    };
  },
  // components: {Board, Chat, Clock, PGN},
  components: { Board, Clock },
};
</script>

<style scoped>
#gameroom {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}
</style>
<template>
  <div class="container chatbox">
    <div class="row chat">
      <ul>
        <li v-for="chat of this.chats" :key="chat">
          <ChatLine :chat="chat"></ChatLine>
        </li>
      </ul>
    </div>
    <div class="row chat-input">
      <input class="col-10" type="text" v-model="message" />
      <button class="btn btn-info" @click="sendChat">Send</button>
    </div>
  </div>
</template>

<script>
import EventBus from "../event-bus";
import ChatLine from "./ChatLine.vue";
export default {
  name: "Chat",
  components: { ChatLine },
  data() {
    return {
      message: "",
      chats: [],
    };
  },
  props: { room_id: String },
  methods: {
    sendChat(message) {
      EventBus.emit("chat", {
        from: this.$store.state.user,
        to: this.room_id,
        message: message,
      });

      this.chats.push({ from: "self", message: message });
      message = "";
    },
    chatClass(chat) {
      return {
        color: chat.from === "self" ? "red" : "black",
      };
    },
  },
  computed: {},
};
</script>

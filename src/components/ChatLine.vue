<template>
  <div>
    <span :class="chatline_from">{{from}}:</span>
    <span :class="chatline_message">{{message}}</span>
  </div>
</template>


<script>
export default {
  name: "ChatLine",
  props: ["chat"],
  computed: {
    chatline_from: function () {
      let color = "black",
        font_style = "normal";
      if (this.chat.from === "self") {
        color = "blue";
      } else if (this.chat.from === "system") {
        color = "yellow";
        font_style = "italic";
      }
      return {
        color: color,
        "font-style": font_style,
      };
    },
    chatline_message: function () {
      return {
        color: "black",
      };
    },
  },
};
</script>  
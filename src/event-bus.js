// event-bus.js
import Vue from 'vue';
const EventBus = new Vue();
let oldEmit = EventBus.$emit;
EventBus.$emit = function () {
    console.log('EventBus:' + arguments)
    oldEmit.apply(this, arguments);
}
export default EventBus;

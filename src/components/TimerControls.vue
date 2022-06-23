<template>
  <TimerDisplay :timeInSeconds="timeInSeconds" />
  <ButtonTimer
    buttonText="play"
    :disabled="timerRunning"
    iconClass="fa-play"
    :methodOnClick="start"
  />
  <ButtonTimer
    buttonText="stop"
    :disabled="!timerRunning"
    iconClass="fa-stop"
    :methodOnClick="stop"
  />
  <!-- <button class="button" @click="start" :disabled="timerRunning">
    <span class="icon">
      <i class="fas fa-play"></i>
    </span>
    <span>play</span>
  </button>

  <button class="button" @click="stop" :disabled="!timerRunning">
    <span class="icon">
      <i class="fas fa-stop"></i>
    </span>
    <span>stop</span>
  </button> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimerDisplay from "./TimerDisplay.vue";
import ButtonTimer from "./ButtonTimer.vue";

export default defineComponent({
  name: "TimerControls",
  emits: ["finishedTask"],
  components: {
    TimerDisplay,
    ButtonTimer,
  },
  data() {
    return {
      timeInSeconds: 0,
      timer: 0,
      timerRunning: false,
    };
  },
  methods: {
    start() {
      this.timerRunning = true;
      this.timer = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000);
    },
    stop() {
      this.timerRunning = false;
      clearInterval(this.timer);
      this.$emit("finishedTask", this.timeInSeconds);
      this.timeInSeconds = 0;
    },
  },
});
</script>
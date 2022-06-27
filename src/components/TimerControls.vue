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
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import TimerDisplay from "./TimerDisplay.vue";
import ButtonTimer from "./ButtonTimer.vue";
import { useStore } from "@/store";

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
  setup() {
    const store = useStore();
    return {
      store,
      projects: computed(() => store.state.projects),
    };
  },
});
</script>
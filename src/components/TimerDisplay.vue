<template>
  <section>
    <strong :style="timerDisplayStyle">
      {{ TimerDisplay }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimerDisplay",
  props: {
    timeInSeconds: {
      type: Number,
      default: 0,
    },
    ignoreTheme: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timerDisplayStyle: {
        color: this.ignoreTheme ? "#4a4a4a" : "var(--text-primary)",
      },
    };
  },
  computed: {
    TimerDisplay(): string {
      return new Date(this.timeInSeconds * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<template>
  <section>
    <strong class="display">
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
  },
  computed: {
    TimerDisplay(): string {
      return new Date(this.timeInSeconds * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<style>
.display {
  color: var(--text-primary);
}
</style>

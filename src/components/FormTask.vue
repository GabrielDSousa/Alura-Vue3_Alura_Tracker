<template>
  <div class="box form">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Form to create a new task"
      >
        <input
          type="text"
          class="input"
          placeholder="Which task do you want to start?"
          v-model="description"
        />
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <TimerControls @finishedTask="endTask" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimerControls from "./TimerControls.vue";

export default defineComponent({
  name: "FormTask",
  emits: ["finishedTask"],
  components: {
    TimerControls,
  },
  data() {
    return {
      description: "",
    };
  },
  methods: {
    endTask(TimerDisplay: number): void {
      this.$emit("finishedTask", {
        timeInSeconds: TimerDisplay,
        description: this.description,
      });
      this.description = "";
    },
  },
});
</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>

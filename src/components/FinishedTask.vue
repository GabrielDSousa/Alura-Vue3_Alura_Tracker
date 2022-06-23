<template>
  <ListBox>
    <div class="columns">
      <div class="column is-7">{{ task.description || "Random task" }}</div>
      <div class="column">
        <TimerDisplay :timeInSeconds="task.timeInSeconds" />
      </div>
    </div>
  </ListBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TimerDisplay from "./TimerDisplay.vue";
import ITask from "../interfaces/ITask";
import ListBox from "./ListBox.vue";

export default defineComponent({
  name: "FinishedTask",
  components: {
    TimerDisplay,
    ListBox,
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
});
</script>


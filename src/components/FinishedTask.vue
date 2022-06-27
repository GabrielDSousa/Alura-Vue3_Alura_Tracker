<template>
  <ListBox>
    <div class="columns">
      <div class="column is-3">{{ task.description || "Random task" }}</div>
      <div class="column is-2">{{ task.project?.name || "N/D" }}</div>
      <div class="column">
        <TimerDisplay :timeInSeconds="task.timeInSeconds" :ignoreTheme="true" />
      </div>
      <div class="column is-3">
        <button class="button ml-2 is-danger" @click="deleteTask(task.id)">
          <span class="icon is-small">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  </ListBox>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import TimerDisplay from "./TimerDisplay.vue";
import ITask from "../interfaces/ITask";
import ListBox from "./ListBox.vue";
import { useStore } from "@/store";
import { DELETE_TASK } from "@/store/mutationsType";

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
  methods: {
    deleteTask(id: string) {
      this.store.commit(DELETE_TASK, id);
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
      tasks: computed(() => store.state.tasks),
    };
  },
});
</script>


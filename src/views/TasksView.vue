<template>
  <FormTask />
  <div class="list">
    <FinishedTask v-for="(task, index) in tasks" :key="index" :task="task" />

    <ListBox v-if="emptyTasks">
      <p>Let's make something awesome today :D</p>
    </ListBox>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import FormTask from "../components/FormTask.vue";
import FinishedTask from "../components/FinishedTask.vue";
import ListBox from "../components/ListBox.vue";

export default defineComponent({
  name: "TasksView",
  props: {
    id: {
      type: String,
    },
  },
  components: {
    FormTask,
    FinishedTask,
    ListBox,
  },
  computed: {
    emptyTasks(): boolean {
      return this.tasks.length === 0;
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
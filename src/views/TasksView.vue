<template>
  <FormTask />
  <div class="list">
    <!-- Start Search input -->
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Search"
          v-model="filter"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <!-- End Search input -->

    <ListBox v-if="emptyTasks">
      <p>Let's make something awesome today :D</p>
    </ListBox>

    <FinishedTask
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @editingTask="selectTask"
    />

    <TaskModal
      title="Editing task"
      textConfirm="Edit"
      textCancel="Cancel"
      :task="taskSelected"
      @editedTask="unselectTask"
    >
    </TaskModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useStore } from "@/store";
import FormTask from "../components/FormTask.vue";
import FinishedTask from "../components/FinishedTask.vue";
import ListBox from "../components/ListBox.vue";
import { GET_TASKS } from "@/store/actionsType";
import ITask from "@/interfaces/ITask";
import TaskModal from "@/components/TaskModal.vue";

export default defineComponent({
  name: "TasksView",
  components: {
    FormTask,
    FinishedTask,
    ListBox,
    TaskModal,
  },
  methods: {
    selectTask(task: ITask) {
      this.taskSelected = task;
    },
    unselectTask() {
      this.taskSelected = null;
    },
  },
  computed: {
    emptyTasks(): boolean {
      return this.tasks?.length === 0;
    },
  },
  data() {
    return {
      taskSelected: null as ITask | null,
    };
  },
  setup() {
    const store = useStore();

    const filter = ref("");
    watchEffect(() => {
      store.dispatch(GET_TASKS, filter.value);
    });

    store.dispatch(GET_TASKS);
    return {
      store,
      tasks: computed(() => store.state.task.tasks),
      filter,
    };
  },
});
</script>
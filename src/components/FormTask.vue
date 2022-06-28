<template>
  <div class="box form" @editing="editTask">
    <div class="columns">
      <div
        class="column is-5"
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
      <div class="column is-3">
        <div class="select">
          <select v-model="idProject">
            <option value="">Project</option>
            <option
              v-for="project in projects"
              :value="project.id"
              :key="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <TimerControls @finishedTask="saveTask" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import TimerControls from "./TimerControls.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { CREATE_TASK } from "@/store/actionsType";
import useNotifier from "@/hooks/notifier";
import { GET_PROJECTS } from "@/store/actionsType";

export default defineComponent({
  name: "FormTask",
  emits: ["finishedTask"],
  components: {
    TimerControls,
  },
  setup() {
    //Imports and hooks
    const store = useStore(key);
    const { notify } = useNotifier();

    //Reactive variables
    const description = ref("");
    const idProject = ref("");
    const projects = computed(() => store.state.project.projects);

    //Methods
    const saveTask = (TimerDisplay: number): void => {
      const projectChoose = projects.value.find(
        (proj) => proj.id == idProject.value
      );
      const task = {
        timeInSeconds: TimerDisplay,
        description: description.value,
        project: projectChoose,
      };
      store.dispatch(CREATE_TASK, task);

      description.value = "";
    };

    //Dispatch to renew list of projects
    store.dispatch(GET_PROJECTS);

    //Return of what is used
    return {
      description,
      idProject,
      projects,
      saveTask,
      notify,
    };
  },
});
</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>

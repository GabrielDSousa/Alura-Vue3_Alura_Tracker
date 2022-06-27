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
import { computed, defineComponent } from "vue";
import TimerControls from "./TimerControls.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { CREATE_TASK } from "@/store/mutationsType";
import { NotificationType } from "@/interfaces/INotification";
import useNotifier from "@/hooks/notifier";

export default defineComponent({
  name: "FormTask",
  emits: ["finishedTask"],
  components: {
    TimerControls,
  },
  data() {
    return {
      description: "",
      idProject: "",
      id: "",
    };
  },
  methods: {
    saveTask(TimerDisplay: number): void {
      const project = this.projects.find((proj) => proj.id == this.idProject);

      if (!project) {
        this.notify(
          "Ops!",
          "Select one project before finish the task!",
          NotificationType.ERROR
        );
        return;
      }

      const task = {
        timeInSeconds: TimerDisplay,
        description: this.description,
        project: project,
      };
      this.store.commit(CREATE_TASK, task);

      this.description = "";
    },
  },
  setup() {
    const store = useStore(key);
    const { notify } = useNotifier();
    return {
      store,
      projects: computed(() => store.state.projects),
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

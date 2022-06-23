<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkMode }"
  >
    <div class="column is-one-quarter">
      <SideBar @changedTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <FormTask @finishedTask="saveTask" />
      <div class="list">
        <FinishedTask
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
        />

        <ListBox v-if="emptyTasks">
          <p>Let's make something awesome today :D</p>
        </ListBox>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import FormTask from "./components/FormTask.vue";
import FinishedTask from "./components/FinishedTask.vue";
import ITasks from "./interfaces/ITask";
import ListBox from "./components/ListBox.vue";

export default defineComponent({
  name: "App",
  components: {
    SideBar,
    FormTask,
    FinishedTask,
    ListBox,
  },
  data() {
    return {
      tasks: [] as ITasks[],
      darkMode: true,
    };
  },
  computed: {
    emptyTasks(): boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    saveTask(task: ITasks) {
      this.tasks.push(task);
    },
    changeTheme(darkMode: boolean) {
      this.darkMode = darkMode;
    },
  },
});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>